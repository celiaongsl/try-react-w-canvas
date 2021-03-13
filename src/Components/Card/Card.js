import React from "react";
import "../Canvas.css";

const Card = (props) => {
  const { marginTop } = props;
  return (
    <div className="splash-container" style={{ marginTop: marginTop }}>
      This is a card! <br />A review rating here??? Or maybe something else??
    </div>
  );
};

export default Card;
