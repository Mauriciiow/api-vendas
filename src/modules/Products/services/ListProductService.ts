import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";


class ListProductServices{
    public async execute(): Promise<Product[]>{
        const productsRepository = getCustomRepository(ProductRepository);

        const products = await productsRepository.find()
        
        return products
    }
}

export default ListProductServices