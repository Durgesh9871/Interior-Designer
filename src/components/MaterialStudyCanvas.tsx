'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function MaterialStudyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<'basalt' | 'limestone' | 'brass' | 'timber'>('basalt');

  useEffect(() => {
    // Only mount WebGL on desktop devices with motion allowed
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopCheck = window.innerWidth >= 1024 && !prefersReduced;
    setIsDesktop(desktopCheck);

    if (!desktopCheck || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161714);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap DPR at 1.5 as per SKILL.md
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for architectural sculptural composition
    const compositionGroup = new THREE.Group();
    scene.add(compositionGroup);

    // 1. Basalt Charcoal Plinth
    const basaltGeo = new THREE.BoxGeometry(1.6, 0.28, 1.6);
    const basaltMat = new THREE.MeshStandardMaterial({
      color: 0x1f211c,
      roughness: 0.88,
      metalness: 0.1,
    });
    const basaltMesh = new THREE.Mesh(basaltGeo, basaltMat);
    basaltMesh.position.set(0, -0.65, 0);
    compositionGroup.add(basaltMesh);

    // 2. Limestone Vertical Screen Monolith
    const limestoneGeo = new THREE.BoxGeometry(0.22, 1.7, 0.9);
    const limestoneMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece3,
      roughness: 0.65,
      metalness: 0.05,
    });
    const limestoneMesh = new THREE.Mesh(limestoneGeo, limestoneMat);
    limestoneMesh.position.set(-0.55, 0.35, 0.2);
    compositionGroup.add(limestoneMesh);

    // 3. Aged Brass Louver Fin
    const brassGeo = new THREE.BoxGeometry(0.08, 1.4, 0.65);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xa8865d,
      roughness: 0.32,
      metalness: 0.88,
    });
    const brassMesh = new THREE.Mesh(brassGeo, brassMat);
    brassMesh.position.set(0.48, 0.2, -0.15);
    compositionGroup.add(brassMesh);

    // 4. Floating Warm Amber Core / Light Court
    const coreGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xa85d42,
      roughness: 0.5,
      metalness: 0.2,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0.05, -0.1, 0.35);
    coreMesh.rotation.y = Math.PI / 4;
    compositionGroup.add(coreMesh);

    // Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Cool skylight fill
    const dirLight1 = new THREE.DirectionalLight(0xd9e5f5, 1.8);
    dirLight1.position.set(4, 5, 3);
    scene.add(dirLight1);

    // Warm amber interior light
    const pointLight = new THREE.PointLight(0xffa866, 2.5, 8);
    pointLight.position.set(0, 0.4, 1.2);
    scene.add(pointLight);

    // Gentle mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.25;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Pause render loop when canvas is outside viewport via IntersectionObserver
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Stop rendering when offscreen as per SKILL.md

      const elapsed = clock.getElapsedTime();

      // Subtle resting rotation
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      compositionGroup.rotation.y = elapsed * 0.18 + mouseX;
      compositionGroup.rotation.x = 0.15 + mouseY;

      // Soft breathing motion on the amber core
      coreMesh.position.y = -0.1 + Math.sin(elapsed * 1.4) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);

      // Clean up geometries and materials to avoid memory leaks
      [basaltGeo, limestoneGeo, brassGeo, coreGeo].forEach((g) => g.dispose());
      [basaltMat, limestoneMat, brassMat, coreMat].forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full bg-ink text-paper border border-line-light overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        {/* Left Editorial Text & Material Selector */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line-light">
          <div>
            <span className="idc-eyebrow text-clay block mb-3">Tectonic Study · Desktop Visualisation</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-paper font-normal leading-tight mb-4">
              Materiality, Light & Spatial Density
            </h3>
            <p className="text-paper/70 text-sm leading-relaxed mb-8">
              We treat construction materials as emotional substances. Tactile roughness, specular metallic sheen, and ivory stone filters dialogue directly with Bengaluru’s shifting natural daylight.
            </p>

            {/* Material Swatch Details */}
            <div className="space-y-3">
              <button
                onClick={() => setActiveMaterial('basalt')}
                className={`w-full text-left p-3.5 border transition-all text-xs flex items-center justify-between ${
                  activeMaterial === 'basalt'
                    ? 'border-clay bg-paper/5 text-paper'
                    : 'border-line-light text-paper/60 hover:text-paper hover:border-paper/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#1f211c] border border-paper/30 shrink-0" />
                  <span className="font-medium uppercase tracking-wider">01. Basalt Charcoal Plinth</span>
                </div>
                <span className="font-mono text-[10px] text-paper/40">Density & Base</span>
              </button>

              <button
                onClick={() => setActiveMaterial('limestone')}
                className={`w-full text-left p-3.5 border transition-all text-xs flex items-center justify-between ${
                  activeMaterial === 'limestone'
                    ? 'border-clay bg-paper/5 text-paper'
                    : 'border-line-light text-paper/60 hover:text-paper hover:border-paper/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#f0ece3] border border-paper/30 shrink-0" />
                  <span className="font-medium uppercase tracking-wider">02. Ivory Limestone Screen</span>
                </div>
                <span className="font-mono text-[10px] text-paper/40">Solar Filter</span>
              </button>

              <button
                onClick={() => setActiveMaterial('brass')}
                className={`w-full text-left p-3.5 border transition-all text-xs flex items-center justify-between ${
                  activeMaterial === 'brass'
                    ? 'border-clay bg-paper/5 text-paper'
                    : 'border-line-light text-paper/60 hover:text-paper hover:border-paper/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#a8865d] border border-paper/30 shrink-0" />
                  <span className="font-medium uppercase tracking-wider">03. Aged Patinated Brass</span>
                </div>
                <span className="font-mono text-[10px] text-paper/40">Tactile Pivot</span>
              </button>

              <button
                onClick={() => setActiveMaterial('timber')}
                className={`w-full text-left p-3.5 border transition-all text-xs flex items-center justify-between ${
                  activeMaterial === 'timber'
                    ? 'border-clay bg-paper/5 text-paper'
                    : 'border-line-light text-paper/60 hover:text-paper hover:border-paper/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#a85d42] border border-paper/30 shrink-0" />
                  <span className="font-medium uppercase tracking-wider">04. Warm Clay & Teak Core</span>
                </div>
                <span className="font-mono text-[10px] text-paper/40">Living Anchor</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-line-light flex items-center justify-between text-[11px] text-paper/40 font-mono">
            <span>THREE.JS ARCHITECTURAL SCENE</span>
            <span>CAP DPR 1.5 · LAZY RENDER</span>
          </div>
        </div>

        {/* Right Scene / Fallback Display */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full flex items-center justify-center bg-[#11120f]">
          {/* WebGL Canvas Mount (Desktop) */}
          <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            style={{ display: isDesktop ? 'block' : 'none' }}
          />

          {/* Non-Desktop / Reduced-Motion Fallback Poster */}
          {!isDesktop && (
            <div className="p-8 text-center max-w-md space-y-4">
              <div className="w-24 h-24 mx-auto border border-clay/40 bg-paper/5 rotate-45 flex items-center justify-center">
                <div className="w-12 h-12 bg-limestone/20 border border-limestone/40" />
              </div>
              <span className="idc-eyebrow text-clay block">Static Architectural Study</span>
              <p className="text-paper/80 text-sm leading-relaxed">
                Physical architectural samples are curated and reviewed in physical mock-ups at our Bengaluru studio.
              </p>
              <div className="text-[11px] text-paper/40 font-mono">
                [High-performance static fallback active on mobile devices]
              </div>
            </div>
          )}

          {/* Desktop Interaction Prompt */}
          {isDesktop && (
            <div className="absolute bottom-4 right-4 pointer-events-none bg-ink/70 backdrop-blur-sm px-3 py-1.5 border border-line-light text-[10px] text-paper/60 font-mono tracking-wider">
              MOVE CURSOR TO ROTATE TECTONIC COMPOSITION
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
