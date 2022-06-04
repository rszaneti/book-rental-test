import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import BooksController from '../controllers/BooksController';
import BooksImageController from '../controllers/BooksImageController';

const booksRoutes = Router();
const upload = multer(uploadConfig.multer);
const booksController = new BooksController();
const booksImageController = new BooksImageController();

// Controllers
booksRoutes.get('/', booksController.index);
booksRoutes.get('/show/:id', booksController.show);
booksRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      files_id: Joi.optional(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      author: Joi.string().required(),
      year_edition: Joi.number().required(),
      number_edition: Joi.number().required(),
      year: Joi.number().required(),
      language: Joi.string().required(),
      country: Joi.string().required(),
      pages: Joi.number(),
      weight: Joi.number(),
      lease_value: Joi.number(),
      status: Joi.boolean(),
    },
  }),
  booksController.create,
);
booksRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      books_id: Joi.string().uuid().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      author: Joi.string().required(),
      year_edition: Joi.number().required(),
      number_edition: Joi.number().required(),
      year: Joi.number().required(),
      language: Joi.string().required(),
      country: Joi.string().required(),
      pages: Joi.number(),
      weight: Joi.number(),
      lease_value: Joi.number(),
      status: Joi.boolean(),
    },
  }),
  booksController.update,
);
booksRoutes.delete('/:id', booksController.delete);

booksRoutes.patch('/image', upload.single('file'), booksImageController.update);

export default booksRoutes;
