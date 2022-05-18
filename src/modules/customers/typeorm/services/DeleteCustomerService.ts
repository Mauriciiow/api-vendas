import CustomersRepository from "../repositories/CustomersRepository";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

class DeleteCustomerService {
    public async execute({id}: IRequest): Promise<void>{
        const customersRepository = getCustomRepository(CustomersRepository)

        const customer = await customersRepository.findById(id)
        
        if (!customer) {
            throw new AppError('Cliente nao encontrado')
        }

        await customersRepository.remove(customer)


    }
}

export default DeleteCustomerService