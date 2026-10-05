"use client";

import { useEffect, useRef } from "react";

// A working gear train + crank-slider drawn as a technical sketch.
// Gear 1 (z=12) drives gear 2 (z=8); a pin on gear 2 drives a piston through a connecting rod.
// Angles are degrees, measured clockwise from "up".

const G1 = { x: 130, y: 120 }; // driver
const Z1 = 12;
const Z2 = 8;
const PITCH = (2 * Math.PI * 70) / Z1; // circular pitch shared by both gears
const R1 = 70; // pitch radius, gear 1
const R2 = (Z2 * PITCH) / (2 * Math.PI); // pitch radius, gear 2 (≈46.7)
const CENTRE = R1 + R2;
const LINE_DEG = 20; // gear 2 sits 20° below horizontal from gear 1
// Coordinates are rounded so server- and browser-rendered markup match exactly.
const round = (v: number) => Math.round(v * 100) / 100;
const G2 = {
  x: round(G1.x + CENTRE * Math.cos((LINE_DEG * Math.PI) / 180)),
  y: round(G1.y + CENTRE * Math.sin((LINE_DEG * Math.PI) / 180)),
};
const RATIO = Z1 / Z2; // 1.5
const PHASE2 = 27.5; // puts a gap of gear 2 opposite a tooth of gear 1 so the teeth mesh
const CRANK = 22; // crank radius on gear 2
const ROD = 90; // connecting-rod length
const BASE_RPM = 6; // gear 1 speed at rest
const HOVER_RPM = 18; // gear 1 speed while hovered

const rad = (d: number) => (d * Math.PI) / 180;

function Gear({ cx, cy, teeth, ring, inner, outer, width }: { cx: number; cy: number; teeth: number; ring: number; inner: number; outer: number; width: number }) {
  return (
    <>
      {Array.from({ length: teeth }).map((_, i) => (
        <rect
          key={i}
          x={cx - width / 2}
          y={cy - outer}
          width={width}
          height={outer - inner}
          rx="2"
          className="mech-tooth"
          transform={`rotate(${(i * 360) / teeth} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={ring} className="mech-ring" />
    </>
  );
}

export default function HeroMechanism({ initials }: { initials: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gear1 = useRef<SVGGElement>(null);
  const gear2 = useRef<SVGGElement>(null);
  const piston = useRef<SVGGElement>(null);
  const rod = useRef<SVGLineElement>(null);
  const pin = useRef<SVGCircleElement>(null);
  const rpm1 = useRef<SVGTSpanElement>(null);
  const rpm2 = useRef<SVGTSpanElement>(null);

  useEffect(() => {
    let theta = 0;
    let speed = BASE_RPM;
    let target = BASE_RPM;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let lastReadout = 0;

    const draw = () => {
      const t2 = -theta * RATIO + PHASE2;
      gear1.current?.setAttribute("transform", `rotate(${theta} ${G1.x} ${G1.y})`);
      gear2.current?.setAttribute("transform", `rotate(${t2} ${G2.x} ${G2.y})`);
      // crank-slider: piston slides on the vertical line through gear 2's centre
      const px = G2.x + CRANK * Math.sin(rad(t2));
      const py = G2.y - CRANK * Math.cos(rad(t2));
      const yPiston = py - Math.sqrt(ROD * ROD - (px - G2.x) ** 2);
      pin.current?.setAttribute("cx", px.toFixed(2));
      pin.current?.setAttribute("cy", py.toFixed(2));
      rod.current?.setAttribute("x1", px.toFixed(2));
      rod.current?.setAttribute("y1", py.toFixed(2));
      rod.current?.setAttribute("y2", yPiston.toFixed(2));
      piston.current?.setAttribute("transform", `translate(0 ${yPiston.toFixed(2)})`);
    };

    const readout = () => {
      if (rpm1.current) rpm1.current.textContent = speed.toFixed(1);
      if (rpm2.current) rpm2.current.textContent = (speed * RATIO).toFixed(1);
    };

    draw();
    readout();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      speed += (target - speed) * Math.min(1, dt * 2.5); // ease towards the target speed
      theta = (theta + speed * 6 * dt) % 360; // rpm → degrees per second
      draw();
      if (now - lastReadout > 120) {
        readout();
        lastReadout = now;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const svg = svgRef.current!;
    const box = svg.closest(".title-block") ?? svg;
    const faster = () => (target = HOVER_RPM);
    const slower = () => (target = BASE_RPM);
    box.addEventListener("pointerenter", faster);
    box.addEventListener("pointerleave", slower);

    // Only animate while on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(svg);
    start();

    return () => {
      stop();
      io.disconnect();
      box.removeEventListener("pointerenter", faster);
      box.removeEventListener("pointerleave", slower);
    };
  }, []);

  const cyl = { x: G2.x - 20, top: 14, bottom: 104, w: 40 };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 360 240"
      className="mech"
      role="img"
      aria-label="Animated drawing of a gear train driving a piston"
    >
      {/* centre lines (drafting dash-dot) */}
      <g className="mech-centre mech-draw">
        <path d={`M${G1.x - 96} ${G1.y}H${G1.x + 96}M${G1.x} ${G1.y - 96}V${G1.y + 96}`} />
        <path d={`M${G2.x - 70} ${G2.y}H${G2.x + 70}M${G2.x} ${G2.y + 70}V${cyl.top - 8}`} />
      </g>

      {/* cylinder */}
      <g className="mech-cylinder">
        <path d={`M${cyl.x} ${cyl.bottom}V${cyl.top}H${cyl.x + cyl.w}V${cyl.bottom}`} />
        <path className="mech-hatch" d={`M${cyl.x - 6} ${cyl.top + 14}l6 -6M${cyl.x - 6} ${cyl.top + 34}l6 -6M${cyl.x - 6} ${cyl.top + 54}l6 -6M${cyl.x - 6} ${cyl.top + 74}l6 -6M${cyl.x + cyl.w} ${cyl.top + 14}l6 -6M${cyl.x + cyl.w} ${cyl.top + 34}l6 -6M${cyl.x + cyl.w} ${cyl.top + 54}l6 -6M${cyl.x + cyl.w} ${cyl.top + 74}l6 -6`} />
      </g>

      {/* gear 1 — driver */}
      <g ref={gear1}>
        <Gear cx={G1.x} cy={G1.y} teeth={Z1} ring={62} inner={58} outer={78} width={14} />
        <circle cx={G1.x} cy={G1.y} r="40" className="mech-ring thin" />
        {Array.from({ length: 6 }).map((_, i) => (
          <circle
            key={i}
            cx={round(G1.x + 51 * Math.sin(rad(i * 60)))}
            cy={round(G1.y - 51 * Math.cos(rad(i * 60)))}
            r="3.2"
            className="mech-bolt"
          />
        ))}
      </g>

      {/* gear 2 — driven, carries the crank */}
      <g ref={gear2}>
        <Gear cx={G2.x} cy={G2.y} teeth={Z2} ring={39} inner={35} outer={55} width={12} />
        <circle cx={G2.x} cy={G2.y} r="7" className="mech-ring" />
        {[0, 120, 240].map((a) => (
          <line
            key={a}
            x1={round(G2.x + 8 * Math.sin(rad(a)))}
            y1={round(G2.y - 8 * Math.cos(rad(a)))}
            x2={round(G2.x + 33 * Math.sin(rad(a)))}
            y2={round(G2.y - 33 * Math.cos(rad(a)))}
            className="mech-spoke"
          />
        ))}
      </g>

      {/* connecting rod, crank pin and piston */}
      <line ref={rod} x1={G2.x} y1={G2.y - CRANK} x2={G2.x} y2={G2.y - CRANK - ROD} className="mech-rod" />
      <circle ref={pin} cx={G2.x} cy={G2.y - CRANK} r="4.5" className="mech-pin" />
      <g ref={piston}>
        <rect x={G2.x - 17} y="-11" width="34" height="22" rx="2" className="mech-piston" />
        <path d={`M${G2.x - 17} -4H${G2.x + 17}M${G2.x - 17} 2H${G2.x + 17}`} className="mech-rings" />
        <circle cx={G2.x} cy="0" r="3" className="mech-pin small" />
      </g>

      {/* initials stay upright on the driver gear */}
      <text x={G1.x} y={G1.y + 9} textAnchor="middle" className="mech-initials">
        {initials}
      </text>

      {/* annotations */}
      <g className="mech-note mech-fade">
        <text x={G1.x - 94} y={G1.y + 92}>z = {Z1}</text>
        <text x={G2.x + 30} y={G2.y + 62}>z = {Z2}</text>
        <text x={G2.x + 28} y={cyl.top + 10}>i = {RATIO}</text>
        <text x="8" y="16">
          n₁ <tspan ref={rpm1}>{BASE_RPM.toFixed(1)}</tspan> rpm
        </text>
        <text x="8" y="30">
          n₂ <tspan ref={rpm2}>{(BASE_RPM * RATIO).toFixed(1)}</tspan> rpm
        </text>
      </g>
    </svg>
  );
}
