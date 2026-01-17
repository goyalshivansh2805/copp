import React from "react";

export default function Screen2({ onNavigate }) {
  return (
    <div className="screen screen-2">
      <h1>Your order is now yours</h1>
      <p className="subtext">You can manage your order until it’s shipped.</p>

      <div className="action-cards">
        <button className="card" onClick={() => onNavigate(5)}>
          <div className="icon">📦</div>
          <div className="title">Track order</div>
        </button>

        <button className="card" onClick={() => alert("Change delivery flow (mock)")}>
          <div className="icon">⏰</div>
          <div className="title">Change delivery time / date</div>
        </button>

        <button className="card disabled" onClick={() => alert("Edit/Cancel not available")}> 
          <div className="icon">✏️</div>
          <div className="title">Edit / Cancel order</div>
          <div className="hint">Not available — shipped</div>
        </button>

        <button className="card" onClick={() => onNavigate('help')}>
          <div className="icon">🆘</div>
          <div className="title">Need help?</div>
        </button>
      </div>

      <div className="trust">You’re in control — make changes anytime before dispatch.</div>
    </div>
  );
}
