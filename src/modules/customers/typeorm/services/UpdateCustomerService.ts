import CustomersRepository from "../repositories/CustomersRepository";
import Customer from "../entities/Customer";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({id, name, email}: IRequest): Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository)

        const customer = await customersRepository.findById(id)
        
        if (!customer) {
            throw new AppError('Cliente nao encontrado')
        }

        const emailUpdate = await customersRepository.findByEmail(email)

        if (emailUpdate && id !== customer.id) {
            throw new AppError('Outro cliente ja esta utilizando esse email')
        }

        customer.name = name
        customer.email = email

        await customersRepository.save(customer)

        return customer
    }
}

export default UpdateCustomerService