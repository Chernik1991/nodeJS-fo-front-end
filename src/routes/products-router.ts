import express, {Request, Response} from 'express';
import {productsRepository, productType} from '../repositories/products-db-repository';
import {body} from 'express-validator';
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware';

const titleValidation= body('title').trim().isLength({min: 1, max: 10}).withMessage('123123123')
export const productsRouter = express.Router({})


productsRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts:productType[] = await productsRepository.findProduct(req.query.title?.toString())

    res.send(foundProducts)
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct = await productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRouter.get('/:id',
    titleValidation,
    (req: Request, res: Response) => {
    const product = productsRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.put('/:id', async (req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = await productsRepository.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDelete = await productsRepository.deleteProduct(+req.params.id)
    if (isDelete) {
        res.send(204)
    } else
        res.send(404)
})
