import React, { useEffect, useRef } from "react";

const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const userSream = useRef();

  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream => {
        userVideo.current.srcObject =stream;
        userStream.current = stream;
    })
  },[])

  return (
    <div>
      <video autoPlay ref={userVideo} />
      <video autoplay ref={partnerVideo} />
    </div>
  );
};
