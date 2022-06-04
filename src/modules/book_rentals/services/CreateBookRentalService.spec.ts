import AppError from '@shared/errors/AppError';
import FakeBookRentalRepository from '../repositories/fakes/FakeBookRentalRepository';
import CreateBookRentalService from './CreateBookRentalService';

let fakeBookRentalRepository: FakeBookRentalRepository;

let createBookRentalService: CreateBookRentalService;

describe('CreateBookRental', () => {
  beforeEach(() => {
    fakeBookRentalRepository = new FakeBookRentalRepository();

    createBookRentalService = new CreateBookRentalService(
      fakeBookRentalRepository,
    );
  });

  it('should be able to create a new book rental', async () => {
    const createReg = await createBookRentalService.execute({
      customers_id: '1',
      books_id: '1',
      lease_value: 10,
      total: 10,
    });

    expect(createReg).toHaveProperty('id');
  });

  it('should not be able to create a new book rental from an already rented book', async () => {
    await createBookRentalService.execute({
      customers_id: '1',
      books_id: '1',
      lease_value: 10,
      total: 10,
    });

    await expect(
      createBookRentalService.execute({
        customers_id: '1',
        books_id: '1',
        lease_value: 10,
        total: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
