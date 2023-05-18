export type productType={
    id:number,
    title:string
}
const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    async findProduct(title: string | null | undefined):Promise<productType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
    async createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title
        }
        products.push(newProduct)
        return newProduct
    },
    async getProductById(id: number) {
        return products.find(p => p.id === id)

    },
    async updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    },
}