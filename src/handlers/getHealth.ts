import {
    NextFunction,
    Request,
    Response
} from 'express';

const getHealth = (_: Request, res: Response, __: NextFunction) => {
    return res.json({status: 200, message: 'OK'});
}

export default getHealth;