"use client";

import { pointBudget } from "@/lib/aei/beatLook";
import type { BeatLook, BeatRenderMode, SpinMode } from "@/lib/aei/types";

export type FlyerReadout = {
  warmth: number;
  busyness: number;
  name: string;
};

const SPIN_MODES: { id: SpinMode; label: string }[] = [
  { id: "continuous", label: "Continuous" },
  { id: "kick", label: "On kick" },
  { id: "bar", label: "On bar" },
];

export function BeatPanel({
  look,
  follow,
  depth,
  names,
  lowEnd,
  onLook,
  onFollow,
  onFiles,
  onSample,
  onClear,
  onTap,
  flyer,
  locked,
  onFlyer,
  onSampleFlyer,
  onLock,
}: {
  look: BeatLook;
  follow: boolean;
  depth: string;
  names: string[];
  lowEnd: boolean;
  onLook: (look: BeatLook) => void;
  onFollow: (follow: boolean) => void;
  onFiles: (files: File[]) => void;
  onSample: () => void;
  onClear: () => void;
  onTap: () => void;
  flyer: FlyerReadout | null;
  locked: boolean;
  onFlyer: (files: File[]) => void;
  onSampleFlyer: () => void;
  onLock: (locked: boolean) => void;
}) {
  const set = (patch: Partial<BeatLook>) => {
    onFollow(false);
    onLook({ ...look, ...patch });
  };
  return (
    <section className="mt-4 space-y-2" aria-label="Beat Image">
      <div className="flex items-center justify-between gap-2">
        <p className="pg-label">Beat Image</p>
        <span className="font-mono text-[10px] text-muted">depth {depth}</span>
      </div>
      <p className="text-xs leading-relaxed text-muted">
        Load a flyer first. Its wave then bends every picture, including the flyer itself.
      </p>
      <div className="flex flex-wrap gap-2">
        <label className="pg-btn cursor-pointer">
          Load flyer
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            aria-label="Load flyer"
            onChange={(event) => {
              const files = [...(event.target.files ?? [])];
              event.target.value = "";
              if (files[0]) onFlyer([files[0]]);
            }}
          />
        </label>
        <button type="button" className="pg-btn" onClick={onSampleFlyer}>
          Sample flyer
        </button>
        <button
          type="button"
          className={locked ? "pg-btn pg-btn-primary" : "pg-btn"}
          aria-pressed={locked}
          onClick={() => onLock(!locked)}
        >
          {locked ? "Style locked" : "Lock style"}
        </button>
      </div>
      <div aria-label="Style from flyer" className="rounded border border-white/10 px-2 py-2">
        {flyer ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              {look.style.wave} · {look.style.spinStyle} · {flyer.warmth >= 0.5 ? "warm" : "cool"} · busyness {flyer.busyness.toFixed(2)}
            </p>
            {flyer.name ? <p className="mt-1 text-xs text-foreground">{flyer.name}</p> : null}
            <div className="mt-2 flex gap-1">
              {look.style.palette.slice(0, 4).map((color, index) => (
                <span key={`${color}-${index}`} className="h-3 w-6 rounded-sm" style={{ background: color }} title={color} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-muted">No flyer yet. The wave follows the director until one is loaded.</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <label className="pg-btn cursor-pointer">
          Add pictures
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              const files = [...(event.target.files ?? [])];
              event.target.value = "";
              if (files.length) onFiles(files);
            }}
          />
        </label>
        <button type="button" className="pg-btn" onClick={onSample}>
          Sample picture
        </button>
        <button type="button" className="pg-btn" onClick={onClear} disabled={names.length === 0}>
          Clear
        </button>
      </div>
      {names.length ? <p className="font-mono text-[10px] text-muted">{names.join(" · ")}</p> : null}
      <div className="flex flex-wrap gap-2">
        {(["mesh", "points"] as BeatRenderMode[]).map((mode) => (
          <button key={mode} type="button" className={look.mode === mode ? "pg-btn pg-btn-primary" : "pg-btn"} onClick={() => set({ mode })}>
            {mode === "mesh" ? "Mesh" : "Points"}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="pg-label">Spin</span>
        <select
          className="pg-select mt-1"
          value={look.spinMode}
          onChange={(event) => set({ spinMode: event.target.value as SpinMode })}
        >
          {SPIN_MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </label>
      <LookSlider label="Relief" value={look.relief} onChange={(relief) => set({ relief })} />
      <LookSlider label="Spin amount" value={look.spin} onChange={(spin) => set({ spin })} />
      <LookSlider label="Distortion" value={look.distortion} onChange={(distortion) => set({ distortion })} />
      <LookSlider label="Glitch" value={look.glitch} onChange={(glitch) => set({ glitch })} />
      <LookSlider
        label="Points"
        value={look.points}
        text={String(pointBudget(look.points, lowEnd))}
        onChange={(points) => set({ points })}
      />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="pg-btn" onClick={onTap}>
          Tap beat
        </button>
        <button type="button" className={follow ? "pg-btn pg-btn-primary" : "pg-btn"} onClick={() => onFollow(!follow)}>
          {follow ? "Following director" : "Follow director"}
        </button>
      </div>
    </section>
  );
}

function LookSlider({ label, value, text, onChange }: { label: string; value: number; text?: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="pg-label">{label}</span>
        <span className="font-mono text-[10px] text-muted">{text ?? value.toFixed(2)}</span>
      </span>
      <input
        className="mt-1 w-full accent-[#5aa98a]"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
