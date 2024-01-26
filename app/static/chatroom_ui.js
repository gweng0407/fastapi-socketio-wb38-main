var myVideo;

document.addEventListener("DOMContentLoaded", (event) => {
  myVideo = document.getElementById("local_vid");
  myVideo.onloadeddata = () => {
    console.log("W,H: ", myVideo.videoWidth, ", ", myVideo.videoHeight);
  };
  // var muteBttn = document.getElementById("bttn_mute");
  // var muteVidBttn = document.getElementById("bttn_vid_mute");
  // var callEndBttn = document.getElementById("call_end");

  // muteBttn.addEventListener("click", (event)=>{
  //     audioMuted = !audioMuted;
  //     setAudioMuteState(audioMuted);
  // });
  // muteVidBttn.addEventListener("click", (event)=>{
  //     videoMuted = !videoMuted;
  //     setVideoMuteState(videoMuted);
  // });
  // callEndBttn.addEventListener("click", (event)=>{
  //     window.location.replace("/");
  // });

  // document.getElementById("room_link").innerHTML=`or the link: <span class="heading-mark">${window.location.href}</span>`;
});

// DOM에서 채팅창과 입력 필드를 찾기
var chatWindow = document.createElement("div");
chatWindow.classList.add("chat-window");

var chatInput = document.createElement("input");
chatInput.type = "text";
chatInput.placeholder = "메시지를 입력하세요...";

var sendButton = document.createElement("button");
sendButton.innerHTML = "전송";

// 이벤트 핸들러: 메시지 전송
sendButton.addEventListener("click", function () {
  var messageText = chatInput.value.trim();
  if (messageText !== "") {
    // 채팅 메시지 전송
    sendViaServer({
      type: "chat",
      sender_id: myID,
      message: messageText,
    });

    // 메시지를 화면에 표시
    var messageElement = document.createElement("div");
    messageElement.classList.add("message", "own-message");
    messageElement.innerHTML = `<strong>${myName}:</strong> ${messageText}`;
    chatWindow.appendChild(messageElement);

    // 입력 필드 초기화
    chatInput.value = "";
  }
});

// 서버로부터 채팅 메시지 수신
socket.on("chat", function (msg) {
  var messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `F<strong>${msg.sender}:</strong> ${msg.message}`;
  chatWindow.appendChild(messageElement);
});

// 채팅창을 문서에 추가
document.body.appendChild(chatWindow);
document.body.appendChild(chatInput);
document.body.appendChild(sendButton);

function makeVideoElementCustom(element_id, display_name) {
  let vid = document.createElement("video");
  vid.id = "vid_" + element_id;
  vid.autoplay = true;
  return vid;
}

function addVideoElement(element_id, display_name) {
  document
    .getElementById("video_grid")
    .appendChild(makeVideoElementCustom(element_id, display_name));
  checkVideoLayout();
}
function removeVideoElement(element_id) {
  let v = getVideoObj(element_id);
  if (v.srcObject) {
    v.srcObject.getTracks().forEach((track) => track.stop());
  }
  v.removeAttribute("srcObject");
  v.removeAttribute("src");

  document.getElementById("vid_" + element_id).remove();
}

function getVideoObj(element_id) {
  return document.getElementById("vid_" + element_id);
}

function setAudioMuteState(flag) {
  let local_stream = myVideo.srcObject;
  console.log("setAudioMuteState: ", local_stream);
  local_stream.getAudioTracks().forEach((track) => {
    track.enabled = !flag;
  });
  // switch button icon
  document.getElementById("mute_icon").innerText = flag ? "mic_off" : "mic";
}
function setVideoMuteState(flag) {
  let local_stream = myVideo.srcObject;
  local_stream.getVideoTracks().forEach((track) => {
    track.enabled = !flag;
  });
  // switch button icon
  document.getElementById("vid_mute_icon").innerText = flag
    ? "videocam_off"
    : "videocam";
}
