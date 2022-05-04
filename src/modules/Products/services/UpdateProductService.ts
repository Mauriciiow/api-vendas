import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({id, name, price, quantity}: IRequest ): Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id)

        if (!product) {
            throw new AppError('Produto nao encontrado')
        }
        const productExists = await productsRepository.findByName(name)

        if (productExists) {
            throw new AppError('Ja existe um produto com este nome')
        }

        product.name = name
        product.price = price
        product.quantity = quantity

        await productsRepository.save(product)

        return product
  
    }
}

export default UpdateProductService