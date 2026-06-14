import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreePillarAnimation({ pillarId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    
    let camera;
    let renderer;
    let animationFrameId;

    if (pillarId === 2) {
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 8, 15);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Absolute positioning to make sure canvas is strictly contained inside the parent div
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      
      container.appendChild(renderer.domElement);

      const colors = {
        metroBlue: new THREE.Color(0xadc7f7), // Light blue for beneficiaries and curves
        warmOrange: new THREE.Color(0xff7a00), // Vibrant orange for colleges, schools, employment hubs
        teal: new THREE.Color(0x00b4d8), // Sleek teal for transit access points
        glow: new THREE.Color(0xffffff)
      };

      const group = new THREE.Group();
      scene.add(group);

      // Opportunity Rings (Concentric travel corridors)
      for (let i = 0; i < 3; i++) {
        const radius = (i + 1) * 3.5;
        const geometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0x61abac,
          transparent: true,
          opacity: 0.15,
          side: THREE.DoubleSide 
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }

      // 1. Large Orange Nodes (Schools, Colleges, Employment Hubs)
      const orangeHubs = [];
      const orangePositions = [
        new THREE.Vector3(0, 0.5, 0),        // Central Employment Hub
        new THREE.Vector3(5, 2.0, -3),       // College Hub North-East
        new THREE.Vector3(-5.5, 1.5, 3),     // School Hub South-West
        new THREE.Vector3(1, 1.0, -5.5)      // Employment Hub North
      ];
      const orangeMat = new THREE.MeshPhongMaterial({
        color: colors.warmOrange,
        emissive: colors.warmOrange,
        emissiveIntensity: 2.2,
        shininess: 100
      });
      const orangeGeo = new THREE.IcosahedronGeometry(0.35, 1);
      orangePositions.forEach((pos) => {
        const mesh = new THREE.Mesh(orangeGeo, orangeMat);
        mesh.position.copy(pos);
        group.add(mesh);
        orangeHubs.push(mesh);
      });

      // 2. Medium Teal Nodes (Transit Access Points)
      const tealNodes = [];
      const tealPositions = [];
      const tealMat = new THREE.MeshPhongMaterial({
        color: colors.teal,
        emissive: colors.teal,
        emissiveIntensity: 1.8,
        shininess: 100
      });
      const tealGeo = new THREE.SphereGeometry(0.2, 16, 16);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 5.2;
        const pos = new THREE.Vector3(
          Math.cos(angle) * radius,
          0.8 + Math.sin(i * 1.5) * 0.6,
          Math.sin(angle) * radius
        );
        const mesh = new THREE.Mesh(tealGeo, tealMat);
        mesh.position.copy(pos);
        group.add(mesh);
        tealNodes.push(mesh);
        tealPositions.push(pos);
      }

      // 3. Small Blue Nodes (Beneficiaries)
      const blueNodes = [];
      const bluePositions = [];
      const blueMat = new THREE.MeshPhongMaterial({
        color: colors.metroBlue,
        emissive: colors.metroBlue,
        emissiveIntensity: 1.2,
        shininess: 100
      });
      const blueGeo = new THREE.SphereGeometry(0.1, 12, 12);
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + 0.15;
        const radius = 10.0;
        const pos = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(i * 1.1) * 0.3,
          Math.sin(angle) * radius
        );
        const mesh = new THREE.Mesh(blueGeo, blueMat);
        mesh.position.copy(pos);
        group.add(mesh);
        blueNodes.push(mesh);
        bluePositions.push(pos);
      }

      // Connections: Travel paths showing directional journeys from Beneficiary -> Transit Access -> Hub
      const paths = [];
      const pathColors = [0xadc7f7, 0x00b4d8, 0xff7a00];
      for (let i = 0; i < 16; i++) {
        const startPos = bluePositions[i];
        
        // Choose intermediate transit point
        const tealIndex = Math.floor(i / 2) % 8;
        const midPos = tealPositions[tealIndex];
        
        // Choose terminal hub destination
        const orangeIndex = i % 4;
        const endPos = orangePositions[orangeIndex];

        // Create curved travel route
        const curve = new THREE.CatmullRomCurve3([startPos, midPos, endPos]);
        paths.push(curve);

        // Render metro route corridors
        const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.025, 6, false);
        const tubeMat = new THREE.MeshBasicMaterial({ 
          color: colors.metroBlue, 
          transparent: true,
          opacity: 0.22
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        group.add(tube);
      }

      // Flowing Particles along routes
      const pulses = [];
      const pulseCount = 48;
      const pulseGeo = new THREE.SphereGeometry(0.1, 8, 8);

      for (let i = 0; i < pulseCount; i++) {
        const isOrange = Math.random() > 0.4;
        const material = new THREE.MeshPhongMaterial({
          color: isOrange ? colors.warmOrange : colors.teal,
          emissive: isOrange ? colors.warmOrange : colors.teal,
          emissiveIntensity: 2.5,
          shininess: 100
        });
        const pulse = new THREE.Mesh(pulseGeo, material);
        const pathIndex = i % 16;
        
        pulse.userData = {
          path: paths[pathIndex],
          progress: Math.random(),
          speed: 0.0012 + Math.random() * 0.002,
          phase: Math.random() * Math.PI * 2
        };
        
        group.add(pulse);
        pulses.push(pulse);
      }

      // Background ambient particles (representing connectivity environment)
      const particleCount = 60;
      const partGeo = new THREE.SphereGeometry(0.04, 6, 6);
      const partMat = new THREE.MeshBasicMaterial({
        color: colors.metroBlue,
        transparent: true,
        opacity: 0.25
      });
      const bgParticles = [];
      for (let i = 0; i < particleCount; i++) {
        const p = new THREE.Mesh(partGeo, partMat);
        const r = 4 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        p.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.3,
          r * Math.sin(phi) * Math.sin(theta)
        );
        group.add(p);
        bgParticles.push(p);
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 2.2);
      pointLight.position.set(10, 20, 10);
      scene.add(pointLight);

      const animate = (time) => {
        animationFrameId = requestAnimationFrame(animate);
        const t = time * 0.001;

        // Flowing particles along connections (directional journey)
        pulses.forEach(p => {
          p.userData.progress += p.userData.speed;
          if (p.userData.progress > 1) {
            p.userData.progress = 0;
            p.userData.speed = 0.0012 + Math.random() * 0.002;
          }
          
          const pos = p.userData.path.getPointAt(p.userData.progress);
          p.position.copy(pos);
          
          const scale = 1 + Math.sin(t * 6 + p.userData.progress * 15) * 0.3;
          p.scale.set(scale, scale, scale);
          p.material.emissiveIntensity = 2.0 + Math.sin(t * 8 + p.userData.phase) * 1.2;
        });

        // Pulsating hubs (Large Orange Nodes)
        orangeHubs.forEach((hub, idx) => {
          hub.rotation.y += 0.01;
          hub.rotation.x += 0.005;
          const scale = 1.0 + Math.sin(t * 2.5 + idx) * 0.08;
          hub.scale.setScalar(scale);
        });

        // Pulsating transit points (Medium Teal Nodes)
        tealNodes.forEach((teal, idx) => {
          teal.position.y += Math.sin(t * 2 + idx) * 0.0015;
          teal.scale.setScalar(1.0 + Math.sin(t * 4 + idx) * 0.05);
        });

        // Subtle bg particles floating
        bgParticles.forEach((p, idx) => {
          p.position.y += Math.sin(t + idx) * 0.002;
        });

        group.rotation.y += 0.0015; // Slow rotation of entire network
        renderer.render(scene, camera);
      };

      animate(0);
    } else if (pillarId === 3) {
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 8, 20);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Absolute positioning to make sure canvas is strictly contained inside the parent div
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      container.appendChild(renderer.domElement);

      const colors = {
        metroBlue: new THREE.Color(0xadc7f7),
        warmOrange: new THREE.Color(0xf6ad55),
        teal: new THREE.Color(0x4fd1c5),
        white: new THREE.Color(0xffffff)
      };

      const group = new THREE.Group();
      scene.add(group);

      // Central Hub (Government Data Engine)
      const hubGeo = new THREE.OctahedronGeometry(1.5, 2);
      const hubMat = new THREE.MeshPhongMaterial({
        color: colors.metroBlue,
        emissive: colors.metroBlue,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const centralHub = new THREE.Mesh(hubGeo, hubMat);
      group.add(centralHub);

      // Departmental Nodes (Orbiting Institutions)
      const nodes = [];
      const nodeCount = 6;
      const nodeGeo = new THREE.IcosahedronGeometry(0.6, 1);
      
      for (let i = 0; i < nodeCount; i++) {
        const isTeal = i % 2 === 0;
        const material = new THREE.MeshPhongMaterial({
          color: isTeal ? colors.teal : colors.warmOrange,
          emissive: isTeal ? colors.teal : colors.warmOrange,
          emissiveIntensity: 1.0,
          shininess: 100
        });
        const node = new THREE.Mesh(nodeGeo, material);
        
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 8;
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(i * 0.7) * 3,
          Math.sin(angle) * radius
        );
        
        node.userData = {
          originalPos: node.position.clone(),
          speed: 0.005 + Math.random() * 0.01,
          phase: Math.random() * Math.PI * 2,
          angle: angle,
          radius: radius
        };
        
        group.add(node);
        nodes.push(node);

        // Dynamic Connection Lines to Hub
        const lineMat = new THREE.LineBasicMaterial({ 
          color: colors.metroBlue, 
          transparent: true, 
          opacity: 0.25 
        });
        const points = [new THREE.Vector3(0, 0, 0), node.position];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        node.userData.line = line;
      }

      // Floating Data Particles (Livelihood Benefits)
      const particles = [];
      const particleCount = 80;
      const partGeo = new THREE.SphereGeometry(0.06, 8, 8);

      for (let i = 0; i < particleCount; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: colors.white,
          transparent: true,
          opacity: 0.4
        });
        const p = new THREE.Mesh(partGeo, material);
        
        const radius = 5 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        p.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi) * 0.5,
          radius * Math.sin(phi) * Math.sin(theta)
        );
        
        p.userData = {
          speed: 0.001 + Math.random() * 0.003,
          orbitRadius: radius,
          phase: Math.random() * Math.PI * 2
        };
        
        group.add(p);
        particles.push(p);
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 2);
      pointLight.position.set(10, 15, 10);
      scene.add(pointLight);

      const animate = (time) => {
        animationFrameId = requestAnimationFrame(animate);
        const t = time * 0.001;

        centralHub.rotation.y += 0.003;
        centralHub.rotation.x += 0.001;
        centralHub.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);

        nodes.forEach(node => {
          node.position.y = node.userData.originalPos.y + Math.sin(t * 2 + node.userData.phase) * 0.4;
          
          const positions = node.userData.line.geometry.attributes.position.array;
          positions[3] = node.position.x;
          positions[4] = node.position.y;
          positions[5] = node.position.z;
          node.userData.line.geometry.attributes.position.needsUpdate = true;
          
          node.rotation.y += 0.02;
        });

        particles.forEach(p => {
          p.rotation.y += p.userData.speed;
          p.position.y += Math.sin(t + p.userData.orbitRadius) * 0.002;
        });

        group.rotation.y += 0.0015;
        renderer.render(scene, camera);
      };

      animate(0);
    } else if (pillarId === 4) {
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 5, 15);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Absolute positioning to make sure canvas is strictly contained inside the parent div
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      container.appendChild(renderer.domElement);

      const colors = {
        metroBlue: new THREE.Color(0x1a365d),
        warmOrange: new THREE.Color(0xed8936),
        teal: new THREE.Color(0x319795),
        white: new THREE.Color(0xffffff)
      };

      const group = new THREE.Group();
      scene.add(group);

      // Floating Wellness Nodes
      const nodes = [];
      const nodeCount = 50;
      const nodeGeo = new THREE.IcosahedronGeometry(0.22, 1);

      for (let i = 0; i < nodeCount; i++) {
        const colorType = Math.random();
        let color = colors.teal;
        if (colorType > 0.7) color = colors.warmOrange;
        else if (colorType > 0.4) color = colors.metroBlue;

        const material = new THREE.MeshPhongMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.6,
          shininess: 100
        });
        const node = new THREE.Mesh(nodeGeo, material);
        
        const radius = 5 + Math.random() * 7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        node.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta) * 0.5,
          radius * Math.cos(phi)
        );
        
        node.userData = {
          originalPos: node.position.clone(),
          speed: 0.005 + Math.random() * 0.01,
          phase: Math.random() * Math.PI * 2
        };
        
        group.add(node);
        nodes.push(node);
      }

      // Pulse Lines (Connections)
      const lineMat = new THREE.LineBasicMaterial({ 
        color: colors.teal, 
        transparent: true, 
        opacity: 0.15 
      });

      const connections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].position.distanceTo(nodes[j].position) < 4) {
            const points = [nodes[i].position, nodes[j].position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMat);
            group.add(line);
            connections.push({ line, n1: nodes[i], n2: nodes[j] });
          }
        }
      }

      // Traveling Pulses
      const pulses = [];
      const pulseCount = 15;
      const pulseGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: colors.warmOrange });

      for (let i = 0; i < pulseCount; i++) {
        if (connections.length === 0) break;
        const conn = connections[Math.floor(Math.random() * connections.length)];
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        pulse.userData = {
          connection: conn,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.005
        };
        group.add(pulse);
        pulses.push(pulse);
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1.8);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      const animate = (time) => {
        animationFrameId = requestAnimationFrame(animate);
        const t = time * 0.001;

        nodes.forEach(node => {
          node.position.y = node.userData.originalPos.y + Math.sin(t + node.userData.phase) * 0.5;
          node.rotation.y += 0.01;
        });

        connections.forEach(conn => {
          const positions = conn.line.geometry.attributes.position.array;
          positions[0] = conn.n1.position.x;
          positions[1] = conn.n1.position.y;
          positions[2] = conn.n1.position.z;
          positions[3] = conn.n2.position.x;
          positions[4] = conn.n2.position.y;
          positions[5] = conn.n2.position.z;
          conn.line.geometry.attributes.position.needsUpdate = true;
        });

        pulses.forEach(p => {
          p.userData.progress += p.userData.speed;
          if (p.userData.progress > 1) {
            p.userData.progress = 0;
            if (connections.length > 0) {
              p.userData.connection = connections[Math.floor(Math.random() * connections.length)];
            }
          }
          const conn = p.userData.connection;
          p.position.lerpVectors(conn.n1.position, conn.n2.position, p.userData.progress);
          p.scale.setScalar(1 + Math.sin(t * 8) * 0.4);
        });

        group.rotation.y += 0.001;
        renderer.render(scene, camera);
      };

      animate(0);
    } else {
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Absolute positioning to make sure canvas is strictly contained inside the parent div
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      container.appendChild(renderer.domElement);

      const nodeCount = 50;
      const nodes = [];
      const groupGeometry = new THREE.IcosahedronGeometry(0.15, 1);
      const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);

      const blue = new THREE.Color(0xadc7f7); // Glowing light blue for nodes
      const orange = new THREE.Color(0xed8936);
      const teal = new THREE.Color(0x319795);

      for (let i = 0; i < nodeCount; i++) {
        const isHub = i % 10 === 0;
        const material = new THREE.MeshPhongMaterial({
          color: isHub ? orange : Math.random() > 0.5 ? blue : teal,
          emissive: isHub ? orange : Math.random() > 0.5 ? blue : teal,
          emissiveIntensity: 0.8
        });

        const mesh = new THREE.Mesh(isHub ? groupGeometry : nodeGeometry, material);

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 5 + 1;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 4
        );

        mesh.userData = {
          isHub,
          originalPos: mesh.position.clone(),
          floatSpeed: Math.random() * 0.005 + 0.002,
          floatOffset: Math.random() * Math.PI * 2
        };

        scene.add(mesh);
        nodes.push(mesh);
      }

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xadc7f7, // Glowing light blue for lines
        transparent: true,
        opacity: 0.3 // Increased opacity for contrast
      });
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(nodeCount * nodeCount * 3);
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      function updateConnections() {
        const positions = lines.geometry.attributes.position.array;
        let counter = 0;
        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dist = nodes[i].position.distanceTo(nodes[j].position);
            if (dist < 3) {
              positions[counter++] = nodes[i].position.x;
              positions[counter++] = nodes[i].position.y;
              positions[counter++] = nodes[i].position.z;
              positions[counter++] = nodes[j].position.x;
              positions[counter++] = nodes[j].position.y;
              positions[counter++] = nodes[j].position.z;
            }
          }
        }
        lines.geometry.attributes.position.needsUpdate = true;
        lines.geometry.setDrawRange(0, counter / 3);
      }

      const animate = (t) => {
        animationFrameId = requestAnimationFrame(animate);

        nodes.forEach((node) => {
          const time = t * 0.001;
          node.position.y =
            node.userData.originalPos.y + Math.sin(time + node.userData.floatOffset) * 0.2;
          node.rotation.x += 0.01;
          node.rotation.y += 0.01;
        });

        updateConnections();
        scene.rotation.y = Math.sin(t * 0.0001) * 0.1;
        renderer.render(scene, camera);
      };

      animate(0);
    }

    // Modern ResizeObserver to handle canvas resizing dynamically
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pillarId]);

  return <div ref={containerRef} className="w-full h-full relative" />;
}
