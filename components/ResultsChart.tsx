// Before/after bar chart for the thesis results (server-rendered SVG, themed via CSS variables).
type Row = { label: string; before: number; after: number; pct?: number };

const MWh = (kWh: number) => `${(kWh / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })} MWh`;

export default function ResultsChart({ rows }: { rows: Row[] }) {
  const max = Math.max(...rows.map((r) => r.before));
  const W = 640;
  const labelW = 110;
  const barMax = W - labelW - 150;
  const rowH = 64;
  const H = rows.length * rowH + 30;

  return (
    <figure className="results-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="rc-title rc-desc">
        <title id="rc-title">Energy use before and after optimisation</title>
        <desc id="rc-desc">
          {rows.map((r) => `${r.label}: ${MWh(r.before)} reduced to ${MWh(r.after)}`).join("; ")}
        </desc>
        {rows.map((r, i) => {
          const y = i * rowH + 8;
          const wb = (r.before / max) * barMax;
          const wa = (r.after / max) * barMax;
          const pct = r.pct ?? Math.round((1 - r.after / r.before) * 100); // prefer the source's stated figure
          const total = i === rows.length - 1;
          return (
            <g key={r.label} className={total ? "rc-row total" : "rc-row"}>
              {total && <line x1="0" x2={W} y1={y - 6} y2={y - 6} className="rc-rule" />}
              <text x="0" y={y + 22} className="rc-label">
                {r.label}
              </text>
              <rect x={labelW} y={y + 6} width={wb} height="16" rx="3" className="rc-before" />
              <text x={labelW + wb + 8} y={y + 19} className="rc-value">
                {MWh(r.before)}
              </text>
              <rect x={labelW} y={y + 26} width={wa} height="16" rx="3" className="rc-after" />
              <text x={labelW + wa + 8} y={y + 39} className="rc-value strong">
                {MWh(r.after)}
              </text>
              <text x={W} y={y + 30} textAnchor="end" className="rc-pct">
                −{pct}%
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="rc-legend">
        <span>
          <i className="sw before" aria-hidden="true" /> Initial design
        </span>
        <span>
          <i className="sw after" aria-hidden="true" /> Optimised design
        </span>
        <span className="meta">Annual energy use, DesignBuilder (EnergyPlus) simulation</span>
      </figcaption>
    </figure>
  );
}
