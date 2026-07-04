import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  id: number;
}

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // 1. Listen to scroll events to drive scroll-linked transformations
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(progress);
    };

    // 2. Listen to mousemove for interactive parallax
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Golden spiral sphere point generation
    let points: Point3D[] = [];
    const maxPoints = window.innerWidth < 768 ? 70 : 130; // Graded density for mobile performance

    const generateSphere = () => {
      points = [];
      const radius = 130;
      for (let i = 0; i < maxPoints; i++) {
        const theta = Math.acos(1 - 2 * (i + 0.5) / maxPoints);
        const phi = Math.sqrt(maxPoints * Math.PI) * theta;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);

        points.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          id: i,
        });
      }
    };

    const resize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      generateSphere();
    };

    // Set initial size
    resize();
    window.addEventListener('resize', resize);

    // Initial state angles
    let angleX = 0;
    let angleY = 0;
    let pulseTime = 0;

    // 3D Rotation Utilities
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x,
        y: y * cos - z * sin,
        z: y * sin + z * cos
      };
    };

    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos + z * sin,
        y,
        z: -x * sin + z * cos
      };
    };

    const drawScene = () => {
      // Clear canvas with a very soft trail for light ghosting (motion blur)
      ctx.fillStyle = 'rgba(10, 10, 11, 0.15)'; // base: #0A0A0B
      ctx.fillRect(0, 0, width, height);

      pulseTime += 0.015;

      // Smooth mouse lerping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base rotation from auto-rotation + mouse parallax
      angleY += 0.005;
      angleX = mouse.y * 0.5;
      const currentAngleY = angleY + (mouse.x * 0.5);

      // Dynamically calculate scale and position based on scrollProgress
      // Scroll state map:
      // Hero (0.0): Core is centered-right on desktop, center on mobile. Large scale.
      // About (0.25): Core slides to left, medium scale.
      // Skills (0.5): Core slides to right, medium-small scale.
      // Projects (0.75): Core slides back to center background, ambient scale.
      // Contact (1.0): Core is centered, glowing accent.
      
      const isMobile = width < 768;
      let targetCenterX = width / 2;
      let targetCenterY = height / 2;
      let targetScale = 1.0;

      if (!isMobile) {
        if (scrollProgress < 0.2) {
          // Hero section
          const t = scrollProgress / 0.2;
          targetCenterX = (width * 0.72) * (1 - t) + (width * 0.25) * t;
          targetCenterY = height * 0.5;
          targetScale = 1.3 * (1 - t) + 1.0 * t;
        } else if (scrollProgress < 0.45) {
          // Slide from Left (About) to Right (Skills)
          const t = (scrollProgress - 0.2) / 0.25;
          targetCenterX = (width * 0.25) * (1 - t) + (width * 0.75) * t;
          targetCenterY = height * 0.5;
          targetScale = 1.0 * (1 - t) + 0.85 * t;
        } else if (scrollProgress < 0.75) {
          // Slide from Right (Skills) to Center Background (Projects)
          const t = (scrollProgress - 0.45) / 0.3;
          targetCenterX = (width * 0.75) * (1 - t) + (width * 0.5) * t;
          targetCenterY = height * 0.5;
          targetScale = 0.85 * (1 - t) + 0.65 * t;
        } else {
          // Slide to Center-bottom (Contact)
          const t = (scrollProgress - 0.75) / 0.25;
          targetCenterX = width * 0.5;
          targetCenterY = (height * 0.5) * (1 - t) + (height * 0.65) * t;
          targetScale = 0.65 * (1 - t) + 1.2 * t;
        }
      } else {
        // Mobile layout: stays centered, changes scale only
        if (scrollProgress < 0.2) {
          targetScale = 1.0 - scrollProgress * 0.5;
        } else if (scrollProgress < 0.75) {
          targetScale = 0.9;
        } else {
          targetScale = 0.9 + (scrollProgress - 0.75) * 0.8;
        }
        targetCenterX = width / 2;
        targetCenterY = height * 0.5;
      }

      // Projection parameters
      const distance = 400;

      // Project all 3D points to 2D
      const projected: { sx: number; sy: number; sz: number; id: number }[] = [];

      points.forEach((pt) => {
        // Apply sinusoidal morphing to emulate a living, beating GenAI node core
        const wave = Math.sin(pulseTime * 2 + (pt.baseX * 0.02) + (pt.baseY * 0.02)) * 20;
        const morphRadius = 1.0 + wave * 0.0012;

        const mx = pt.baseX * morphRadius;
        const my = pt.baseY * morphRadius;
        const mz = pt.baseZ * morphRadius;

        // Apply Rotations
        const rotX = rotateX(mx, my, mz, angleX);
        const rotY = rotateY(rotX.x, rotX.y, rotX.z, currentAngleY);

        // Standard perspective projection formula
        const f = distance / (distance + rotY.z);
        const sx = targetCenterX + rotY.x * f * targetScale;
        const sy = targetCenterY + rotY.y * f * targetScale;

        projected.push({
          sx,
          sy,
          sz: rotY.z,
          id: pt.id
        });
      });

      // Draw Connection Lines (Plexus/Network bonds with reference theme colors)
      const maxDistance = isMobile ? 65 : 85;
      ctx.lineWidth = 0.6;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        
        // Connect to a few adjacent nodes to create clean mesh structures
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Compute connection alpha based on proximity and Z-depth
            const proximityAlpha = 1 - (dist / maxDistance);
            const zAlpha = (distance - p1.sz) / (distance * 1.5); // fade points in background
            const alpha = proximityAlpha * zAlpha * 0.28;

            if (alpha > 0) {
              // Interpolate warm magenta/violet/peach/cyan gradient colors to match the reference
              const gradient = ctx.createLinearGradient(p1.sx, p1.sy, p2.sx, p2.sy);
              
              // Assign gradients based on point IDs
              if (p1.id % 3 === 0) {
                gradient.addColorStop(0, `rgba(236, 72, 153, ${alpha * 1.2})`); // Magenta/Pink
                gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha * 0.8})`); // Violet
              } else if (p1.id % 3 === 1) {
                gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha * 1.2})`); // Violet
                gradient.addColorStop(1, `rgba(253, 186, 116, ${alpha * 0.8})`); // Peach/Orange
              } else {
                gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 1.0})`);  // Cyan
                gradient.addColorStop(1, `rgba(236, 72, 153, ${alpha * 0.8})`); // Pink
              }

              ctx.strokeStyle = gradient;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Nodes (Vertex Points with multi-layered concentric halos to match reference screenshot)
      projected.forEach((p) => {
        // Calculate point size and alpha based on depth (Z axis)
        const depthRatio = (distance - p.sz) / (distance * 1.5);
        const size = Math.max(1.2, (2.8 * depthRatio) * targetScale);
        const alpha = Math.max(0.15, depthRatio * 0.95);

        // Core points use primary neon styling
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);

        // Colors matching the reference screenshot: peach/orange, magenta/pink, violet/indigo, soft teal
        let colorString = `rgba(167, 139, 250, ${alpha})`; // Lavender default
        let glowColor = `rgba(167, 139, 250, ${alpha * 0.25})`;

        if (p.id % 4 === 0) {
          colorString = `rgba(236, 72, 153, ${alpha})`; // Bright Pink / Magenta
          glowColor = `rgba(236, 72, 153, 0.3)`;
        } else if (p.id % 4 === 1) {
          colorString = `rgba(253, 186, 116, ${alpha})`; // Warm Peach / Orange
          glowColor = `rgba(253, 186, 116, 0.35)`;
        } else if (p.id % 4 === 2) {
          colorString = `rgba(139, 92, 246, ${alpha})`; // Deep Violet
          glowColor = `rgba(139, 92, 246, 0.35)`;
        } else {
          colorString = `rgba(6, 182, 212, ${alpha})`; // Soft Cyan / Teal
          glowColor = `rgba(6, 182, 212, 0.3)`;
        }

        ctx.fillStyle = colorString;
        ctx.fill();

        // High-fidelity touch: Add multiple concentric glowing halos for key nodes (matches reference layout)
        if (p.id % 6 === 0 && p.sz < 0) {
          // Inner halo ring
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 2.8, 0, Math.PI * 2);
          ctx.stroke();

          // Outer halo ring (fainter, larger)
          ctx.strokeStyle = glowColor.replace('0.3', '0.08').replace('0.35', '0.08');
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 5.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw subtle orbital rings for futuristic "satellite" aesthetic
      // Let's draw 3 beautiful tilted orbits with dashes and solid lines matching the reference screenshot
      ctx.lineWidth = 0.75;

      // Orbit 1: Tilted dotted/dashed ellipse
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.08)'; // Magenta orbit
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.ellipse(targetCenterX, targetCenterY, 210 * targetScale, 70 * targetScale, Math.PI / 10 + angleY * 0.05, 0, Math.PI * 2);
      ctx.stroke();

      // Orbit 2: Tilted dotted/dashed ellipse (opposite angle)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.09)'; // Violet orbit
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.ellipse(targetCenterX, targetCenterY, 280 * targetScale, 90 * targetScale, -Math.PI / 6 - angleY * 0.08, 0, Math.PI * 2);
      ctx.stroke();

      // Orbit 3: Solid very fine outer orbit
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)'; // Cyan outer orbit
      ctx.setLineDash([]); // Reset line dash for solid line
      ctx.beginPath();
      ctx.ellipse(targetCenterX, targetCenterY, 340 * targetScale, 110 * targetScale, Math.PI / 4 + angleY * 0.03, 0, Math.PI * 2);
      ctx.stroke();

      // Floating particles background (deep field bokeh with warm theme colors)
      for (let i = 0; i < 15; i++) {
        const ptTime = pulseTime * 0.15 + i;
        const px = (Math.sin(ptTime) * 0.45 + 0.5) * width;
        const py = (Math.cos(ptTime * 1.3) * 0.45 + 0.5) * height;
        const pSize = (Math.sin(ptTime * 2) * 1.2 + 2);
        const pAlpha = (Math.cos(ptTime) * 0.12 + 0.12);

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(236, 72, 153, ${pAlpha})`; // Pink
        } else if (i % 3 === 1) {
          ctx.fillStyle = `rgba(253, 186, 116, ${pAlpha})`; // Peach
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${pAlpha})`; // Violet
        }
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawScene);
    };

    drawScene();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgress]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      <canvas
        id="bg-neural-canvas"
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.9 }}
      />
      {/* Background Soft Light Bloom Gradients in warm colors representing the reference */}
      <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-900/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-[15%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-pink-900/12 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-cyan-950/15 blur-[120px] pointer-events-none" />
    </div>
  );
}
