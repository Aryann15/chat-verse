import React, { useEffect, useRef } from "react";

const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const userStream = useRef();
  const socketRef = useRef();
  const otherUser = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("/");
        socketRef.current.emit("join room", props.match.params.roomId);

        socketRef.current.on("other user", (userId) => {
          callUser(userId);
          otherUser.current = userId;
        });

        socketRef.curreny.on("user joined", (userId) => {
          otherUser.current = userId;
        });
      });
  }, []);

  return (
    <div>
      <video autoPlay ref={userVideo} />
      <video autoplay ref={partnerVideo} />
    </div>
  );
};

export default Room;
