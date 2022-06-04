import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';
import FakeFileRepository from '../../parameters/files/repositories/fakes/FakeFileRepository';

import CreateFileService from '../../parameters/files/services/CreateFileService';
import CreateCustomerService from './CreateCustomerService';
import UpdateCustomerFileService from './UpdateCustomerFileService';

let fakeCustomerRepository: FakeCustomerRepository;
let fakeFileRepository: FakeFileRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeMailProvider: FakeMailProvider;

let createFileService: CreateFileService;
let createCustomerService: CreateCustomerService;
let updateCustomerFileService: UpdateCustomerFileService;

describe('UpdateCustomerFile', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    fakeFileRepository = new FakeFileRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeMailProvider = new FakeMailProvider();

    createFileService = new CreateFileService(
      fakeFileRepository,
      fakeStorageProvider,
    );

    createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeMailProvider,
    );

    updateCustomerFileService = new UpdateCustomerFileService(
      fakeCustomerRepository,
    );
  });

  it('should be able to update avatar file from customer', async () => {
    const file = await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    const customer = await createCustomerService.execute({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    await updateCustomerFileService.execute({
      customers_id: customer.id,
      files_id: file.id,
    });

    expect(customer.files_id).toBe(file.id);
  });

  it('should not be able to update avatar file with a customer not existing', async () => {
    expect(
      updateCustomerFileService.execute({
        customers_id: '',
        files_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
