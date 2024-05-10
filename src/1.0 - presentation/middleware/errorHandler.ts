import InvalidOperationError from "../../2.0 - service/errors/invalidOperationError";
import ResourceNotFound from "../../2.0 - service/errors/resourceNotFound";

const ErrorHandler = (err: any, req : any, res : any, next: any) => {
    let errStatus = 500;

    if(err instanceof ResourceNotFound)
    {
        errStatus = 404;
    }
  
    if(err instanceof InvalidOperationError)
    {
        errStatus = 400;
    }

    const errMsg = err.message || 'Something went wrong';

    res.status(errStatus).json({
        message: errMsg,
    });
}

export default ErrorHandler