import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ReturnBookRentalService from '@modules/book_rentals/services/ReturnBookRentalService';

export default class BookRentalsReturnController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { book_rentals_id } = request.body;

    const updateReg = container.resolve(ReturnBookRentalService);

    const reg = await updateReg.execute({
      book_rentals_id,
    });

    return response.json({ bookrental: classToClass(reg) });
  }
}
