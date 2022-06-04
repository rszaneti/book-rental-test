import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

// Controllers
import CustomersAvatarController from '../controllers/CustomersAvatarController';
import CustomersController from '../controllers/CustomersController';

const customersRoutes = Router();
const upload = multer(uploadConfig.multer);
const customersAvatarController = new CustomersAvatarController();
const customersController = new CustomersController();

// Controllers
customersRoutes.get('/', customersController.index);
customersRoutes.get('/show/:id', customersController.show);
customersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      files_id: Joi.optional(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cellphone: Joi.optional(),
    },
  }),
  customersController.create,
);
customersRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      customers_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cellphone: Joi.optional(),
    },
  }),
  customersController.update,
);
customersRoutes.delete('/:id', customersController.delete);

customersRoutes.patch(
  '/avatar',
  upload.single('file'),
  customersAvatarController.update,
);

export default customersRoutes;
