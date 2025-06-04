
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const socket = io(SOCKET_URL, {
  
  transports: ['websocket'],

  
  autoConnect: false,

 
  auth: {
    token: localStorage.getItem('token'),
  },
});

export default socket;
