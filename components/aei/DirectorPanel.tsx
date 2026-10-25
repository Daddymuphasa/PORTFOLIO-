"use client";

import { aeiSceneById } from "@/lib/aei/scenes";
import type { Cue } from "@/lib/aei/types";
import type { LoopLogEntry } from "@/lib/aei/loop";

export type LoopGate = "auto" | "approve";

function formatClock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

export default function DirectorPanel({
  enabled,
  gate,
  held,
  interval,
  pending,
  loopLog,
  ruleLog,
  onEnabled,
  onGate,
  onInterval,
  onApprove,
  onSkip,
  onHold,
  onDemo,
}: {
  enabled: boolean;
  gate: LoopGate;
  held: boolean;
  interval: number;
  pending: string | null;
  loopLog: LoopLogEntry[];
  ruleLog: Cue[];
  onEnabled: (on: boolean) => void;
  onGate: (gate: LoopGate) => void;
  onInterval: (seconds: number) => void;
  onApprove: () => void;
  onSkip: () => void;
  onHold: (held: boolean) => void;
  onDemo: () => void;
}) {
  return (
    <section className="mt-4 space-y-2" aria-label="Director loop">
      <div className="flex items-center justify-between gap-2">
        <span className="pg-label">Director loop</span>
        <button type="button" className={`pg-btn ${enabled ? "pg-btn-on" : ""}`} aria-pressed={enabled} onClick={() => onEnabled(!enabled)}>
          {enabled ? "On" : "Off"}
        </button>
      </div>
      <p className="text-xs leading-relaxed text-muted">
        Auto applies the next cue. Approve waits for a click. Hold look keeps the current picture. A slow or empty reply leaves the rules in charge.
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="pg-btn pg-btn-primary" onClick={onDemo}>
          Loop demo
        </button>
        <button type="button" className={`pg-btn ${gate === "auto" ? "pg-btn-on" : ""}`} aria-pressed={gate === "auto"} onClick={() => onGate("auto")}>
          Auto
        </button>
        <button type="button" className={`pg-btn ${gate === "approve" ? "pg-btn-on" : ""}`} aria-pressed={gate === "approve"} onClick={() => onGate("approve")}>
          Approve
        </button>
        <button type="button" className={`pg-btn ${held ? "pg-btn-on" : ""}`} aria-pressed={held} onClick={() => onHold(!held)}>
          Hold look
        </button>
      </div>
      <label className="block">
        <span className="flex items-center justify-between">
          <span className="pg-label">Ask every</span>
          <span className="font-mono text-[10px] text-muted">{interval}s</span>
        </span>
        <input
          className="mt-1 w-full accent-[#5aa98a]"
          type="range"
          min={10}
          max={15}
          step={1}
          aria-label="Director interval"
          value={interval}
          onChange={(event) => onInterval(Number(event.target.value))}
        />
      </label>
      {pending ? (
        <div className="space-y-2">
          <p className="text-xs text-muted">Next cue · {pending}</p>
          <div className="flex gap-2">
            <button type="button" className="pg-btn pg-btn-primary" onClick={onApprove}>
              Approve
            </button>
            <button type="button" className="pg-btn" onClick={onSkip}>
              Skip
            </button>
          </div>
        </div>
      ) : null}
      <div aria-label="Cue log">
        <p className="pg-label">Cue log</p>
        <ol className="mt-2 max-h-48 space-y-1.5 overflow-y-auto font-mono text-[10px] leading-relaxed text-[#d5ddd6]">
          {loopLog.length === 0 && ruleLog.length === 0 ? <li className="text-muted">Cues appear as the director commits to a look.</li> : null}
          {loopLog.length
            ? loopLog.map((row) => {
                const delta = row.crowdAfter == null ? null : row.crowdAfter - row.crowdBefore;
                return (
                  <li key={row.id}>
                    <span className="text-muted">{formatClock(row.at)}</span> {row.source} {aeiSceneById(row.scene)?.name ?? row.scene} {Math.round(row.latencyMs)}ms
                    <span className="block text-muted">{row.reason}</span>
                    {delta == null ? null : <span className="block text-muted">crowd {delta >= 0 ? "+" : ""}{delta.toFixed(2)}</span>}
                  </li>
                );
              })
            : ruleLog.map((cue) => (
                <li key={cue.id}>
                  <span className="text-muted">{formatClock(cue.at)}</span> {cue.source} {aeiSceneById(cue.scene)?.name ?? cue.scene}{" "}
                  I{cue.intensity.toFixed(2)} S{cue.strobe.toFixed(2)}
                  <span className="block text-muted">{cue.reason}</span>
                </li>
              ))}
        </ol>
      </div>
    </section>
  );
}
