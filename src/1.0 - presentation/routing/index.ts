import { Router } from 'express';
import BloqsController from '../controllers/bloqsController';
import DIContainer from "rsdi";
import LockersController from '../controllers/lockersController';
import RentsController from '../controllers/rentsController';

export default class RoutingConfigurator {
  static configure(router: Router, diContainer: DIContainer) {

    const bloqsController: BloqsController = diContainer.get(BloqsController);
    const lockersController: LockersController = diContainer.get(LockersController);
    const rentsController: RentsController = diContainer.get(RentsController);

    router.route('/bloqs')
        .post(bloqsController.createBloqAsync.bind(bloqsController))
        .get(bloqsController.getBloqsAsync.bind(bloqsController))

    router.route('/bloqs/:id')
        .delete(bloqsController.deleteBloqAsync.bind(bloqsController))
        .put(bloqsController.updateBloqAsync.bind(bloqsController))

    router.route('/bloqs/:id/lockers')
        .post(lockersController.createLockerAsync.bind(lockersController))
        .get(lockersController.getLockersAsync.bind(lockersController))

    router.route('/bloqs/:id/lockers/:lockerId')
        .delete(lockersController.deleteLockerAsync.bind(lockersController))
        .put(lockersController.updateLockerAsync.bind(lockersController))
    
    router.route('/bloqs/:id/lockers/:lockerId/rents')
        .post(rentsController.createRentAsync.bind(rentsController))
        .get(rentsController.getRentsAsync.bind(rentsController))

    router.route('/bloqs/:id/lockers/:lockerId/rents/:rentId')
        .delete(rentsController.deleteRentAsync.bind(rentsController))
        .put(rentsController.updateRentAsync.bind(rentsController))

    return router;
  }
}
