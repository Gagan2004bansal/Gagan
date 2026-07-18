import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "kvmemo",
    name: "KVMemo",
    sub: "High-performance C++ key-value store",
    url: "https://www.kvmemo.dev/",
    tags: ["C++", "Systems", "ARM64"],
    color: "#16a34a",
  },
  {
    id: "oforge",
    name: "OForge",
    sub: "Collaborative DB schema designer",
    url: "https://oforge.vercel.app",
    tags: ["React", "PostgreSQL", "Socket.IO"],
    color: "#2563eb",
  },
  {
    id: "paperstack",
    name: "Paperstack",
    sub: "Multi-PDF RAG chatbot",
    url: "https://github.com/Gagan2004bansal/",
    tags: ["FastAPI", "LangChain", "Pinecone"],
    color: "#9333ea",
  },
  {
    id: "sangam",
    name: "SANGAM",
    sub: "Real-time collaborative notes",
    url: "https://github.com/Gagan2004bansal/SANGAM",
    tags: ["React", "WebSockets", "Node.js"],
    color: "#ea580c",
  },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function ClockWidget({ fontSize = 13 }) {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", textAlign: "center", lineHeight: 1 }}>
      <div style={{ fontSize, color: "#16a34a", fontWeight: 500, letterSpacing: "0.06em" }}>
        {pad(t.getHours())}:{pad(t.getMinutes())}
      </div>
      <div style={{ fontSize: fontSize * 0.65, color: "#1f3a1f", marginTop: 2, letterSpacing: "0.08em" }}>
        {pad(t.getSeconds())}
      </div>
      <div style={{ fontSize: fontSize * 0.55, color: "#1a2a1a", marginTop: 3, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {t.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </div>
    </div>
  );
}

export default function LivePortfolioDemo() {
  const mountRef = useRef(null);
  const threeRef = useRef({});
  const initializedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [monitorPos, setMonitorPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [laptopPos, setLaptopPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const project = PROJECTS[active];

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    if (!mountRef.current) return;

    let animId;
    let THREE;
    let W = mountRef.current.clientWidth;
    let H = mountRef.current.clientHeight;

    const getScreenRect = (mesh) => {
      if (!THREE || !threeRef.current.camera) return null;
      const { camera } = threeRef.current;
      const box = new THREE.Box3().setFromObject(mesh);
      const corners = [
        new THREE.Vector3(box.min.x, box.min.y, box.max.z),
        new THREE.Vector3(box.max.x, box.min.y, box.max.z),
        new THREE.Vector3(box.max.x, box.max.y, box.max.z),
        new THREE.Vector3(box.min.x, box.max.y, box.max.z),
      ];
      const pts = corners.map((v) => {
        v.project(camera);
        return { x: ((v.x + 1) / 2) * W, y: ((-v.y + 1) / 2) * H };
      });
      const xs = pts.map((p) => p.x);
      const ys = pts.map((p) => p.y);
      return {
        x: Math.min(...xs),
        y: Math.min(...ys),
        w: Math.max(...xs) - Math.min(...xs),
        h: Math.max(...ys) - Math.min(...ys),
      };
    };

    const init = async () => {
      THREE = await import("https://esm.sh/three@0.155.0");

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x0a0505);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;display:block;";
      mountRef.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a0505, 0.025);
      scene.background = new THREE.Color(0x0a0505);

      // ── Camera: pulled back + shifted right so desk lamp on LEFT is visible ──
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.set(2.2, 3.2, 10.5);
      camera.lookAt(0.5, 0.9, 0);
      threeRef.current = { renderer, scene, camera, THREE };

      const M  = (c, opts = {}) => new THREE.MeshLambertMaterial({ color: c, ...opts });
      const MB = (c) => new THREE.MeshBasicMaterial({ color: c });
      const MS = (c, r = 0.4, m = 0.05) =>
        new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });

      /* ── Floor & Walls ── */
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(22, 16), M(0x0d0805));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.8;
      floor.receiveShadow = true;
      scene.add(floor);

      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(22, 12), M(0x0f0808));
      backWall.position.set(0, 2.4, -4.5);
      scene.add(backWall);

      const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), M(0x0d0805));
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(-9, 2.4, 3.0);
      scene.add(leftWall);

      const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), M(0x0b0704));
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(9, 2.4, 3.0);
      scene.add(rightWall);

      /* ── RGB Mood Lights ── */
      const pinkLight = new THREE.PointLight(0xff1493, 2.2, 18);
      pinkLight.position.set(-6, 3.5, -2);
      scene.add(pinkLight);

      const purpleLight = new THREE.PointLight(0x9d00ff, 2.0, 16);
      purpleLight.position.set(0, 3.8, -3.5);
      scene.add(purpleLight);

      const orangeLight = new THREE.PointLight(0xff6b35, 1.8, 14);
      orangeLight.position.set(7, 2.5, 2);
      scene.add(orangeLight);

      /* ── Hanging Tube Light (above monitor) ── */
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 2.4, 8), MB(0x1a1a1a));
      wire.position.set(-0.8, 3.7, -0.8);
      scene.add(wire);

      const lampFixture = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.24, 0.42), M(0x0d0d0d));
      lampFixture.position.set(-0.8, 2.5, -0.8);
      lampFixture.castShadow = true;
      scene.add(lampFixture);

      const lampStrip = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.09, 0.18), MB(0xfffde7));
      lampStrip.position.set(-0.8, 2.43, -0.8);
      scene.add(lampStrip);

      const lampSpot = new THREE.SpotLight(0xfffbdd, 4.5, 12, Math.PI / 2.6, 0.65, 1.8);
      lampSpot.position.set(-0.8, 2.42, -0.8);
      lampSpot.target.position.set(-0.8, 0.1, 0.2);
      lampSpot.castShadow = true;
      lampSpot.shadow.mapSize.set(1024, 1024);
      lampSpot.shadow.camera.near = 0.3;
      lampSpot.shadow.camera.far = 12;
      scene.add(lampSpot);
      scene.add(lampSpot.target);

      /* ── Main ambient / fill lights ── */
      scene.add(new THREE.AmbientLight(0x0a0a0a, 0.8));

      const spotLight = new THREE.SpotLight(0xfffbf0, 2.8, 14, Math.PI / 3.2, 0.68, 1.6);
      spotLight.position.set(0.4, 2.3, -0.3);
      spotLight.target.position.set(0.4, -0.3, 1.2);
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.set(1024, 1024);
      scene.add(spotLight);
      scene.add(spotLight.target);
      threeRef.current.spotLight = spotLight;

      // Warm fill from right
      const fillRight = new THREE.PointLight(0xffa040, 0.6, 10);
      fillRight.position.set(6, 2.5, 3);
      scene.add(fillRight);

      /* ── Desk ── */
      const desk = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.16, 3.0), MS(0xc9985d));
      desk.position.set(0, 0, 0.5);
      desk.receiveShadow = true;
      desk.castShadow = true;
      scene.add(desk);

      const deskEdge = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.08, 0.1), MS(0xb8854d, 0.35));
      deskEdge.position.set(0, -0.05, 1.95);
      scene.add(deskEdge);

      const legM = MS(0x8b6f47);
      [[-4.5], [4.5]].forEach(([x]) => {
        [-1.1, 1.1].forEach((z) => {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.7, 0.14), legM);
          leg.position.set(x, -0.92, z * 1.1);
          leg.castShadow = true;
          scene.add(leg);
        });
      });

      /* ═══════════════════════════════════════════════════
         DESK LAMP — left side of monitor, fully in frame
         Position X: -3.2 (left but visible in camera)
         ═══════════════════════════════════════════════════ */
      const deskLampGrp = new THREE.Group();
      scene.add(deskLampGrp);
      deskLampGrp.position.set(-3.2, 0, 0.6);

      // Base plate
      const dlBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.07, 24), MS(0x252525, 0.6, 0.3));
      dlBase.position.y = 0.115;
      dlBase.castShadow = true;
      deskLampGrp.add(dlBase);

      // Base column (short, thick)
      const dlCol = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.18, 12), MS(0x222222, 0.5, 0.4));
      dlCol.position.y = 0.24;
      deskLampGrp.add(dlCol);

      // Lower arm
      const dlArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.7, 10), MS(0x1e1e1e, 0.5, 0.5));
      dlArm1.position.set(0, 0.68, 0);
      dlArm1.rotation.z = 0.18;          // slight tilt toward monitor
      deskLampGrp.add(dlArm1);

      // Elbow joint
      const dlJoint = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), MS(0x1c1c1c, 0.5, 0.5));
      dlJoint.position.set(0.13, 1.03, 0);
      deskLampGrp.add(dlJoint);

      // Upper arm (angled toward monitor side)
      const dlArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.55, 10), MS(0x1e1e1e, 0.5, 0.5));
      dlArm2.position.set(0.3, 1.35, 0);
      dlArm2.rotation.z = -0.55;
      deskLampGrp.add(dlArm2);

      // Shade (cone pointing down-right toward desk surface)
      const dlShade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.32, 20, 1, true), MS(0x181818, 0.6, 0.2));
      dlShade.position.set(0.52, 1.48, 0);
      dlShade.rotation.z = Math.PI + 0.5;   // open end faces down
      dlShade.castShadow = true;
      deskLampGrp.add(dlShade);

      // Inner glow ring (emissive look)
      const dlBulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), MB(0xfff4cc));
      dlBulb.position.set(0.52, 1.38, 0);
      deskLampGrp.add(dlBulb);

      // Actual light from desk lamp
      const dlLight = new THREE.PointLight(0xffd580, 2.2, 4.5);
      dlLight.position.set(0.52, 1.3, 0);
      dlLight.castShadow = false;
      deskLampGrp.add(dlLight);

      /* ── Ultrawide Monitor ── */
      const monGroup = new THREE.Group();
      scene.add(monGroup);

      const monBase2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.09, 0.95), M(0x1f1f1f));
      monBase2.position.set(0, 0.14, -0.25);
      monBase2.castShadow = true;
      monGroup.add(monBase2);

      const monNeck = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.82, 0.14), M(0x1f1f1f));
      monNeck.position.set(0, 0.65, -0.25);
      monGroup.add(monNeck);

      const bezel = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.3, 0.18), M(0x0f0f0f));
      bezel.position.set(0, 1.65, -0.28);
      bezel.castShadow = true;
      monGroup.add(bezel);

      const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.05, 0.014), MB(0x0a0a0a));
      screenMesh.position.set(0, 1.65, -0.13);
      screenMesh.receiveShadow = true;
      monGroup.add(screenMesh);
      threeRef.current.monitorScreen = screenMesh;

      const monGlow = new THREE.PointLight(0x1a6ee8, 0.9, 8);
      monGlow.position.set(0, 1.55, 0.5);
      monGroup.add(monGlow);

      monGroup.position.set(-0.4, 0, -0.2);

      /* ── MacBook ── */
      const macGroup = new THREE.Group();
      scene.add(macGroup);

      const macBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 1.4), M(0x7a7a7a));
      macBase.position.y = 0.11;
      macBase.castShadow = true;
      macGroup.add(macBase);

      const kbArea = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.012, 1.1), M(0x686868));
      kbArea.position.set(0, 0.135, -0.05);
      macGroup.add(kbArea);

      const keyM = M(0x727272);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 13; c++) {
          const key = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.024, 0.09), keyM);
          key.position.set(-0.82 + c * 0.14, 0.148, -0.4 + r * 0.12);
          macGroup.add(key);
        }
      }

      const tb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 0.05), M(0x888888));
      tb.position.set(0, 0.148, -0.52);
      macGroup.add(tb);

      const tp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.011, 0.45), M(0x6e6e6e));
      tp.position.set(0, 0.138, 0.42);
      macGroup.add(tp);

      const lidPivot = new THREE.Group();
      lidPivot.position.set(0, 0.135, -0.72);
      macGroup.add(lidPivot);

      const lid = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 1.4), M(0x7a7a7a));
      lid.position.set(0, 0, 0.7);
      lid.castShadow = true;
      lidPivot.add(lid);

      const lidInner = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.012, 1.38), M(0x1d1d1d));
      lidInner.position.set(0, -0.03, 0.7);
      lidPivot.add(lidInner);

      const lapScreen = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.012, 1.2), MB(0x070c07));
      lapScreen.position.set(0, -0.032, 0.68);
      lapScreen.receiveShadow = true;
      lidPivot.add(lapScreen);
      threeRef.current.laptopScreen = lapScreen;

      const logoBg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.008, 0.22), M(0x888888));
      logoBg.position.set(0, 0.032, 0.7);
      lidPivot.add(logoBg);

      lidPivot.rotation.x = -1.88;

      macGroup.position.set(3.2, 0, 0.9);
      macGroup.rotation.y = -0.25;

      /* ── Other accessories ── */
      const keyboard = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.42), M(0xa8a8a8));
      keyboard.position.set(-1.2, 0.22, 0.7);
      keyboard.castShadow = true;
      scene.add(keyboard);

      const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, 0.38), M(0x9a9a9a));
      mouse.position.set(0.2, 0.205, 0.75);
      mouse.castShadow = true;
      scene.add(mouse);

      const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.38, 20), M(0x2a2a2a));
      mug.position.set(4.0, 0.28, -0.4);
      mug.castShadow = true;
      scene.add(mug);

      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.28, 16), M(0x1d0b06));
      pot.position.set(4.2, 0.22, 0.7);
      pot.castShadow = true;
      scene.add(pot);

      const leaf1 = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), M(0x0d3d0d));
      leaf1.position.set(4.2, 0.62, 0.7);
      leaf1.castShadow = true;
      scene.add(leaf1);

      const leaf2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), M(0x0a320a));
      leaf2.position.set(4.4, 0.72, 0.65);
      leaf2.castShadow = true;
      scene.add(leaf2);

      setLoaded(true);

      /* ── Animation Loop ── */
      let frame = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        frame++;

        // subtle lamp flicker
        if (frame % 300 === 0 && Math.random() > 0.65) {
          spotLight.intensity = 2.0;
          setTimeout(() => { if (spotLight) spotLight.intensity = 2.8; }, 90);
        }

        renderer.render(scene, camera);

        if (threeRef.current.monitorScreen) {
          const r = getScreenRect(threeRef.current.monitorScreen);
          if (r) setMonitorPos(r);
        }
        if (threeRef.current.laptopScreen) {
          const r = getScreenRect(threeRef.current.laptopScreen);
          if (r) setLaptopPos(r);
        }
      };
      animate();

      const onResize = () => {
        if (!mountRef.current) return;
        W = mountRef.current.clientWidth;
        H = mountRef.current.clientHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
      };
      window.addEventListener("resize", onResize);

      threeRef.current._cleanup = () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    };

    init().catch(console.error);
    return () => { if (threeRef.current._cleanup) threeRef.current._cleanup(); };
  }, []);

  const switchTo = (idx) => {
    if (transitioning || idx === active) return;
    setTransitioning(true);
    setTimeout(() => { setActive(idx); setTransitioning(false); }, 450);
  };

  return (
    <div
      style={{
        background: "#0a0805",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ flexShrink: 0, padding: "10px 0 7px", textAlign: "center", borderBottom: "1px solid rgba(22,163,74,0.1)" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#16a34a", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 3, fontWeight: 600 }}>
          ✦ Interactive Portfolio
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(17px, 3vw, 26px)", fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          Live Project Showcase
        </h1>
      </div>

      {/* 3D Canvas */}
      <div ref={mountRef} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Monitor overlay */}
        {loaded && monitorPos.w > 30 && (
          <div
            style={{
              position: "absolute",
              left: monitorPos.x + 12,
              top: monitorPos.y,
              width: monitorPos.w,
              height: monitorPos.h,
              overflow: "hidden",
              pointerEvents: transitioning ? "none" : "auto",
              opacity: transitioning ? 0 : 1,
              transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
              borderRadius: 2,
              background: "#080808",
            }}
          >
            <iframe
              key={active}
              src={project.url}
              title={project.name}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
            />
          </div>
        )}

        {/* Laptop overlay */}
        {loaded && laptopPos.w > 30 && (
          <div
            style={{
              position: "absolute",
              left: laptopPos.x + 10,
              top: laptopPos.y,
              width: laptopPos.w,
              height: laptopPos.h,
              background: "#050f06",
              overflow: "hidden",
              pointerEvents: "none",
              opacity: transitioning ? 0 : 1,
              transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              perspective: "1200px",
            }}
          >
            <div
              style={{
                padding: "8px 12px",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transform: transitioning ? "translateY(6px) rotateX(8deg)" : "rotateX(8deg)",
                transformOrigin: "center center",
                transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div style={{ width: Math.max(6, laptopPos.w * 0.035), height: Math.max(6, laptopPos.w * 0.035), borderRadius: "50%", background: project.color, marginBottom: 7, animation: "pulse-dot 2.2s ease-in-out infinite", boxShadow: `0 0 8px ${project.color}80` }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: Math.max(6, Math.min(9, laptopPos.w * 0.048)), color: "#1f3a1f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, fontWeight: 500 }}>Active</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: Math.max(10, Math.min(20, laptopPos.w * 0.1)), fontWeight: 700, color: project.color, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{project.name}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: Math.max(6, Math.min(11, laptopPos.w * 0.042)), color: "#2a3d2a", fontWeight: 300, lineHeight: 1.3, marginBottom: 8 }}>{project.sub}</div>
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 9 }}>
                {project.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: Math.max(5, laptopPos.w * 0.035), color: "#1f3a1f", background: "#080f08", border: "1px solid #162016", padding: "2px 5px", borderRadius: 2 }}>{t}</span>
                ))}
              </div>
              <div style={{ height: 1, background: "#0d1a0d", marginBottom: 8 }} />
              <ClockWidget fontSize={Math.max(10, Math.min(16, laptopPos.w * 0.078))} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "7px 16px", flexWrap: "wrap" }}>
        <button onClick={() => switchTo((active - 1 + PROJECTS.length) % PROJECTS.length)} style={btnStyle} onMouseEnter={(e) => Object.assign(e.currentTarget.style, btnHover)} onMouseLeave={(e) => Object.assign(e.currentTarget.style, btnStyle)}>← Prev</button>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => switchTo(i)}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, border: `1.5px solid ${i === active ? p.color : "rgba(255,255,255,0.12)"}`, background: i === active ? p.color : "rgba(255,255,255,0.04)", color: i === active ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.22s", boxShadow: i === active ? `0 4px 12px ${p.color}30` : "none" }}
              onMouseEnter={(e) => { if (i !== active) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; } }}
              onMouseLeave={(e) => { if (i !== active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; } }}
            >{p.name}</button>
          ))}
        </div>
        <button onClick={() => switchTo((active + 1) % PROJECTS.length)} style={btnStyle} onMouseEnter={(e) => Object.assign(e.currentTarget.style, btnHover)} onMouseLeave={(e) => Object.assign(e.currentTarget.style, btnStyle)}>Next →</button>
      </div>

      {/* Meta bar */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "7px 20px 11px", borderTop: "1px solid rgba(22,163,74,0.08)", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: project.color, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, transition: "color 0.3s" }}>★ {project.name}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#94a3b8", fontWeight: 300 }}>{project.sub}</span>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#64748b", background: "rgba(15,15,15,0.5)", border: "1px solid rgba(30,41,59,0.6)", padding: "3px 8px", borderRadius: 4 }}>{t}</span>
          ))}
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: project.color, border: `1.5px solid ${project.color}50`, padding: "5px 14px", borderRadius: 5, textDecoration: "none", background: `${project.color}15`, fontWeight: 500, transition: "all 0.25s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${project.color}28`; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `${project.color}15`; e.currentTarget.style.transform = "none"; }}
        >Visit ↗</a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@300;400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow: hidden; width: 100vw; height: 100vh; }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(1.2); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

const btnStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  fontWeight: 500,
  color: "rgba(255,255,255,0.45)",
  background: "rgba(255,255,255,0.04)",
  border: "1.5px solid rgba(255,255,255,0.1)",
  padding: "7px 16px",
  borderRadius: 6,
  cursor: "pointer",
  letterSpacing: "0.04em",
  transition: "all 0.22s",
  textTransform: "uppercase",
};

const btnHover = {
  color: "rgba(255,255,255,0.85)",
  background: "rgba(255,255,255,0.1)",
  border: "1.5px solid rgba(255,255,255,0.28)",
  transform: "translateY(-1px)",
};