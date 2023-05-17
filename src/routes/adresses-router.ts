import {Request, Response, Router} from 'express';
import {addressesRepository} from '../repositories/addresses-repository';



export const addressesRouter = Router()
addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addressesRepository.allAddresses())
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addressesRepository.findAddress(+req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})