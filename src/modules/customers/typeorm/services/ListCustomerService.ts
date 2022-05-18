import CustomersRepository from "../repositories/CustomersRepository";
import Customer from "../entities/Customer";
import { getCustomRepository } from "typeorm";


class ListCustomerService {
    public async execute(): Promise<Customer[]>{
        const customersRepository = getCustomRepository(CustomersRepository)
        const customer = await customersRepository.find()

        return customer
    }
}

export default ListCustomerService