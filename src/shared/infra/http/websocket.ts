import { io } from './http';

io.on('connection', socket => {
  socket.on('disconnect', () => {
    // ...
  });
});
