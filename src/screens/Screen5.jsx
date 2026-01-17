import React from "react";

export default function Screen5() {
  const timeline = [
    { key: "confirmed", label: "Order confirmed", done: true, time: "10:02 AM" },
    { key: "packed", label: "Packed", done: true, time: "12:30 PM" },
    { key: "shipped", label: "Shipped", done: false, time: null },
    { key: "out", label: "Out for delivery", done: false, time: null },
    { key: "delivered", label: "Delivered", done: false, time: null },
  ];

  return (
    <div className="screen screen-5">
      <div className="status-top">
        <div className="status-pill">Packed</div>
        <div className="eta">Wed, Jan 21 — 10 AM–1 PM</div>
      </div>

      <div className="timeline">
        {timeline.map((t) => (
          <div className={`node ${t.done ? "done" : "pending"}`} key={t.key}>
            <div className="dot">{t.done ? '✔' : '⏳'}</div>
            <div className="meta">
              <div className="label">{t.label}</div>
              <div className="time">{t.time || '—'}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky-actions">
        <button className="btn">🆘 Need help?</button>
        <button className="btn">⏰ Change delivery</button>
        <button className="btn disabled">❌ Cancel order</button>
      </div>

      <div className="reassurance">We’ll notify you whenever your order moves forward.</div>
    </div>
  );
}
