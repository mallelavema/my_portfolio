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

      // Draw Connection Lines (Plexus/Network bonds)
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
            const alpha = proximityAlpha * zAlpha * 0.32;

            if (alpha > 0) {
              // Interpolate neon gradient colors: Indigo (#6C5CE7) to Cyan (#00E5FF)
              const gradient = ctx.createLinearGradient(p1.sx, p1.sy, p2.sx, p2.sy);
              gradient.addColorStop(0, `rgba(108, 92, 231, ${alpha * 1.2})`); // Electric Indigo
              gradient.addColorStop(1, `rgba(0, 229, 255, ${alpha * 1.2})`);  // Muted Cyan/Teal

              ctx.strokeStyle = gradient;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Nodes (Vertex Points)
      projected.forEach((p) => {
        // Calculate point size and alpha based on depth (Z axis)
        // rotY.z range is roughly [-radius, radius]
        const depthRatio = (distance - p.sz) / (distance * 1.5);
        const size = Math.max(1, (2.5 * depthRatio) * targetScale);
        const alpha = Math.max(0.1, depthRatio * 0.95);

        // Core points use primary neon styling
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);

        // Alternate colors for standard visual rhythm (e.g. some indigo, some cyan, some silver)
        if (p.id % 3 === 0) {
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`; // Cyan
        } else if (p.id % 3 === 1) {
          ctx.fillStyle = `rgba(108, 92, 231, ${alpha})`; // Indigo
        } else {
          ctx.fillStyle = `rgba(245, 245, 247, ${alpha})`; // Metallic Off-white
        }
        ctx.fill();

        // High-fidelity touch: Add subtle ambient glow on closer points
        if (p.sz < -60 && p.id % 5 === 0) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.id % 3 === 0 ? `rgba(0, 229, 255, ${alpha * 0.25})` : `rgba(108, 92, 231, ${alpha * 0.25})`;
          ctx.fill();
        }
      });

      // Draw subtle orbital rings for futuristic "satellite" aesthetic
      ctx.strokeStyle = 'rgba(108, 92, 231, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(targetCenterX, targetCenterY, 200 * targetScale, 60 * targetScale, Math.PI / 6 + angleY * 0.1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.beginPath();
      ctx.ellipse(targetCenterX, targetCenterY, 250 * targetScale, 80 * targetScale, -Math.PI / 4 - angleY * 0.15, 0, Math.PI * 2);
      ctx.stroke();

      // Floating particles background (deep field bokeh)
      // Standard static particles rendered within the canvas frame
      for (let i = 0; i < 15; i++) {
        const ptTime = pulseTime * 0.2 + i;
        const px = (Math.sin(ptTime) * 0.4 + 0.5) * width;
        const py = (Math.cos(ptTime * 1.5) * 0.4 + 0.5) * height;
        const pSize = (Math.sin(ptTime * 2) * 1.5 + 2);
        const pAlpha = (Math.cos(ptTime) * 0.15 + 0.15);

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 92, 231, ${pAlpha})`;
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
        style={{ opacity: 0.85 }}
      />
      {/* Background Soft Light Bloom Gradients */}
      <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
    </div>
  );
}
