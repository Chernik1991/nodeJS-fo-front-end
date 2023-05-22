import {productType} from "../repositories/db";
import {productsRepository} from "../repositories/products-db-repository";


export const productsService = {
    async findProduct(title: string | null | undefined): Promise<productType[]> {

        return productsRepository.findProduct(title)
    },
    async createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title
        }
        return await productsRepository.createProduct(newProduct)
    },
    async getProductById(id: number) {
        return productsRepository.getProductById(id)
    },
    async updateProduct(id: number, title: string) {
        return  await productsRepository.updateProduct(id, title)
    },
    async deleteProduct(id: number) {
        return await productsRepository.deleteProduct(id)

    },
}
export type ProductType = {
    id: number,
    title: string
}