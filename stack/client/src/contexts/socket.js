import React, { useContext, useState, useEffect } from 'react';
import openSocket from 'socket.io-client';

const { REACT_APP_API_BASE } = process.env;
let websocket;

export const SocketContext = React.createContext();
export const useSocket = () => useContext(SocketContext)
export const SocketProvider = ({
  children,
  ...initOptions
}) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const initSocket = async () => {
      if (websocket) return
      websocket = openSocket(`${REACT_APP_API_BASE}/rtm/events`, { path: '/api/rtm' });
      setSocket(websocket)
    };
    initSocket();
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
};
