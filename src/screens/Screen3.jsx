import React from "react";

const Review = ({ name, rating, quote }) => (
  <div className="review">
    <div className="meta">
      <strong>{name}</strong>
      <span className="rating">{rating}★</span>
      <span className="verified">Verified buyer</span>
    </div>
    <div className="quote">"{quote}"</div>
  </div>
);

export default function Screen3() {
  return (
    <div className="screen screen-3">
      <h2>What customers say after buying this</h2>
      <div className="highlight">Rated 4.6★ by people like you</div>

      <div className="reviews">
        <div className="video-reviews">
          <div className="video">[Video Review 1]</div>
          <div className="video">[Video Review 2]</div>
        </div>

        <div className="text-reviews">
          <Review name="Asha" rating={5} quote="Great sound and comfy for long use." />
          <Review name="Ravi" rating={4} quote="Good value for money." />
        </div>
      </div>

      <button className="btn tertiary">See more reviews</button>
    </div>
  );
}
