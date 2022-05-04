import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
}

class ShowProductServices{
    public async execute({id}: IRequest): Promise<Product | undefined>{
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id)

        if (!product) {
            throw new AppError('Produto nao encontrado')
        }

        return product
    }
}

export default ShowProductServices