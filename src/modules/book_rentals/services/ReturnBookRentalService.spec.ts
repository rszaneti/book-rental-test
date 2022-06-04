import { addDays } from 'date-fns';

import AppError from '@shared/errors/AppError';

import FakeBookRentalRepository from '../repositories/fakes/FakeBookRentalRepository';
import ReturnBookRentalService from './ReturnBookRentalService';

let fakeBookRentalRepository: FakeBookRentalRepository;

let returnBookRentalService: ReturnBookRentalService;

describe('ReturnBookRental', () => {
  beforeEach(() => {
    fakeBookRentalRepository = new FakeBookRentalRepository();

    returnBookRentalService = new ReturnBookRentalService(
      fakeBookRentalRepository,
    );
  });

  it('should be able to update return of the book rental', async () => {
    const createReg = await fakeBookRentalRepository.create({
      customers_id: '1',
      books_id: '1',
      withdrawal_date: new Date(),
      expected_return_date: addDays(Date.now(), 2),
      lease_value: 10,
      total: 10,
    });

    const updateReg = await returnBookRentalService.execute({
      book_rentals_id: createReg.id,
    });

    expect(updateReg.return_date).toBeTruthy();
    expect(updateReg.total).toBe(10);
  });

  it('should not be able to return a non-existent book', async () => {
    await fakeBookRentalRepository.create({
      customers_id: '1',
      books_id: '1',
      withdrawal_date: new Date(),
      expected_return_date: addDays(Date.now(), 2),
      lease_value: 10,
      total: 10,
    });

    await expect(
      returnBookRentalService.execute({
        book_rentals_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update book return with fee if late', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 3, 1, 12).getTime();
    });

    const createReg = await fakeBookRentalRepository.create({
      customers_id: '1',
      books_id: '1',
      withdrawal_date: new Date(2022, 2, 5),
      expected_return_date: addDays(new Date(2022, 2, 5), 2),
      lease_value: 10,
      total: 10,
    });

    const updateReg = await returnBookRentalService.execute({
      book_rentals_id: createReg.id,
    });

    expect(updateReg.total).toBe(10.1);
  });
});

it('should not be able to return an already returned book', async () => {
  const createReg = await fakeBookRentalRepository.create({
    customers_id: '1',
    books_id: '1',
    withdrawal_date: new Date(),
    expected_return_date: addDays(Date.now(), 2),
    lease_value: 10,
    total: 10,
  });

  await returnBookRentalService.execute({
    book_rentals_id: createReg.id,
  });

  await expect(
    returnBookRentalService.execute({
      book_rentals_id: createReg.id,
    }),
  ).rejects.toBeInstanceOf(AppError);
});
