import React from "react";

const Chip = ({ text }) => <div className="chip">✔ {text}</div>;

export default function Screen4() {
  return (
    <div className="screen screen-4">
      <h2>Why people trust this product</h2>
      <div className="chips">
        <Chip text="Quality checked before shipping" />
        <Chip text="Easy returns if it’s not right" />
        <Chip text="Used by 10,000+ customers" />
        <Chip text="Secure packaging" />
      </div>
    </div>
  );
}
