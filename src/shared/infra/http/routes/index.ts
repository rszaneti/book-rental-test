import { Router } from 'express';

// Book
import booksRoutes from '@modules/books/infra/http/routes/books.routes';

// Book Rental
import bookRentalsRoutes from '@modules/book_rentals/infra/http/routes/bookRentals.routes';

// Customers
import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import passwordUserRoutes from '@modules/users/infra/http/routes/password.routes';
import sessionsUserRoutes from '@modules/users/infra/http/routes/sessions.routes';

import ensureUserAuthenticated from '../middlewares/ensureUserAuthentication';

const routes = Router();

// Users
routes.use('/password/user', passwordUserRoutes);
routes.use('/sessions/user', sessionsUserRoutes);

// ###################################################### - Middleware
routes.use(ensureUserAuthenticated);

// book
routes.use('/book', booksRoutes);

// book rental
routes.use('/book-rental', bookRentalsRoutes);

// Customers
routes.use('/customer', customersRoutes);

// Users
routes.use('/user', usersRoutes);

export default routes;
