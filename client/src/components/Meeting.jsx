import React, { useEffect, useRef } from "react";

const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const userStream = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const peerRef  = useRef();


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

        socketRef.current.on("user joined", (userId) => {
          otherUser.current = userId;
        });
      });
  }, []);

  function callUser(userId) {
    peerRef.current = createPeer(userId);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }


  function createPeer(userId) {
    const peer = new RTCPeerConnection({
        iceServers : [
            {
                urls: "stun:stun.stunprotocol.org"
            },{
                urls: 'turn:numb.viagenie.ca',
                cerdential: 'muazkh',
                username: 'webrtc@live.com'
            }
        ]
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded= handleNegotiationNeededEvent(userId);

    return peer;
    
  }

  return (
    <div>
      <video autoPlay ref={userVideo} />
      <video autoplay ref={partnerVideo} />
    </div>
  );
};

export default Room;
