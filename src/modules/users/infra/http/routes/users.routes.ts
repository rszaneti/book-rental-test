import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import UsersAvatarController from '../controllers/UsersAvatarController';
import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const upload = multer(uploadConfig.multer);
const usersAvatarController = new UsersAvatarController();
const usersController = new UsersController();

usersRoutes.get('/', usersController.index);
usersRoutes.get('/show/:id', usersController.show);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      files_id: Joi.optional(),
      username: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  usersController.create,
);

usersRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      users_id: Joi.string().uuid().required(),
      username: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  usersController.update,
);

usersRoutes.delete('/:id', usersController.delete);

usersRoutes.patch(
  '/avatar',
  upload.single('file'),
  usersAvatarController.update,
);

export default usersRoutes;
