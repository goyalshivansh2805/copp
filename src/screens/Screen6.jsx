import React from "react";

export default function Screen6() {
  return (
    <div className="screen screen-6">
      <h2>Getting started with your product</h2>
      <ol className="steps">
        <li>Unbox carefully and keep the manual.</li>
        <li>Charge fully before first use (2 hours).</li>
        <li>Pair with your phone from Bluetooth settings.</li>
      </ol>

      <div className="video">[Explainer video — optional]</div>
      <div className="tips">
        <strong>Tips:</strong>
        <ul>
          <li>Clean with a dry cloth.</li>
          <li>Store in a cool, dry place.</li>
        </ul>
      </div>

      <button className="btn primary">I’m ready</button>
    </div>
  );
}
