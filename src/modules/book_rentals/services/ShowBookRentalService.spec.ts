import { addDays } from 'date-fns';
import AppError from '@shared/errors/AppError';
import FakeBookRentalRepository from '../repositories/fakes/FakeBookRentalRepository';
import ShowBookRentalService from './ShowBookRentalService';

let fakeBookRentalRepository: FakeBookRentalRepository;

let showBookRentalService: ShowBookRentalService;

describe('ShowBookRental', () => {
  beforeEach(() => {
    fakeBookRentalRepository = new FakeBookRentalRepository();

    showBookRentalService = new ShowBookRentalService(fakeBookRentalRepository);
  });

  it('should be able to show the book rental', async () => {
    const createReg = await fakeBookRentalRepository.create({
      customers_id: '1',
      books_id: '1',
      withdrawal_date: new Date(),
      expected_return_date: addDays(Date.now(), 2),
      lease_value: 10,
      total: 10,
    });

    const showReg = await showBookRentalService.execute({
      book_rentals_id: createReg.id,
    });

    expect(showReg.customers_id).toBe('1');
    expect(showReg.books_id).toBe('1');
  });
});

it('should not be able show to non-existing book rental', async () => {
  await fakeBookRentalRepository.create({
    customers_id: '1',
    books_id: '1',
    withdrawal_date: new Date(),
    expected_return_date: addDays(Date.now(), 2),
    lease_value: 10,
    total: 10,
  });

  await expect(
    showBookRentalService.execute({
      book_rentals_id: '12',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
