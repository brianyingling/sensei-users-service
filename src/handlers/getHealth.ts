import {
    NextFunction,
    Request,
    Response
} from 'express';

const getHealth = (_: Request, res: Response, __: NextFunction) => {
    return res.status(200).send('OK');
}

export default getHealth;