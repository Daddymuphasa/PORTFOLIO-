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

function storageKey(releaseId: string) { return `papagedon-comments-${releaseId}`; }

export default function ReleaseComments({ releaseId, releaseTitle }: { releaseId: string; releaseTitle: string }) {
  const [comments, setComments] = useState<Comment[]>(seedComments[releaseId] ?? []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey(releaseId));
    if (saved) setComments([...(seedComments[releaseId] ?? []), ...JSON.parse(saved)]);
  }, [releaseId]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) return;
    const comment = { id: Date.now(), name: name.trim() || "Anonymous Orbit", text: text.trim(), date: "Just now" };
    const saved = [comment, ...comments.filter((item) => !(seedComments[releaseId] ?? []).some((seed) => seed.id === item.id))];
    setComments([comment, ...comments]);
    window.localStorage.setItem(storageKey(releaseId), JSON.stringify(saved));
    setName(""); setText(""); setPosted(true);
    window.setTimeout(() => setPosted(false), 2400);
  };

  return (
    <section className="release-comments" aria-labelledby={`${releaseId}-comments`}>
      <div className="comments-heading">
        <div><p className="comments-kicker">THE LISTENING ROOM</p><h3 id={`${releaseId}-comments`}>What did {releaseTitle} leave with you?</h3></div>
        <span className="comments-count">{comments.length} notes</span>
      </div>
      <div className="comments-layout">
        <form onSubmit={submit} className="comment-form">
          <div className="form-row"><label htmlFor={`${releaseId}-name`}>Display name <span>optional</span></label><input id={`${releaseId}-name`} value={name} onChange={(event) => setName(event.target.value)} placeholder="Anonymous Orbit" maxLength={32} /></div>
          <label htmlFor={`${releaseId}-comment`}>Your experience</label>
          <textarea id={`${releaseId}-comment`} value={text} onChange={(event) => setText(event.target.value)} placeholder="Leave a signal for the next listener…" maxLength={280} required />
          <div className="comment-submit"><span>Names are anonymous by default.</span><button type="submit">Post note ↗</button></div>
          {posted && <p className="posted-message" role="status">Thank you for sharing your experience.</p>}
        </form>
        <div className="comment-list" aria-live="polite">
          {comments.map((comment) => <article className="comment" key={comment.id}><div className="comment-meta"><span>{comment.name}</span></div><p>{comment.text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
