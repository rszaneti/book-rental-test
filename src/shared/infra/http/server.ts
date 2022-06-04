import 'reflect-metadata';
import 'dotenv/config';
import { serverHttp } from './http';
import './websocket';

serverHttp.listen(process.env.PORT || 3345, () => {
  console.log('Server listen');
});
