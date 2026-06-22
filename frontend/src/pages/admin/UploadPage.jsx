import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { getPillars } from "../../service/pillarService";
import {
    uploadDocument,
    getUploadLogs,
    syncUploadMetrics,
    getDownloadUrl,
    getViewUrl
} from "../../service/uploadService";

export default function UploadPage() {
    const { user, role, logout } = useAuthStore();
    const navigate = useNavigate();

    // API & UI states
    const [logs, setLogs] = useState([]);
    const [livePillars, setLivePillars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [alert, setAlert] = useState(null);

    // Selected staged document for preview/sync
    const [activeUpload, setActiveUpload] = useState(null);
    const [activeMetrics, setActiveMetrics] = useState([]);

    const fileInputRef = useRef(null);

    // Load logs and current live database metrics on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const logsData = await getUploadLogs();
            setLogs(logsData || []);

            const pillarsData = await getPillars();
            // The response structure typically has data in .data
            const pillarsList = pillarsData.data || pillarsData || [];
            setLivePillars(pillarsList);
        } catch (error) {
            showError("Failed to fetch repository history logs.");
        } finally {
            setLoading(false);
        }
    };

    const showSuccess = (msg) => {
        setAlert({ type: "success", message: msg });
        setTimeout(() => setAlert(null), 5000);
    };

    const showError = (msg) => {
        setAlert({ type: "error", message: msg });
        setTimeout(() => setAlert(null), 5000);
    };

    const handleSignOut = async () => {
        await logout();
        navigate("/team/login");
    };

    // File Drag and Drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            await processUploadedFile(file);
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            await processUploadedFile(file);
        }
    };

    const processUploadedFile = async (file) => {
        const ext = file.name.split(".").pop().toLowerCase();
        if (!["pdf", "csv", "txt"].includes(ext)) {
            showError("Only PDF, CSV, and TXT files are allowed.");
            return;
        }

        setUploading(true);
        setAlert(null);
        try {
            const result = await uploadDocument(file);
            showSuccess(`"${file.name}" uploaded and parsed successfully by AI.`);
            
            // Set uploaded file as active preview
            setActiveUpload({
                id: result.uploadId,
                filename: result.filename,
                isSynced: result.isSynced
            });
            setActiveMetrics(result.extractedMetrics || []);
            
            // Reload logs
            await loadData();
        } catch (error) {
            const errorMsg = error.response?.data?.message || "File upload processing failed.";
            showError(errorMsg);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Trigger select upload from registry list
    const handleSelectLog = (log) => {
        if (log.status !== "COMPLETED") return;

        setActiveUpload(log);
        try {
            const metrics = log.extractedData ? JSON.parse(log.extractedData) : [];
            setActiveMetrics(metrics);
            setAlert(null);
        } catch (e) {
            setActiveMetrics([]);
            showError("Failed to parse the staged metrics for this document.");
        }
    };

    // Confirm and Sync Staged Metrics to Dashboard
    const handleSync = async () => {
        if (!activeUpload) return;
        setSyncing(true);
        setAlert(null);
        try {
            await syncUploadMetrics(activeUpload.id);
            showSuccess(`Metrics for "${activeUpload.filename}" synced to live dashboard.`);
            
            // Clear current preview workspace
            setActiveUpload(null);
            setActiveMetrics([]);

            // Reload data
            await loadData();
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Synchronization failed.";
            showError(errorMsg);
        } finally {
            setSyncing(false);
        }
    };

    // Help render live comparisons / diffs
    const getComparison = (pillar, key, proposedVal) => {
        const liveMatch = livePillars.find(p => p.pillar === Number(pillar) && p.key.toLowerCase().trim() === key.toLowerCase().trim());
        const currentVal = liveMatch ? liveMatch.value : "-";

        let diffText = "";
        let diffColor = "text-on-surface-variant";

        const currentNum = parseFloat(currentVal.replace(/[^0-9.-]/g, ""));
        const proposedNum = parseFloat(proposedVal.replace(/[^0-9.-]/g, ""));

        if (!isNaN(currentNum) && !isNaN(proposedNum)) {
            const diff = proposedNum - currentNum;
            if (diff > 0) {
                diffText = `+${diff.toLocaleString()}`;
                diffColor = "text-emerald-600 font-semibold";
            } else if (diff < 0) {
                diffText = `${diff.toLocaleString()}`;
                diffColor = "text-error font-semibold";
            } else {
                diffText = "0";
            }
        }

        return { currentVal, diffText, diffColor };
    };

    // Clean up registry filtering based on search query and status filter selection
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.filename.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesStatus = true;
        if (statusFilter === "STAGED") {
            matchesStatus = (log.status === "COMPLETED" && !log.isSynced);
        } else if (statusFilter === "SYNCED") {
            matchesStatus = log.isSynced;
        } else if (statusFilter === "FAILED") {
            matchesStatus = log.status === "FAILED";
        }
        
        return matchesSearch && matchesStatus;
    });

    // KPI count helper functions
    const totalDocs = logs.length;
    const pendingReviews = logs.filter(l => l.status === "COMPLETED" && !l.isSynced).length;
    const syncedCount = logs.filter(l => l.isSynced).length;
    const failedCount = logs.filter(l => l.status === "FAILED").length;

    return (
        <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] antialiased font-sans">
            {/* Global Header */}
            <header className="bg-primary text-white px-8 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-6">
                    <Link to="/team/dashboard" className="flex items-center gap-3 hover:opacity-90">
                        <div className="bg-white p-1 rounded-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>subway</span>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight">
                            Pune Metro LRP <span className="font-normal opacity-80">Staff Portal</span>
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    <div className="text-right">
                        <div className="text-sm font-semibold">{user?.username || "Staff User"}</div>
                        <div className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 bg-[#ffddba] text-[#744600] rounded uppercase inline-block">
                            {role || "Admin"}
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-error text-white hover:bg-error/85 transition-colors rounded-lg text-xs font-bold uppercase cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                {/* Page Header & Breadcrumbs */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4 font-mono">
                        <Link to="/team/dashboard" className="hover:text-primary transition-colors">Staff Portal</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="font-medium text-primary">Repository</span>
                    </nav>
                    <div className="flex justify-between items-end flex-wrap gap-4">
                        <div>
                            <h2 className="font-serif text-4xl font-semibold text-primary mb-2">Document Repository &amp; Ingestion Control</h2>
                            <p className="text-on-surface-variant max-w-2xl text-sm">
                                Manage high-stakes institutional reports, verify AI-driven metric extractions, and finalize data synchronization to the executive analytics dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notifications Alert banner */}
                {alert && (
                    <div className={`mb-6 p-4 rounded-xl shadow-sm border flex items-center gap-3 ${
                        alert.type === "success" 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                            : "bg-error-container/20 border-error/20 text-error"
                    }`}>
                        <span className="material-symbols-outlined">
                            {alert.type === "success" ? "check_circle" : "error"}
                        </span>
                        <span className="text-sm font-medium">{alert.message}</span>
                    </div>
                )}

                {/* KPI Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-xl flex items-center justify-between shadow-sm">
                        <div>
                            <div className="text-[11px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Total Documents</div>
                            <div className="text-3xl font-bold font-mono">{totalDocs}</div>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>folder_open</span>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl flex items-center justify-between shadow-sm border-l-4 border-l-amber-500">
                        <div>
                            <div className="text-[11px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Pending Reviews</div>
                            <div className="text-3xl font-bold font-mono text-amber-600">{pendingReviews}</div>
                        </div>
                        <div className="bg-amber-100 p-3 rounded-lg text-amber-700">
                            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>pending_actions</span>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl flex items-center justify-between shadow-sm border-l-4 border-l-emerald-accent">
                        <div>
                            <div className="text-[11px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Synced Reports</div>
                            <div className="text-3xl font-bold font-mono text-emerald-accent">{syncedCount}</div>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-lg text-emerald-accent">
                            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>sync_saved_locally</span>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl flex items-center justify-between shadow-sm border-l-4 border-l-error">
                        <div>
                            <div className="text-[11px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider font-mono">Failed Extractions</div>
                            <div className="text-3xl font-bold font-mono text-error">{failedCount}</div>
                        </div>
                        <div className="bg-error-container/20 p-3 rounded-lg text-error">
                            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>error</span>
                        </div>
                    </div>
                </div>

                {/* Main Workspace */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left: Upload Center */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="glass-panel p-6 rounded-xl h-full shadow-sm">
                            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">cloud_upload</span> Upload Center
                            </h3>
                            <div
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-soft cursor-pointer group ${
                                    dragActive 
                                        ? "border-secondary bg-[#eae8e3]" 
                                        : "border-outline-variant bg-surface-container-low hover:border-secondary hover:bg-[#e4e2dd]"
                                }`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".pdf,.csv,.txt"
                                    className="hidden"
                                />
                                <div className="size-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-soft">
                                    {uploading ? (
                                        <span className="material-symbols-outlined text-secondary animate-spin" style={{ fontSize: "40px" }}>sync</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-secondary" style={{ fontSize: "40px" }}>upload_file</span>
                                    )}
                                </div>
                                <p className="text-sm font-semibold text-on-surface mb-1">
                                    {uploading ? "Ingesting Report..." : "Drag &amp; Drop Documents"}
                                </p>
                                <p className="text-xs text-on-surface-variant mb-6 font-mono">Supported: PDF, CSV, TXT (Max 20MB)</p>
                                <button 
                                    disabled={uploading}
                                    className="px-6 py-2 bg-primary hover:bg-[#1a365d] text-white rounded-lg text-sm font-bold w-full shadow transition-soft cursor-pointer"
                                >
                                    Choose File
                                </button>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 font-mono">Recent Uploads</h4>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                    {logs.slice(0, 5).map((log) => (
                                        <div key={log.id} className="flex items-center gap-3 p-2 hover:bg-white/40 rounded transition-soft">
                                            <div className={`size-8 rounded flex items-center justify-center ${
                                                log.status === "COMPLETED" 
                                                    ? (log.isSynced ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")
                                                    : "bg-error-container/20 text-error"
                                            }`}>
                                                <span className="material-symbols-outlined text-sm">
                                                    {log.status === "COMPLETED" ? (log.isSynced ? "check" : "hourglass_bottom") : "close"}
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-bold truncate">{log.filename}</p>
                                                <p className="text-[10px] text-on-surface-variant font-mono">
                                                    {new Date(log.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {logs.length === 0 && (
                                        <p className="text-xs text-on-surface-variant italic">No uploads found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: Approval Workspace */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="glass-panel rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-primary/20 bg-white">
                            {activeUpload ? (
                                <>
                                    <div className="bg-primary/5 p-5 border-b border-outline-variant flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary text-white p-2 rounded">
                                                <span className="material-symbols-outlined">analytics</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-primary leading-tight">Metrics Awaiting Approval</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-mono text-on-surface-variant">Source: {activeUpload.filename}</span>
                                                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                                                        activeUpload.isSynced 
                                                            ? "bg-emerald-100 text-emerald-800" 
                                                            : "bg-amber-100 text-amber-800"
                                                    }`}>
                                                        {activeUpload.isSynced ? "SYNCED" : "STAGED"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* Inline viewer button */}
                                            <a 
                                                href={getViewUrl(activeUpload.id)} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="p-2 hover:bg-white rounded-full text-on-surface-variant flex items-center justify-center hover:shadow-sm transition-soft"
                                                title="View Document Inline"
                                            >
                                                <span className="material-symbols-outlined">visibility</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow overflow-auto min-h-[300px]">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">
                                                    <th className="py-3 px-2">Pillar</th>
                                                    <th className="py-3 px-2">Metric</th>
                                                    <th className="py-3 px-2">Current Live</th>
                                                    <th className="py-3 px-2">Proposed</th>
                                                    <th className="py-3 px-2">Diff</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant text-sm">
                                                {activeMetrics.map((metric, idx) => {
                                                    const comp = getComparison(metric.pillar, metric.key, metric.value);
                                                    return (
                                                        <tr key={idx} className="data-table-row transition-soft">
                                                            <td className="py-4 px-2 font-mono">Pillar {metric.pillar}</td>
                                                            <td className="py-4 px-2 font-semibold text-primary">{metric.key}</td>
                                                            <td className="py-4 px-2 font-mono text-on-surface-variant">{comp.currentVal}</td>
                                                            <td className="py-4 px-2 font-mono text-emerald-accent font-semibold">{metric.value}</td>
                                                            <td className={`py-4 px-2 font-mono ${comp.diffColor}`}>{comp.diffText || "N/A"}</td>
                                                        </tr>
                                                    );
                                                })}
                                                {activeMetrics.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="py-8 text-center text-on-surface-variant italic">
                                                            No metrics extracted from this file.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-6 bg-[#f5f3ee] border-t border-outline-variant flex flex-wrap gap-3">
                                        {!activeUpload.isSynced ? (
                                            <>
                                                <button
                                                    onClick={handleSync}
                                                    disabled={syncing}
                                                    className="flex-1 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-[#1a365d] shadow-md transition-soft flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                                >
                                                    {syncing ? (
                                                        <>
                                                            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                                                            Syncing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="material-symbols-outlined text-sm">sync</span>
                                                            Confirm &amp; Sync To Dashboard
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => { setActiveUpload(null); setActiveMetrics([]); }}
                                                    className="flex-1 py-2.5 border border-primary text-primary rounded-lg font-bold text-sm hover:bg-primary/5 transition-soft cursor-pointer"
                                                >
                                                    Keep Staged
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full flex items-center justify-between text-sm text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                                                    <span>These metrics have been applied to the live dashboard.</span>
                                                </div>
                                                <button
                                                    onClick={() => { setActiveUpload(null); setActiveMetrics([]); }}
                                                    className="px-4 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-soft cursor-pointer"
                                                >
                                                    Close View
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center h-full text-on-surface-variant min-h-[450px]">
                                    <span className="material-symbols-outlined text-5xl text-outline mb-4">folder_shared</span>
                                    <h3 className="text-xl font-bold font-serif text-primary mb-2">Review Workspace Empty</h3>
                                    <p className="max-w-xs text-xs mb-6 text-on-surface-variant">
                                        Select a completed staged document from the Registry on the right or upload a new one to verify and sync metrics.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Document Registry */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="glass-panel p-6 rounded-xl shadow-sm h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined">inventory_2</span> Registry
                                </h3>
                                <div className="space-y-4 mb-4">
                                    {/* Text Filter */}
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: "18px" }}>filter_list</span>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full text-xs bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-3 py-2.5 focus:ring-secondary focus:border-secondary transition-soft"
                                            placeholder="Search documents by name..."
                                        />
                                    </div>
                                    {/* Status Filter Tab Buttons */}
                                    <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/30 text-xs">
                                        {["ALL", "STAGED", "SYNCED"].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setStatusFilter(tab)}
                                                className={`flex-1 py-1.5 rounded-md font-bold transition-soft cursor-pointer text-center capitalize ${
                                                    statusFilter === tab 
                                                        ? "bg-white text-primary shadow-sm" 
                                                        : "text-on-surface-variant hover:text-primary"
                                                }`}
                                            >
                                                {tab.toLowerCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                                    {filteredLogs.map((log) => {
                                        const fileExt = log.filename.split(".").pop().toLowerCase();
                                        let iconColor = "bg-blue-50 text-blue-600";
                                        let iconName = "description";
                                        if (fileExt === "csv") {
                                            iconColor = "bg-green-50 text-green-600";
                                            iconName = "table_chart";
                                        } else if (fileExt === "txt") {
                                            iconColor = "bg-gray-100 text-gray-700";
                                            iconName = "drive_file";
                                        }

                                        const isSelected = activeUpload && activeUpload.id === log.id;

                                        return (
                                            <div
                                                key={log.id}
                                                onClick={() => handleSelectLog(log)}
                                                className={`p-4 rounded-lg bg-white border transition-soft cursor-pointer shadow-sm group ${
                                                    isSelected 
                                                        ? "border-primary ring-2 ring-primary-container" 
                                                        : (log.status === "COMPLETED" && !log.isSynced)
                                                            ? "border-amber-400 border-l-4 border-l-amber-500 hover:border-amber-600"
                                                            : "border-outline-variant hover:border-secondary"
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 rounded group-hover:scale-105 transition-soft ${iconColor}`}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{iconName}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary" title={log.filename}>
                                                            {log.filename}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1 text-[10px] text-on-surface-variant font-mono">
                                                            <span>{new Date(log.createdAt).toLocaleDateString()}</span>
                                                            <span className="size-1 bg-surface-dim rounded-full"></span>
                                                            <span className="uppercase">{fileExt}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex justify-between items-center border-t border-outline-variant/30 pt-2">
                                                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                                                        log.status === "FAILED"
                                                            ? "bg-error-container/40 text-error"
                                                            : log.isSynced 
                                                                ? "bg-emerald-100 text-emerald-800" 
                                                                : "bg-amber-100 text-amber-800"
                                                    }`}>
                                                        {log.status === "FAILED" ? "FAILED" : (log.isSynced ? "SYNCED" : "STAGED")}
                                                    </span>
                                                    {log.status === "COMPLETED" && (
                                                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                            {/* View inline button */}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.open(getViewUrl(log.id), "_blank");
                                                                }}
                                                                className="hover:text-primary p-1 hover:bg-slate-100 rounded transition-soft"
                                                                title="View Document"
                                                            >
                                                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>visibility</span>
                                                            </button>
                                                            {/* Download button */}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.open(getDownloadUrl(log.id), "_blank");
                                                                }}
                                                                className="hover:text-primary p-1 hover:bg-slate-100 rounded transition-soft"
                                                                title="Download Report"
                                                            >
                                                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>download</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {filteredLogs.length === 0 && (
                                        <p className="text-xs text-on-surface-variant italic text-center py-6">No matching documents found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Status Footer */}
                <div className="mt-8 glass-panel rounded-lg p-4 flex justify-between items-center text-xs text-on-surface-variant">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <span className="size-2 bg-emerald-accent rounded-full animate-pulse"></span>
                            <span>AI Engine Online</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="size-2 bg-emerald-accent rounded-full"></span>
                            <span>Database Connection Secured</span>
                        </div>
                    </div>
                    <div className="font-mono text-[10px]">
                        System v4.2.1-LRP • Secure Connection • Express Port 5000
                    </div>
                </div>
            </main>
        </div>
    );
}
