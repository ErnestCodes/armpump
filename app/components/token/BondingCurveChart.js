"use client";

import { generateBondingCurveData } from "../../lib/utils";

export default function BondingCurveChart({ currentSold }) {
  const data = generateBondingCurveData();
  const maxSold = 500000;
  const maxPrice = 0.0052;

  const width = 600;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  function x(sold) {
    return padding.left + (sold / maxSold) * chartW;
  }
  function y(price) {
    return padding.top + chartH - (price / maxPrice) * chartH;
  }

  // Build step-function path
  let path = `M ${x(0)} ${y(data[0].price)}`;
  for (let i = 1; i < data.length; i++) {
    path += ` L ${x(data[i].sold)} ${y(data[i - 1].price)}`;
    path += ` L ${x(data[i].sold)} ${y(data[i].price)}`;
  }

  // Current position marker
  const currentStep = Math.floor(currentSold / 10000);
  const currentPrice = 0.0001 + 0.0001 * currentStep;

  // Filled area path (up to current position)
  const fillSold = Math.min(currentSold, maxSold);
  let fillPath = `M ${x(0)} ${y(data[0].price)}`;
  for (let i = 1; i < data.length; i++) {
    if (data[i].sold > fillSold) break;
    fillPath += ` L ${x(data[i].sold)} ${y(data[i - 1].price)}`;
    fillPath += ` L ${x(data[i].sold)} ${y(data[i].price)}`;
  }
  fillPath += ` L ${x(fillSold)} ${y(currentPrice)}`;
  fillPath += ` L ${x(fillSold)} ${y(0)}`;
  fillPath += ` L ${x(0)} ${y(0)} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Grid lines */}
      {[0, 0.001, 0.002, 0.003, 0.004, 0.005].map((p) => (
        <g key={p}>
          <line
            x1={padding.left}
            y1={y(p)}
            x2={width - padding.right}
            y2={y(p)}
            stroke="#2a2b35"
            strokeWidth="0.5"
          />
          <text
            x={padding.left - 5}
            y={y(p) + 3}
            fill="#71717a"
            fontSize="9"
            textAnchor="end"
          >
            {p.toFixed(4)}
          </text>
        </g>
      ))}

      {/* Filled area under curve up to current position */}
      <path d={fillPath} fill="rgba(0,212,170,0.08)" />

      {/* Full curve line */}
      <path d={path} fill="none" stroke="#2a2b35" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Active curve line (up to current position) */}
      {(() => {
        let activePath = `M ${x(0)} ${y(data[0].price)}`;
        for (let i = 1; i < data.length; i++) {
          if (data[i].sold > fillSold) break;
          activePath += ` L ${x(data[i].sold)} ${y(data[i - 1].price)}`;
          activePath += ` L ${x(data[i].sold)} ${y(data[i].price)}`;
        }
        return <path d={activePath} fill="none" stroke="#00d4aa" strokeWidth="2" />;
      })()}

      {/* Current position marker */}
      <circle
        cx={x(currentSold)}
        cy={y(currentPrice)}
        r="5"
        fill="#00d4aa"
        stroke="#0a0b0f"
        strokeWidth="2"
      />
      <text
        x={x(currentSold) + 10}
        y={y(currentPrice) - 8}
        fill="#e4e4e7"
        fontSize="10"
        fontFamily="monospace"
      >
        {currentPrice.toFixed(4)} ETH
      </text>

      {/* X-axis label */}
      <text
        x={width / 2}
        y={height - 5}
        fill="#71717a"
        fontSize="10"
        textAnchor="middle"
      >
        Tokens Sold
      </text>

      {/* Y-axis label */}
      <text
        x={12}
        y={height / 2}
        fill="#71717a"
        fontSize="10"
        textAnchor="middle"
        transform={`rotate(-90, 12, ${height / 2})`}
      >
        Price (ETH)
      </text>
    </svg>
  );
}
