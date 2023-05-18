import {productCollection, productType} from "./db";


export const productsRepository = {
    async findProduct(title: string | null | undefined): Promise<productType[]> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        return productCollection.find({}).toArray()
    },
    async createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title
        }
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