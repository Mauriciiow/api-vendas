import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductServices from "../services/ListProductService";
import ShowProductServices from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";

class ProductsController {
    public async index(request: Request, response: Response): Promise<Response>{
        const listProducts = new ListProductServices()

        const products =  await listProducts.execute()

       return response.json(products)
    }

    public async show(request: Request, response: Response):Promise<Response>{
        const {id} = request.params
        const showProduct = new ShowProductServices()
       
        const product = showProduct.execute({id})

        return response.json(product)
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const {name, price, quantity} = request.body
        const createProduct = new CreateProductService()

      const product = await createProduct.execute({name, price, quantity})

        return response.json(product)
    }

    public async update(request: Request, response: Response): Promise<Response>{
      const {name, price, quantity} = request.body
      const {id} = request.params
      const updateProducte = new UpdateProductService()

      const product = await updateProducte.execute({id, name, price, quantity})

      return response.json(product)
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const {id} = request.params
        const deleteProduct = new DeleteProductService()

         await deleteProduct.execute({id})

        return response.json([])
    }
}

export default ProductsController