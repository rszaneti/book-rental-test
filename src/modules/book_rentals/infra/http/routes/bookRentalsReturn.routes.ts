import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// Controllers
import BookRentalsReturnController from '../controllers/BookRentalsReturnController';

const bookRentalsReturnRoutes = Router();
const bookRentalsReturnController = new BookRentalsReturnController();

// Controllers
bookRentalsReturnRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      book_rentals_id: Joi.string().uuid().required(),
    },
  }),
  bookRentalsReturnController.update,
);

export default bookRentalsReturnRoutes;
