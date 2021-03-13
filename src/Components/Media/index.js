import React from "react";
import "../Canvas.css";

const Media = (props) => {
  const { marginTop } = props;
  return (
    <div className="splash-container" style={{ marginTop: marginTop }}>
      Some kind of Media here!!!
    </div>
  );
};

export default Media;