require("dotenv").config();
const app = require("../app");
const prisma = require("../config/db");
const fetch = global.fetch;

const TEST_PORT = 5099;
const BASE_URL = `http://localhost:${TEST_PORT}`;

// Test users
const superAdminUser = {
  email: "test-superadmin-sec@lrppune.org",
  username: "superadminsec",
  password: "superpassword123",
  role: "SUPER_ADMIN1"
};

const developerUser = {
  email: "test-dev-sec@lrppune.org",
  username: "devsec",
  password: "devpassword123",
  role: "DEVELOPER"
};

async function cleanTestUsers() {
  await prisma.loginAudit.deleteMany({
    where: {
      admin: {
        email: { in: [superAdminUser.email, developerUser.email] }
      }
    }
  });
  await prisma.admin.deleteMany({
    where: {
      email: { in: [superAdminUser.email, developerUser.email] }
    }
  });
}

function parseCookie(setCookieHeader) {
  if (!setCookieHeader) return null;
  const match = setCookieHeader.match(/accessToken=([^;]+)/);
  return match ? match[1] : null;
}

async function runTests() {
  console.log("=== PUNE METRO SECURITY FOUNDATION INTEGRATION TESTS ===");
  
  // 1. Clean up potential leftover test users
  console.log("Cleaning database...");
  await cleanTestUsers();

  // 2. Start temporary server
  const server = app.listen(TEST_PORT, async () => {
    console.log(`Test server running on ${BASE_URL}`);

    try {
      // Test 1: Basic endpoint status
      console.log("\n[Test 1] Root endpoint verification...");
      const resRoot = await fetch(`${BASE_URL}/`);
      const bodyRoot = await resRoot.json();
      console.log(`- Status: ${resRoot.status} (Expected: 200)`);
      console.log(`- Response: ${JSON.stringify(bodyRoot)}`);
      if (resRoot.status !== 200 || bodyRoot.message !== "Backend Running") {
        throw new Error("Root endpoint check failed");
      }

      // Test 2: Provision admin accounts
      console.log("\n[Test 2] Provisioning test users...");
      const resRegSuper = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(superAdminUser)
      });
      const superAdminData = await resRegSuper.json();
      console.log(`- SuperAdmin register status: ${resRegSuper.status} (Expected: 201)`);
      if (resRegSuper.status !== 201) {
        throw new Error("Failed to register SUPER_ADMIN1 test user: " + JSON.stringify(superAdminData));
      }

      const resRegDev = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(developerUser)
      });
      console.log(`- Developer register status: ${resRegDev.status} (Expected: 201)`);
      if (resRegDev.status !== 201) {
        throw new Error("Failed to register DEVELOPER test user");
      }

      // Test 3: Successful login, token in cookie
      console.log("\n[Test 3] Testing successful login & cookie extraction...");
      const resLoginSuper = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: superAdminUser.email,
          password: superAdminUser.password
        })
      });
      const loginSuperData = await resLoginSuper.json();
      const setCookieHeader = resLoginSuper.headers.get("set-cookie");
      const cookieToken = parseCookie(setCookieHeader);

      console.log(`- Login Status: ${resLoginSuper.status} (Expected: 200)`);
      console.log(`- Set-Cookie Header exists: ${!!setCookieHeader}`);
      console.log(`- Cookie token extracted: ${!!cookieToken}`);
      console.log(`- Cookie contains secure/httpOnly flags: ${setCookieHeader && setCookieHeader.includes("HttpOnly")}`);

      if (resLoginSuper.status !== 200 || !cookieToken) {
        throw new Error("Login failed or no cookie returned");
      }

      // Test 4: Failed login & audit logs check
      console.log("\n[Test 4] Testing failed login & audit logs recording...");
      const beforeAudits = await prisma.loginAudit.count();
      const resLoginFail = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: superAdminUser.email,
          password: "wrongpassword"
        })
      });
      console.log(`- Failed Login Status: ${resLoginFail.status} (Expected: 401)`);
      const afterAudits = await prisma.loginAudit.count();
      console.log(`- Audit record count incremented: ${afterAudits > beforeAudits} (from ${beforeAudits} to ${afterAudits})`);
      if (resLoginFail.status !== 401 || afterAudits <= beforeAudits) {
        throw new Error("Failed login did not return 401 or failed to log audit record");
      }

      // Test 5: Verify LoginAudit model entries
      console.log("\n[Test 5] Checking LoginAudit records in Database...");
      const audits = await prisma.loginAudit.findMany({
        where: { admin: { email: superAdminUser.email } },
        orderBy: { loginTime: "desc" }
      });
      console.log(`- Found ${audits.length} audit records for test superadmin.`);
      console.log(`- Latest record success status: ${audits[0].success} (Expected: false)`);
      console.log(`- Previous record success status: ${audits[1].success} (Expected: true)`);
      if (audits.length < 2 || audits[0].success !== false || audits[1].success !== true) {
        throw new Error("LoginAudit records in DB are incorrect");
      }

      // Test 6: Access protected route with authentication cookie
      console.log("\n[Test 6] Accessing protected route using cookie authentication...");
      // Let's get the list of pillars which doesn't require auth, but update does. Let's see if we can read one.
      const resPillars = await fetch(`${BASE_URL}/api/pillars`);
      const pillarsData = await resPillars.json();
      console.log(`- Get pillars status: ${resPillars.status} (Expected: 200)`);
      
      const firstPillarId = pillarsData.data[0].pillar;

      // Update pillar requires EDITOR or SUPER_ADMIN (or similar) role
      // Let's try to update without auth cookie
      const resUpdateNoAuth = await fetch(`${BASE_URL}/api/pillars/${firstPillarId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "reach", value: "85" })
      });
      console.log(`- Update without cookie status: ${resUpdateNoAuth.status} (Expected: 401)`);
      if (resUpdateNoAuth.status !== 401) {
        throw new Error("Pillar update route allowed unauthorized request");
      }

      // Update with valid SUPER_ADMIN1 cookie
      const resUpdateWithAuth = await fetch(`${BASE_URL}/api/pillars/${firstPillarId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `accessToken=${cookieToken}`
        },
        body: JSON.stringify({ key: "reach", value: "88" })
      });
      console.log(`- Update with cookie status: ${resUpdateWithAuth.status} (Expected: 200)`);
      if (resUpdateWithAuth.status !== 200) {
        throw new Error("Pillar update failed for authorized SUPER_ADMIN1 user");
      }

      // Test 7: Verify RBAC constraints (Forbidden check)
      console.log("\n[Test 7] Verifying RBAC permission restrictions (Forbidden checks)...");
      // Let's login as developer
      const resLoginDev = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: developerUser.email,
          password: developerUser.password
        })
      });
      const devCookieToken = parseCookie(resLoginDev.headers.get("set-cookie"));
      
      // Let's modify pillarRoutes to use authorize("EDITOR", "SUPER_ADMIN1", "SUPER_ADMIN2", "ADMIN1") instead of hardcoded strings
      // Wait, let's see: standard DEVELOPER doesn't have permissions to update metrics!
      // Let's try updating the pillar as DEVELOPER:
      const resUpdateAsDev = await fetch(`${BASE_URL}/api/pillars/${firstPillarId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `accessToken=${devCookieToken}`
        },
        body: JSON.stringify({ key: "reach", value: "90" })
      });
      console.log(`- Developer update status: ${resUpdateAsDev.status} (Expected: 403)`);
      if (resUpdateAsDev.status !== 403) {
        throw new Error("Developer role was allowed to update metrics (expected 403 Forbidden)");
      }

      // Test 8: Logout & cookie clearing
      console.log("\n[Test 8] Testing logout cookie clearing...");
      const resLogout = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST"
      });
      const logoutCookieHeader = resLogout.headers.get("set-cookie");
      console.log(`- Logout Status: ${resLogout.status} (Expected: 200)`);
      console.log(`- Logout Cookie Cleared: ${logoutCookieHeader && logoutCookieHeader.includes("accessToken=;")}`);
      if (resLogout.status !== 200 || !logoutCookieHeader || !logoutCookieHeader.includes("accessToken=;")) {
        throw new Error("Logout failed or did not clear accessToken cookie");
      }

      // Clean up database at the end
      console.log("\nCleaning database post-tests...");
      await cleanTestUsers();

      console.log("\n=== ALL SECURITY FOUNDATION TESTS PASSED SUCCESSFULLY ===");
      
      server.close(() => {
        console.log("Test server stopped.");
        process.exit(0);
      });

    } catch (err) {
      console.error("\n❌ TESTS FAILED:", err.message);
      if (err.stack) console.error(err.stack);
      
      await cleanTestUsers().catch(() => {});
      server.close(() => {
        console.log("Test server stopped due to failure.");
        process.exit(1);
      });
    }
  });
}

runTests();
