import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import FilesController from '../controllers/FilesController';

const filesRoutes = Router();
const filesController = new FilesController();
const upload = multer(uploadConfig.multer);

filesRoutes.post('/', upload.single('file'), filesController.create);
filesRoutes.delete('/', filesController.delete);

export default filesRoutes;
