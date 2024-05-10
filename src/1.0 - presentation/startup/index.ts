import Express, { NextFunction, Request, Response } from 'express';
import RoutingConfigurator from '../routing';
import DIConfigurator from '../di';
import FilesLoader from './files_loader';
import ErrorHandler from '../middleware/errorHandler';

export default class StartupExpress {
  static createExpress() {
    const app = Express();
    app.use(Express.json());

    FilesLoader.load();
    
    const diContainer = DIConfigurator.configure();

    app.use(RoutingConfigurator.configure(Express.Router(), diContainer));

    app.use(ErrorHandler);

    return app;
  }
}
