'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import {
  RotateCcw,
  Sun,
  Moon,
  Layers,
  Sparkles,
  Eye,
  Compass,
  ArrowUpRight,
  Move3d,
  Armchair,
  Trees,
  Grid3X3,
  CheckCircle2,
  Maximize2,
  Home,
} from 'lucide-react';

export default function InteractiveHouse3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const isIntersectingRef = useRef<boolean>(true);

  // Layer groups for dynamic assembly
  const interiorGroupRef = useRef<THREE.Group | null>(null);
  const louversGroupRef = useRef<THREE.Group | null>(null);
  const landscapeGroupRef = useRef<THREE.Group | null>(null);
  const glassGroupRef = useRef<THREE.Group | null>(null);
  const houseGroupRef = useRef<THREE.Group | null>(null);

  // Lights
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const pointLightsRef = useRef<THREE.PointLight[]>([]);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  // UI States
  const [lightingMode, setLightingMode] = useState<'evening' | 'daylight'>('evening');
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [activePreset, setActivePreset] = useState<'perspective' | 'top' | 'interior' | 'pool' | 'entrance'>('perspective');

  // Interactive Layer Toggles (Requested by user: clicking buttons adds elements to complete the house/interior)
  const [showInteriors, setShowInteriors] = useState(true);
  const [showLouvers, setShowLouvers] = useState(true);
  const [showLandscape, setShowLandscape] = useState(true);
  const [showGlass, setShowGlass] = useState(true);

  // Camera Animation Helper (Reliably updates camera position and OrbitControls target)
  const animateCamera = useCallback(
    (camTarget: { x: number; y: number; z: number }, lookTarget: { x: number; y: number; z: number }) => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);

      gsap.to(camera.position, {
        x: camTarget.x,
        y: camTarget.y,
        z: camTarget.z,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          controls.update();
        },
      });

      gsap.to(controls.target, {
        x: lookTarget.x,
        y: lookTarget.y,
        z: lookTarget.z,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          controls.update();
        },
      });
    },
    []
  );

  const setCameraPreset = (preset: 'perspective' | 'top' | 'interior' | 'pool' | 'entrance') => {
    setActivePreset(preset);
    if (preset === 'perspective') {
      // Classic 3/4 Exterior View
      animateCamera({ x: 7.5, y: 5.2, z: 8.5 }, { x: 0, y: 1.2, z: 0 });
    } else if (preset === 'top') {
      // Top-Down Roof & Architectural Plan View
      animateCamera({ x: 0.1, y: 12.0, z: 0.8 }, { x: 0, y: 0.5, z: 0 });
    } else if (preset === 'interior') {
      // Zoomed-in Interior Living Room View
      animateCamera({ x: -0.2, y: 1.35, z: 2.2 }, { x: -1.2, y: 1.1, z: -0.8 });
    } else if (preset === 'pool') {
      // Courtyard Reflection Pool & Stepping Stones
      animateCamera({ x: -4.5, y: 1.8, z: 4.8 }, { x: -1.8, y: 0.8, z: 1.8 });
    } else if (preset === 'entrance') {
      // Ground Arrival Walkway
      animateCamera({ x: 3.5, y: 1.5, z: 6.2 }, { x: 0.8, y: 1.4, z: 0.5 });
    }
  };

  // Toggle individual layers with scale animation
  const toggleLayer = (layer: 'interiors' | 'louvers' | 'landscape' | 'glass') => {
    let group: THREE.Group | null = null;
    let nextState = false;

    if (layer === 'interiors') {
      nextState = !showInteriors;
      setShowInteriors(nextState);
      group = interiorGroupRef.current;
    } else if (layer === 'louvers') {
      nextState = !showLouvers;
      setShowLouvers(nextState);
      group = louversGroupRef.current;
    } else if (layer === 'landscape') {
      nextState = !showLandscape;
      setShowLandscape(nextState);
      group = landscapeGroupRef.current;
    } else if (layer === 'glass') {
      nextState = !showGlass;
      setShowGlass(nextState);
      group = glassGroupRef.current;
    }

    if (group) {
      if (nextState) {
        group.visible = true;
        gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'back.out(1.5)' });
      } else {
        gsap.to(group.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            if (group) group.visible = false;
          },
        });
      }
    }
  };

  // Complete Villa Master Button (Adds all layers end-to-end)
  const completeTurnkeyVilla = () => {
    setShowInteriors(true);
    setShowLouvers(true);
    setShowLandscape(true);
    setShowGlass(true);

    [interiorGroupRef.current, louversGroupRef.current, landscapeGroupRef.current, glassGroupRef.current].forEach(
      (grp) => {
        if (grp) {
          grp.visible = true;
          gsap.to(grp.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(1.4)' });
        }
      }
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1013);
    scene.fog = new THREE.FogExp2(0x0e1013, 0.045);
    sceneRef.current = scene;

    // 2. CAMERA (Responsive FOV & position on phones)
    const isPhone = width < 640;
    const camera = new THREE.PerspectiveCamera(isPhone ? 46 : 38, width / height, 0.1, 100);
    camera.position.set(isPhone ? 9.2 : 7.5, isPhone ? 6.0 : 5.2, isPhone ? 10.2 : 8.5);
    cameraRef.current = camera;

    // 3. RENDERER (Optimized for silky 60fps performance)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5)); // Capped to 1.5 to prevent GPU bottleneck
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 + 0.12;
    controls.minDistance = 2.8;
    controls.maxDistance = 16.5;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 5. LIGHTING SYSTEM
    const hemiLight = new THREE.HemisphereLight(0x405565, 0x111315, 0.9);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xffecd0, 2.2);
    dirLight.position.set(8, 12, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Warm Interior Spot / Point Lights
    const interiorLight1 = new THREE.PointLight(0xffa855, 2.6, 6);
    interiorLight1.position.set(-1.0, 1.5, 0.2);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffb866, 2.8, 7);
    interiorLight2.position.set(1.5, 2.6, 0.4);
    scene.add(interiorLight2);

    const poolLight = new THREE.PointLight(0x66d9ff, 1.6, 4);
    poolLight.position.set(-1.8, 0.3, 1.8);
    scene.add(poolLight);

    pointLightsRef.current = [interiorLight1, interiorLight2, poolLight];

    // 6. MATERIALS PALETTE
    const basaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1c1e,
      roughness: 0.85,
      metalness: 0.1,
    });

    const limestoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0ece3,
      roughness: 0.65,
      metalness: 0.05,
    });

    const teakMaterial = new THREE.MeshStandardMaterial({
      color: 0x825432,
      roughness: 0.45,
      metalness: 0.15,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.28,
      metalness: 0.88,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4f0f7,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.35,
    });

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b434d,
      roughness: 0.08,
      metalness: 0.7,
      transparent: true,
      opacity: 0.8,
    });

    const grassMaterial = new THREE.MeshStandardMaterial({
      color: 0x243325,
      roughness: 0.9,
      metalness: 0.02,
    });

    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2e33,
      roughness: 0.8,
      metalness: 0.05,
    });

    // 7. SCENE HIERARCHY
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);
    houseGroupRef.current = houseGroup;

    // Sub-groups for layer toggling
    const interiorGroup = new THREE.Group();
    const louversGroup = new THREE.Group();
    const landscapeGroup = new THREE.Group();
    const glassGroup = new THREE.Group();

    houseGroup.add(interiorGroup);
    houseGroup.add(louversGroup);
    houseGroup.add(landscapeGroup);
    houseGroup.add(glassGroup);

    interiorGroupRef.current = interiorGroup;
    louversGroupRef.current = louversGroup;
    landscapeGroupRef.current = landscapeGroup;
    glassGroupRef.current = glassGroup;

    // --- BASE STRUCTURE (Always Part of Core Shell) ---
    // Ground site podium
    const lawnGeo = new THREE.BoxGeometry(11, 0.2, 10);
    const lawnMesh = new THREE.Mesh(lawnGeo, grassMaterial);
    lawnMesh.position.set(0, -0.1, 0);
    lawnMesh.receiveShadow = true;
    houseGroup.add(lawnMesh);

    // Basalt foundation plinth
    const plinthGeo = new THREE.BoxGeometry(8.5, 0.35, 7.5);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMaterial);
    plinthMesh.position.set(0, 0.175, 0);
    plinthMesh.receiveShadow = true;
    plinthMesh.castShadow = true;
    houseGroup.add(plinthMesh);

    // Back solid shear wall (Limestone)
    const backWallGeo = new THREE.BoxGeometry(7.2, 2.2, 0.3);
    const backWall = new THREE.Mesh(backWallGeo, limestoneMaterial);
    backWall.position.set(0, 1.45, -2.8);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    houseGroup.add(backWall);

    // Left shear wall
    const leftWallGeo = new THREE.BoxGeometry(0.3, 2.2, 4.4);
    const leftWall = new THREE.Mesh(leftWallGeo, limestoneMaterial);
    leftWall.position.set(-3.45, 1.45, -0.6);
    leftWall.castShadow = true;
    houseGroup.add(leftWall);

    // Structural Slim Columns
    const colGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 16);
    [-3.3, 0.8, 3.3].forEach((cx) => {
      const col = new THREE.Mesh(colGeo, brassMaterial);
      col.position.set(cx, 1.45, 0.5);
      col.castShadow = true;
      houseGroup.add(col);
    });

    // Intermediate Concrete Slab
    const slabGeo = new THREE.BoxGeometry(7.8, 0.28, 6.8);
    const slabMesh = new THREE.Mesh(slabGeo, limestoneMaterial);
    slabMesh.position.set(0.2, 2.65, -0.2);
    slabMesh.castShadow = true;
    slabMesh.receiveShadow = true;
    houseGroup.add(slabMesh);

    // Upper Story Cantilevered Master Suite
    const upperSuiteGeo = new THREE.BoxGeometry(4.8, 1.9, 4.4);
    const upperSuite = new THREE.Mesh(upperSuiteGeo, basaltMaterial);
    upperSuite.position.set(1.4, 3.75, 0.4);
    upperSuite.castShadow = true;
    upperSuite.receiveShadow = true;
    houseGroup.add(upperSuite);

    // Roof Slab
    const roofSlabGeo = new THREE.BoxGeometry(8.2, 0.25, 6.2);
    const roofSlab = new THREE.Mesh(roofSlabGeo, limestoneMaterial);
    roofSlab.position.set(0.4, 4.8, 0.2);
    roofSlab.castShadow = true;
    houseGroup.add(roofSlab);

    // --- LAYER 1: INTERIOR DESIGN & FITOUT (Toggled by user) ---
    // Floating cantilever travertine staircase
    for (let i = 0; i < 7; i++) {
      const treadGeo = new THREE.BoxGeometry(1.1, 0.08, 0.35);
      const tread = new THREE.Mesh(treadGeo, limestoneMaterial);
      tread.position.set(0.2, 0.5 + i * 0.28, -2.4 + i * 0.32);
      tread.castShadow = true;
      interiorGroup.add(tread);
    }

    // Italian Sectional Sofa
    const sofaMainGeo = new THREE.BoxGeometry(2.4, 0.36, 1.0);
    const sofaMain = new THREE.Mesh(sofaMainGeo, fabricMaterial);
    sofaMain.position.set(-1.4, 0.53, -1.8);
    sofaMain.castShadow = true;
    interiorGroup.add(sofaMain);

    const sofaLoungeGeo = new THREE.BoxGeometry(0.9, 0.36, 1.3);
    const sofaLounge = new THREE.Mesh(sofaLoungeGeo, fabricMaterial);
    sofaLounge.position.set(-2.55, 0.53, -1.25);
    sofaLounge.castShadow = true;
    interiorGroup.add(sofaLounge);

    // Minimalist Travertine Coffee Table
    const tableGeo = new THREE.BoxGeometry(1.4, 0.18, 0.9);
    const tableMesh = new THREE.Mesh(tableGeo, limestoneMaterial);
    tableMesh.position.set(-1.4, 0.44, -0.7);
    tableMesh.castShadow = true;
    interiorGroup.add(tableMesh);

    // Modern Dining Table
    const diningGeo = new THREE.BoxGeometry(2.0, 0.12, 1.0);
    const diningTable = new THREE.Mesh(diningGeo, teakMaterial);
    diningTable.position.set(1.5, 0.85, -1.5);
    diningTable.castShadow = true;
    interiorGroup.add(diningTable);

    // Dining table legs
    for (let dx = -0.85; dx <= 0.85; dx += 1.7) {
      for (let dz = -0.38; dz <= 0.38; dz += 0.76) {
        const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8);
        const leg = new THREE.Mesh(legGeo, brassMaterial);
        leg.position.set(1.5 + dx, 0.5, -1.5 + dz);
        leg.castShadow = true;
        interiorGroup.add(leg);
      }
    }

    // Sculptural Brass Pendant Light Cluster
    const pendantRingGeo = new THREE.TorusGeometry(0.35, 0.03, 16, 32);
    const pendantLight = new THREE.Mesh(pendantRingGeo, brassMaterial);
    pendantLight.rotation.x = Math.PI / 2;
    pendantLight.position.set(-1.4, 2.2, -0.7);
    interiorGroup.add(pendantLight);

    // --- LAYER 2: TEAK WOODWORK & LOUVERS (Toggled by user) ---
    // Upper facade vertical privacy louvers (Brise-Soleil)
    for (let l = 0; l < 14; l++) {
      const louverGeo = new THREE.BoxGeometry(0.06, 1.85, 0.28);
      const louver = new THREE.Mesh(louverGeo, teakMaterial);
      louver.position.set(-0.2 + l * 0.28, 3.75, 2.7);
      louver.castShadow = true;
      louversGroup.add(louver);
    }

    // Rooftop Timber Pergola
    for (let p = 0; p < 9; p++) {
      const pergGeo = new THREE.BoxGeometry(3.2, 0.08, 0.08);
      const perg = new THREE.Mesh(pergGeo, teakMaterial);
      perg.position.set(-1.6, 5.2, -1.6 + p * 0.4);
      perg.castShadow = true;
      louversGroup.add(perg);
    }

    // --- LAYER 3: COURTYARD POOL & LANDSCAPE (Toggled by user) ---
    // Reflection Water Basin
    const poolGeo = new THREE.BoxGeometry(3.6, 0.22, 2.6);
    const poolMesh = new THREE.Mesh(poolGeo, waterMaterial);
    poolMesh.position.set(-1.8, 0.24, 1.8);
    landscapeGroup.add(poolMesh);

    // Floating limestone stepping stones
    for (let s = -1; s <= 1; s++) {
      const stepGeo = new THREE.BoxGeometry(0.7, 0.26, 0.7);
      const stepMesh = new THREE.Mesh(stepGeo, limestoneMaterial);
      stepMesh.position.set(-1.8 + s * 1.0, 0.26, 1.8);
      stepMesh.castShadow = true;
      landscapeGroup.add(stepMesh);
    }

    // Garden Entrance Walkway
    const pathGeo = new THREE.BoxGeometry(1.6, 0.05, 3.8);
    const pathMesh = new THREE.Mesh(pathGeo, limestoneMaterial);
    pathMesh.position.set(1.6, 0.36, 3.2);
    pathMesh.receiveShadow = true;
    landscapeGroup.add(pathMesh);

    // Courtyard Frangipani Tree & Planter
    const trunkGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.8, 8);
    const trunk = new THREE.Mesh(trunkGeo, teakMaterial);
    trunk.position.set(-3.0, 1.1, 1.6);
    trunk.rotation.z = -0.15;
    landscapeGroup.add(trunk);

    const foliageGeo = new THREE.DodecahedronGeometry(0.85);
    const foliage = new THREE.Mesh(foliageGeo, grassMaterial);
    foliage.position.set(-3.2, 2.2, 1.6);
    foliage.castShadow = true;
    landscapeGroup.add(foliage);

    const planterGeo = new THREE.BoxGeometry(1.2, 0.45, 1.2);
    const planter = new THREE.Mesh(planterGeo, basaltMaterial);
    planter.position.set(-3.0, 0.4, 1.6);
    planter.castShadow = true;
    landscapeGroup.add(planter);

    // --- LAYER 4: GLASS CURTAIN WALLS ---
    // Ground Front Glass Wall
    const frontGlassGeo = new THREE.BoxGeometry(4.2, 2.15, 0.08);
    const frontGlass = new THREE.Mesh(frontGlassGeo, glassMaterial);
    frontGlass.position.set(-1.2, 1.45, 0.5);
    glassGroup.add(frontGlass);

    // Ground Side Glass Wall
    const sideGlassGeo = new THREE.BoxGeometry(0.08, 2.15, 2.8);
    const sideGlass = new THREE.Mesh(sideGlassGeo, glassMaterial);
    sideGlass.position.set(0.9, 1.45, -0.9);
    glassGroup.add(sideGlass);

    // Upper Glass Wall
    const upperGlassGeo = new THREE.BoxGeometry(3.6, 1.7, 0.08);
    const upperGlass = new THREE.Mesh(upperGlassGeo, glassMaterial);
    upperGlass.position.set(1.4, 3.75, 2.62);
    glassGroup.add(upperGlass);

    // Balcony Glass Railing
    const railGeo = new THREE.BoxGeometry(3.8, 0.6, 0.04);
    const rail = new THREE.Mesh(railGeo, glassMaterial);
    rail.position.set(1.4, 3.0, 3.1);
    glassGroup.add(rail);

    // 8. RENDER LOOP WITH INTERSECTION OBSERVER (Eliminates page lag completely)
    let animationId: number;

    const animate = () => {
      if (!isIntersectingRef.current) return; // PAUSE RAF when user scrolls past section!

      animationId = requestAnimationFrame(animate);
      controls.update();

      // Subtle water ripple
      if (poolMesh) {
        poolMesh.position.y = 0.24 + Math.sin(Date.now() * 0.003) * 0.005;
      }

      renderer.render(scene, camera);
    };

    // IntersectionObserver to avoid GPU drain when section is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Initial render
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const isPhoneRes = w < 640;
      camera.aspect = w / h;
      camera.fov = isPhoneRes ? 46 : 38;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Lighting Toggle
  const toggleLighting = (mode: 'evening' | 'daylight') => {
    setLightingMode(mode);
    const dirLight = dirLightRef.current;
    const hemiLight = hemiLightRef.current;
    const pointLights = pointLightsRef.current;

    if (mode === 'daylight') {
      if (dirLight) {
        dirLight.color.setHex(0xffffff);
        dirLight.intensity = 3.2;
        dirLight.position.set(6, 14, 5);
      }
      if (hemiLight) {
        hemiLight.color.setHex(0xebf4ff);
        hemiLight.groundColor.setHex(0x283038);
        hemiLight.intensity = 1.3;
      }
      pointLights.forEach((p) => {
        p.intensity = 1.0;
      });
    } else {
      if (dirLight) {
        dirLight.color.setHex(0xd0e2ff);
        dirLight.intensity = 1.6;
        dirLight.position.set(8, 10, 6);
      }
      if (hemiLight) {
        hemiLight.color.setHex(0x2d3a4a);
        hemiLight.groundColor.setHex(0x101215);
        hemiLight.intensity = 0.8;
      }
      pointLights.forEach((p) => {
        p.intensity = 2.8;
      });
    }
  };

  // Wireframe Toggle
  const toggleWireframe = () => {
    const nextState = !wireframeMode;
    setWireframeMode(nextState);
    if (!houseGroupRef.current) return;

    houseGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = nextState));
        } else {
          child.material.wireframe = nextState;
        }
      }
    });
  };

  // Turntable Auto-Rotate Toggle
  const toggleAutoRotate = () => {
    const nextState = !isAutoRotating;
    setIsAutoRotating(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
      controlsRef.current.autoRotateSpeed = 1.2;
    }
  };

  return (
    <section className="py-14 sm:py-28 bg-[#0e1013] text-white relative overflow-hidden border-b border-white/10" aria-labelledby="model3d-heading">
      <div className="idc-shell">
        {/* Section Header — Clean without clutter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10">
          <div className="space-y-2 sm:space-y-3">
            <div className="badge-pill-dark text-[10px] sm:text-xs py-0.5 sm:py-1 px-2.5 sm:px-3">
              <Move3d className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Interactive 3D Architectural Model</span>
            </div>
            <h2 id="model3d-heading" className="font-display text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
              Explore The Residence in Real-Time 3D
            </h2>
            <p className="font-body text-xs sm:text-base text-white/70 max-w-2xl leading-relaxed">
              Drag to rotate 360°, scroll to zoom, or pan. Use the architectural layer slider below to dynamically assemble the interior fitout, teak louvers, and reflection pool.
            </p>
          </div>

          {/* Quick Master Turnkey Completion Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={completeTurnkeyVilla}
              className="btn-primary text-xs py-2 sm:py-2.5 px-4 sm:px-5 flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto"
              title="Show all architectural and interior layers"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complete Turnkey Residence</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Viewport Box: Compact 390px on phones, 580px+ on desktop */}
        <div className="mt-6 sm:mt-8 relative w-full h-[390px] sm:h-[580px] lg:h-[650px] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 card-dark-shadow bg-[#0a0c0e]">
          {/* Three.js WebGL Canvas Mount */}
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Top Bar: Left = Single-line swipeable Camera Slider | Right = Mode switches */}
          <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between gap-2 pointer-events-none z-20">
            {/* Horizontal Swipeable Camera Presets Slider (ONE LINE, no scrollbar) */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 overflow-x-auto no-scrollbar pointer-events-auto shadow-2xl max-w-[calc(100%-110px)] sm:max-w-none">
              {[
                { id: 'perspective', label: 'Exterior 3/4', icon: Eye },
                { id: 'top', label: 'Top Roof', icon: Compass },
                { id: 'interior', label: 'Interior Living', icon: Armchair },
                { id: 'pool', label: 'Courtyard Pool', icon: Sparkles },
                { id: 'entrance', label: 'Arrival', icon: ArrowUpRight },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setCameraPreset(p.id as any)}
                    className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                      activePreset === p.id
                        ? 'bg-[#c5a059] text-white shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mode Switches: Lighting & Wireframe & Spin in a single compact pill */}
            <div className="flex items-center gap-1 pointer-events-auto shrink-0 bg-black/80 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-2xl">
              <button
                onClick={() => toggleLighting(lightingMode === 'evening' ? 'daylight' : 'evening')}
                className="p-1 sm:p-1.5 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Toggle Daylight / Evening"
              >
                {lightingMode === 'evening' ? <Moon className="w-3.5 h-3.5 text-[#c5a059]" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
              </button>
              <button
                onClick={toggleWireframe}
                className={`p-1 sm:p-1.5 rounded-full text-white/80 transition-colors cursor-pointer ${
                  wireframeMode ? 'text-[#c5a059] bg-white/15' : 'hover:text-white'
                }`}
                title="Toggle Wireframe Blueprint"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleAutoRotate}
                className={`p-1 sm:p-1.5 rounded-full text-white/80 transition-colors cursor-pointer ${
                  isAutoRotating ? 'text-emerald-400 bg-white/15' : 'hover:text-white'
                }`}
                title="Toggle 360 Turntable Spin"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Floating Bottom Bar: Design Layer Slider (ONE LINE, no scrollbar) */}
          <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between gap-2 pointer-events-none z-20">
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl sm:rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 overflow-x-auto no-scrollbar pointer-events-auto shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] font-mono text-white/50 px-1 uppercase hidden md:inline shrink-0">
                Layers:
              </span>

              {/* Toggle Interior Furnishings */}
              <button
                onClick={() => toggleLayer('interiors')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  showInteriors
                    ? 'bg-[#1b4d3e] text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <Armchair className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{showInteriors ? '✓ Interior' : '+ Interior'}</span>
              </button>

              {/* Toggle Teak Louvers */}
              <button
                onClick={() => toggleLayer('louvers')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  showLouvers
                    ? 'bg-[#1b4d3e] text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <Grid3X3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{showLouvers ? '✓ Louvers' : '+ Louvers'}</span>
              </button>

              {/* Toggle Landscape & Pool */}
              <button
                onClick={() => toggleLayer('landscape')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  showLandscape
                    ? 'bg-[#1b4d3e] text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <Trees className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{showLandscape ? '✓ Pool & Trees' : '+ Pool & Trees'}</span>
              </button>

              {/* Toggle Glass Walls */}
              <button
                onClick={() => toggleLayer('glass')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  showGlass
                    ? 'bg-[#1b4d3e] text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{showGlass ? '✓ Glass' : '+ Glass'}</span>
              </button>
            </div>

            {/* Desktop interaction hint */}
            <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[10px] text-white/70 font-mono hidden lg:flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span>DRAG MOUSE TO ORBIT</span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            {
              title: 'Cantilevered Villa Structure',
              desc: 'Deep basalt plinth and overhangs sheltering against solar heat.',
              badge: 'CORE SHELL',
            },
            {
              title: 'Curated Interior Furnishings',
              desc: 'Italian sectional seating, travertine tables, and floating stairs.',
              badge: 'INTERIORS',
            },
            {
              title: 'Microclimatic Teak Louvers',
              desc: 'Brise-soleil slats regulating sunlight and natural breezes.',
              badge: 'WOODWORK',
            },
            {
              title: 'Cooling Reflection Basin',
              desc: 'Internal courtyard water body buffering tropical humidity.',
              badge: 'LANDSCAPE',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 card-dark-shadow space-y-1">
              <span className="text-[10px] font-mono text-[#c5a059] block">{item.badge}</span>
              <div className="font-body text-sm font-semibold text-white">{item.title}</div>
              <div className="text-xs text-white/60">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
