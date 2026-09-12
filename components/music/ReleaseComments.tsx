"use client";

import { FormEvent, useEffect, useState } from "react";

type Comment = { id: number; name: string; text: string; date: string };

const seedComments: Record<string, Comment[]> = {
  astronomy: [
    { id: 1, name: "Quiet Orbit", text: "The cover feels like a whole world.", date: "A moment ago" },
    { id: 2, name: "Moon Signal", text: "I’m ready for the re-entry.", date: "2 days ago" },
  ],
  "chaos-order": [
    { id: 3, name: "Still Waters", text: "Peace be still on repeat.", date: "4 days ago" },
  ],
  "holy-clout": [
    { id: 4, name: "First Light", text: "The energy on this is undeniable.", date: "1 week ago" },
  ],
};

function storageKey(releaseId: string) {
  return `papagedon-comments-${releaseId}`;
}

function isComment(value: unknown): value is Comment {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    Number.isFinite(item.id) &&
    typeof item.name === "string" &&
    typeof item.text === "string" &&
    typeof item.date === "string"
  );
}

function readStoredComments(releaseId: string): Comment[] {
  try {
    const raw = window.localStorage.getItem(storageKey(releaseId));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isComment).map((item) => ({
      id: item.id,
      name: item.name.slice(0, 32),
      text: item.text.slice(0, 280),
      date: item.date.slice(0, 40),
    }));
  } catch {
    return [];
  }
}

function writeStoredComments(releaseId: string, comments: Comment[]) {
  try {
    window.localStorage.setItem(storageKey(releaseId), JSON.stringify(comments));
  } catch {
    // Quota or private-mode failures should not break the page.
  }
}

export default function ReleaseComments({ releaseId, releaseTitle }: { releaseId: string; releaseTitle: string }) {
  const seeds = seedComments[releaseId] ?? [];
  const [comments, setComments] = useState<Comment[]>(seeds);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    const nextSeeds = seedComments[releaseId] ?? [];
    const stored = readStoredComments(releaseId);
    setComments(stored.length ? [...nextSeeds, ...stored] : nextSeeds);
  }, [releaseId]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      name: (name.trim() || "Anonymous Orbit").slice(0, 32),
      text: text.trim().slice(0, 280),
      date: "Just now",
    };
    const stored = [
      comment,
      ...comments.filter((item) => !seeds.some((seed) => seed.id === item.id)),
    ];
    setComments([comment, ...comments]);
    writeStoredComments(releaseId, stored);
    setName("");
    setText("");
    setPosted(true);
    window.setTimeout(() => setPosted(false), 2400);
  };

  return (
    <section className="release-comments" aria-labelledby={`${releaseId}-comments`}>
      <div className="comments-heading">
        <div>
          <p className="comments-kicker">THE LISTENING ROOM</p>
          <h3 id={`${releaseId}-comments`}>What did {releaseTitle} leave with you?</h3>
        </div>
        <span className="comments-count">{comments.length} notes</span>
      </div>
      <div className="comments-layout">
        <form onSubmit={submit} className="comment-form">
          <div className="form-row">
            <label htmlFor={`${releaseId}-name`}>Display name <span>optional</span></label>
            <input id={`${releaseId}-name`} value={name} onChange={(event) => setName(event.target.value)} placeholder="Anonymous Orbit" maxLength={32} />
          </div>
          <label htmlFor={`${releaseId}-comment`}>Your experience</label>
          <textarea id={`${releaseId}-comment`} value={text} onChange={(event) => setText(event.target.value)} placeholder="Leave a signal for the next listener…" maxLength={280} required />
          <div className="comment-submit">
            <span>Saved on this device only. Other visitors cannot see it.</span>
            <button type="submit">Save note ↗</button>
          </div>
          {posted && <p className="posted-message" role="status">Saved on this device. Thank you for the note.</p>}
        </form>
        <div className="comment-list" aria-live="polite">
          {comments.map((comment) => (
            <article className="comment" key={comment.id}>
              <div className="comment-meta"><span>{comment.name}</span></div>
              <p>{comment.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
