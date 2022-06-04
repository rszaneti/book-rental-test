import { addDays } from 'date-fns';
import FakeBookRentalRepository from '../repositories/fakes/FakeBookRentalRepository';
import ListTotalBookRentalsService from './ListTotalBookRentalsService';

let fakeBookRentalRepository: FakeBookRentalRepository;

let listTotalBookRentalsService: ListTotalBookRentalsService;

describe('ListTotalBookRentals', () => {
  beforeEach(() => {
    fakeBookRentalRepository = new FakeBookRentalRepository();

    listTotalBookRentalsService = new ListTotalBookRentalsService(
      fakeBookRentalRepository,
    );
  });

  it('should be able to count total book rentals', async () => {
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

    const countRegs = await listTotalBookRentalsService.execute({});

    expect(countRegs).toBe(createRegsUnion.length);
  });
});
