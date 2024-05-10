import DIContainer, { object, use } from "rsdi";
import BloqService from '../../2.0 - service/bloq_service/implementations'
import BloqsController from '../controllers/bloqsController'
import InMemBloqRepository from "../../3.0 - data/repositories/bloq/implementations";
import RentsController from "../controllers/rentsController";
import LockersController from "../controllers/lockersController";
import LockerService from "../../2.0 - service/locker_service/implementations";
import RentService from "../../2.0 - service/rent_service/implementations";
import BloqMongoRepository from "../../3.0 - data/repositories/bloq/implementations/mongoRepository";

export default class DIConfigurator {
  static configure() {
    const container = new DIContainer();

    container.add({
        // Data repositories
        [BloqMongoRepository.name]: object(BloqMongoRepository),

        // Services
        [BloqService.name]: object(BloqService).construct(
          use(BloqMongoRepository.name),
        ),
        [LockerService.name]: object(LockerService).construct(
          use(BloqMongoRepository.name),
        ),
        [RentService.name]: object(RentService).construct(
          use(BloqMongoRepository.name)
        ),

        // Controllers
        [BloqsController.name]: object(BloqsController).construct(
            use(BloqService.name)
        ),
        [LockersController.name]: object(LockersController).construct(
          use(LockerService.name)
        ),
        [RentsController.name]: object(RentsController).construct(
          use(RentService.name)
        ),
    });

    return container;
  }
}
