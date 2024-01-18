import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Stream from "./page/stream";
import Upload from "./page/upload";
import Chat from "./page/chat";
const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = socketIOClient(ENDPOINT);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streaming" element={<Stream socket={socket} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
