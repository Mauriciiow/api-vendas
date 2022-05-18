import CustomersRepository from "../repositories/CustomersRepository";
import Customer from "../entities/Customer";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}

class ShowCustomerService {
    public async execute({id}: IRequest): Promise<Customer | undefined>{
        const customersRepository = getCustomRepository(CustomersRepository)
        const customer = await customersRepository.findById(id)

        if (!customer) {
            throw new AppError('Cliente nao encontrado')
        }

        return customer
    }
}

export default ShowCustomerService