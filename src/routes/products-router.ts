import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware';
import {productType} from "../repositories/db";
import {productsService} from "../domain/products-service";

const titleValidation= body('title').trim().isLength({min: 1, max: 10}).withMessage('123123123')
export const productsRouter = express.Router({})


productsRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts:productType[] = await productsService.findProduct(req.query.title?.toString())

    res.send(foundProducts)
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct = await productsService.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRouter.get('/:id',
    titleValidation,
    (req: Request, res: Response) => {
    const product = productsService.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.put('/:id', async (req: Request, res: Response) => {
    const isUpdated = await productsService.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = await productsService.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDelete = await productsService.deleteProduct(+req.params.id)
    if (isDelete) {
        res.send(204)
    } else
        res.send(404)
})
