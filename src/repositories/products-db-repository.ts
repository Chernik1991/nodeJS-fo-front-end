import {productCollection, productType} from "./db";
import {ProductType} from "../domain/products-service";

export const productsRepository = {
    async findProduct(title: string | null | undefined): Promise<productType[]> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        return productCollection.find({}).toArray()
    },
    async createProduct(newProduct:ProductType) {
        await productCollection.insertOne(newProduct)
        return newProduct
    },
    async getProductById(id: number) {
        const product = productCollection.findOne({id})
        if (product) {
            return product
        } else {
            return null

        }
    },
    async updateProduct(id: number, title: string) {
        const result = await productCollection.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number) {
        const result = await productCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
}