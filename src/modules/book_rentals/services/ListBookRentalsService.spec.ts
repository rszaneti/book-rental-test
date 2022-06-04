import { addDays } from 'date-fns';
import FakeBookRentalRepository from '../repositories/fakes/FakeBookRentalRepository';
import ListBookRentalsService from './ListBookRentalsService';

let fakeBookRentalRepository: FakeBookRentalRepository;

let listBookRentalsService: ListBookRentalsService;

describe('ListBookRentals', () => {
  beforeEach(() => {
    fakeBookRentalRepository = new FakeBookRentalRepository();

    listBookRentalsService = new ListBookRentalsService(
      fakeBookRentalRepository,
    );
  });

  it('should be able to list the book rentas', async () => {
    const createReg1 = await fakeBookRentalRepository.create({
      customers_id: '1',
      books_id: '1',
      withdrawal_date: new Date(),
      expected_return_date: addDays(Date.now(), 2),
      lease_value: 10,
      total: 10,
    });

    const createReg2 = await fakeBookRentalRepository.create({
      customers_id: '1',
      books_id: '2',
      withdrawal_date: new Date(),
      expected_return_date: addDays(Date.now(), 2),
      lease_value: 10,
      total: 10,
    });

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);
    createRegsUnion.push(createReg2);

    const createRegs = await listBookRentalsService.execute({
      sort_field: 'withdrawal_date',
      sort_order: 'ASC',
      page: 1,
      rowsperpage: 15,
    });

    expect(JSON.stringify(createRegs)).toBe(JSON.stringify(createRegsUnion));
  });
});
