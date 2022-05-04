import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string; 
}


class DeleteProductService{
    public async execute({id}: IRequest): Promise<void>{
        const productsRepository = getCustomRepository(ProductRepository)

        const product = await productsRepository.findOne(id)

        if (!product) {
            throw new AppError('Produto nao encontrado')
        }

        await productsRepository.remove(product)
    }
}

export default DeleteProductService