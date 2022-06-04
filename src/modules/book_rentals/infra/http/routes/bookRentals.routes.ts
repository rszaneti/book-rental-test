import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// Routers
import bookRentalsReturnRoutes from './bookRentalsReturn.routes';

// Controllers
import BookRentalsController from '../controllers/BookRentalsController';

const bookRentalsRoutes = Router();
const bookRentalsController = new BookRentalsController();

// Routers
bookRentalsRoutes.use('/return', bookRentalsReturnRoutes);

// Controllers
bookRentalsRoutes.get('/', bookRentalsController.index);
bookRentalsRoutes.get('/show/:id', bookRentalsController.show);

bookRentalsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customers_id: Joi.string().uuid().required(),
      books_id: Joi.string().uuid().required(),
      lease_value: Joi.number(),
    },
  }),
  bookRentalsController.create,
);

export default bookRentalsRoutes;
