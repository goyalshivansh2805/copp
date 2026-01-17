import React from "react";

export default function Screen1({ onNext }) {
  const order = {
    id: "#123456",
    item: "Wireless Headphones — Black",
    eta: "Arrives Wed, Jan 21",
    address: "Home — 12B Maple St, Apt 4",
  };

  return (
    <div className="screen screen-1">
      <div className="top">
        <div className="success-animation" aria-hidden>
          ✓
        </div>
        <h1>Order confirmed</h1>
        <p className="subtext">Your payment was successful. We’ve received your order.</p>
      </div>

      <div className="card order-snapshot" role="group" aria-label="Order snapshot">
        <div className="row">
          <div className="label">Order ID</div>
          <div className="value">{order.id}</div>
        </div>
        <div className="row">
          <div className="label">Item</div>
          <div className="value item">{order.item}</div>
        </div>
        <div className="row">
          <div className="label">Estimated delivery</div>
          <div className="value">{order.eta}</div>
        </div>
        <div className="row">
          <div className="label">Delivery</div>
          <div className="value">{order.address}</div>
        </div>
      </div>

      <div className="reassurance">Don’t worry — we’ll keep you updated at every step.</div>

      <div className="actions">
        <button className="btn primary" onClick={onNext}>Track your order</button>
        <button className="btn secondary">View order details</button>
      </div>
    </div>
  );
}
