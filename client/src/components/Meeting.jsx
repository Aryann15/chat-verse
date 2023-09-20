import React, { useRef } from "react";

const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();

  return (
    <div>
      <video autoPlay ref={userVideo} />
      <video autoplay ref={partnerVideo} />
    </div>
  );
};
