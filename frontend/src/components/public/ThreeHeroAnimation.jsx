import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Network nodes logic
    const nodeCount = 40;
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    // Metro Blue color
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0x2b6cb0, emissive: 0x2b6cb0, emissiveIntensity: 0.5 });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      );
      mesh.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        )
      };
      scene.add(mesh);
      nodes.push(mesh);
    }

    // Node lines connections
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xed8936, transparent: true, opacity: 0.2 }); // Warm Orange
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodeCount * nodeCount * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    function updateLines() {
      const positions = lines.geometry.attributes.position.array;
      let counter = 0;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < 2.5) {
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

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      nodes.forEach((node) => {
        node.position.add(node.userData.velocity);
        if (Math.abs(node.position.x) > 4) node.userData.velocity.x *= -1;
        if (Math.abs(node.position.y) > 4) node.userData.velocity.y *= -1;
        if (Math.abs(node.position.z) > 2) node.userData.velocity.z *= -1;
      });

      updateLines();
      scene.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative" />;
}
