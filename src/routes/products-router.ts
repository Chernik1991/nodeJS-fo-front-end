import express, {Request, Response} from 'express';
import {productsRepository} from '../repositories/products-repository';

export const productsRouter = express.Router({})


productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProduct(req.query.title?.toString())
    res.send(foundProducts)
})
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = productsRepository.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDelete = productsRepository.deleteProduct(+req.params.id)
    if (isDelete) {
        res.send(204)
    } else
        res.send(404)
})
