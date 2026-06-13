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
        metroBlue: new THREE.Color(0xadc7f7), // Light blue for high visibility and glow on dark background
        warmOrange: new THREE.Color(0xf6ad55),
        teal: new THREE.Color(0x4fd1c5),
        glow: new THREE.Color(0xffffff)
      };

      const group = new THREE.Group();
      scene.add(group);

      // Opportunity Rings (Ground levels)
      for (let i = 0; i < 4; i++) {
        const radius = (i + 1) * 3;
        const geometry = new THREE.RingGeometry(radius, radius + 0.15, 128); // Increased width from 0.05 to 0.15
        const material = new THREE.MeshBasicMaterial({ 
          color: 0xa5eff0, // Glowing light teal/cyan
          transparent: true,
          opacity: 0.55, // Set opacity for a sleek holographic outline
          side: THREE.DoubleSide 
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }

      // Paths: Arched curves
      const paths = [];
      const pathCount = 18;
      const hubPosition = new THREE.Vector3(0, 0.5, 0);

      for (let i = 0; i < pathCount; i++) {
        const angle = (i / pathCount) * Math.PI * 2;
        const startRadius = 12;
        const startPos = new THREE.Vector3(
          Math.cos(angle) * startRadius,
          0,
          Math.sin(angle) * startRadius
        );
        
        const midPos = startPos.clone().multiplyScalar(0.5);
        midPos.y = 4 + Math.random() * 3;

        const curve = new THREE.CatmullRomCurve3([startPos, midPos, hubPosition]);
        paths.push(curve);

        const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.045, 8, false); // Thickened tubes
        const tubeMat = new THREE.MeshBasicMaterial({ 
          color: 0xadc7f7, // Glowing light blue
          transparent: true,
          opacity: 0.45 // High opacity for visible, glowing path networks
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        group.add(tube);
      }

      // Moving Pulses (The flow of people)
      const pulses = [];
      const pulseCount = 65;
      const pulseGeo = new THREE.SphereGeometry(0.15, 16, 16); // Slightly larger pulses

      for (let i = 0; i < pulseCount; i++) {
        const isOrange = Math.random() > 0.4;
        const material = new THREE.MeshPhongMaterial({
          color: isOrange ? colors.warmOrange : colors.teal,
          emissive: isOrange ? colors.warmOrange : colors.teal,
          emissiveIntensity: 3,
          shininess: 100
        });
        const pulse = new THREE.Mesh(pulseGeo, material);
        const pathIndex = Math.floor(Math.random() * pathCount);
        
        pulse.userData = {
          path: paths[pathIndex],
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          phase: Math.random() * Math.PI * 2
        };
        
        group.add(pulse);
        pulses.push(pulse);
      }

      // Central Hub
      const hubGeo = new THREE.IcosahedronGeometry(0.9, 2); // Core hub
      const hubMat = new THREE.MeshPhongMaterial({ 
        color: 0xa5eff0, // Glowing cyan/teal core
        emissive: 0xa5eff0,
        emissiveIntensity: 1.8 // Bright glowing core
      });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.copy(hubPosition);
      group.add(hub);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 2);
      pointLight.position.set(10, 20, 10);
      scene.add(pointLight);

      const animate = (time) => {
        animationFrameId = requestAnimationFrame(animate);
        const t = time * 0.001;

        pulses.forEach(p => {
          p.userData.progress += p.userData.speed;
          if (p.userData.progress > 1) p.userData.progress = 0;
          
          const pos = p.userData.path.getPointAt(p.userData.progress);
          p.position.copy(pos);
          
          const scale = 1 + Math.sin(t * 8 + p.userData.progress * 20) * 0.4;
          p.scale.set(scale, scale, scale);
          p.material.emissiveIntensity = 2 + Math.sin(t * 10 + p.userData.phase) * 1.5;
        });

        hub.rotation.y += 0.01;
        hub.rotation.x += 0.005;
        hub.position.y = 0.5 + Math.sin(t * 3) * 0.2;
        hub.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
        
        group.rotation.y += 0.002;
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
