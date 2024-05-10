import { It, Mock, Times } from "moq.ts";
import ILockerService from "../../2.0 - service/locker_service";
import LockersController from "./lockersController";
import { NextFunction, Request, Response } from 'express';
import { Locker } from "../../2.0 - service/dtos/locker/locker";
import { LockerStatus } from "../../2.0 - service/dtos/locker/lockerStatus";

describe('LockersController', () => {
    describe('getLockersAsync', () => {
        it('should call service getAllAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerService = new Mock<ILockerService>();
            lockerService.setup(instance => instance.getAllAsync(bloqId))
              .returnsAsync([]);

            const lockerController = new LockersController(lockerService.object());

            const mockRequest = {
              params: {
                id: bloqId
              },
            } as unknown as Request;

            const response = new Mock<Response>();

            const responsejson = new Mock<Response<any, Record<string, any>>>().object();
            response.setup(instance => instance.json(It.IsAny()))
              .returns(responsejson);

            const nextFunction = new Mock<NextFunction>();

            // Act
            await lockerController.getLockersAsync(mockRequest, response.object(), nextFunction.object());

            // Assert
            response.verify(instance => instance.json(It.IsAny()), Times.Once());
        });
    });

    describe('createLockerAsync', () => {
      it('should call service createLockerAsync', async () => {
          // Arrange
          const lockerService = new Mock<ILockerService>();
          lockerService.setup(instance => instance.createLockerAsync(It.IsAny<Locker>()))
            .returnsAsync(null as unknown as Locker);

          const lockerController = new LockersController(lockerService.object());

          const mockRequest = {
            params: {
              id: "bloqId"
            },
            body: {
              isOccupied: false,
              status: LockerStatus.CLOSED,
            },
          } as unknown as Request;
  
          const response = new Mock<Response>();
          const responsejson = new Mock<Response<any, Record<string, any>>>();

          responsejson.setup(instance => instance.json())
            .returns(new Mock<Response<any, Record<string, any>>>().object());
  
          response.setup(instance => instance.status(It.IsAny<number>()))
            .returns(responsejson.object());

          const nextFunction = new Mock<NextFunction>();

          // Act
          await lockerController.createLockerAsync(mockRequest, response.object(), nextFunction.object());

          // Assert
          response.verify(instance => instance.status(201), Times.Once());
          lockerService.verify(instance => instance.createLockerAsync(It.IsAny<Locker>()), Times.Once());
      });
    });

    describe('deleteLockerAsync', () => {
      it('should call service deleteAsync', async () => {
          // Arrange
          const bloqId: string = "bloqId";
          const id: string = "id";
          const lockerService = new Mock<ILockerService>();

          const locker: Locker = {
            id: "id",
            bloqId: "bloqId",
            isOccupied: false,
            status: LockerStatus.CLOSED
          }

          lockerService.setup(instance => instance.deleteAsync(bloqId, id))
            .returnsAsync(locker);

          const lockerController = new LockersController(lockerService.object());

          const mockRequest = {
            params: {
              id: bloqId,
              lockerId: id
            },
          } as unknown as Request;

          const response = new Mock<Response>();
          const responsejson = new Mock<Response<any, Record<string, any>>>();

          responsejson.setup(instance => instance.json())
            .returns(new Mock<Response<any, Record<string, any>>>().object());

          response.setup(instance => instance.status(It.IsAny<number>()))
            .returns(responsejson.object());

          const nextFunction = new Mock<NextFunction>();

          // Act
          await lockerController.deleteLockerAsync(mockRequest, response.object(), nextFunction.object());

          // Assert
          response.verify(instance => instance.status(200), Times.Once());
          lockerService.verify(instance => instance.deleteAsync(bloqId, id), Times.Once());
      });
  });

  describe('updateLockerAsync', () => {
    it('should call service updateAsync', async () => {
        // Arrange
        const bloqId: string = "bloqId";
        const id: string = "id";
        const lockerService = new Mock<ILockerService>();

        const locker: Locker = {
          id: "id",
          bloqId: "bloqId",
          isOccupied: false,
          status: LockerStatus.CLOSED
        }

        lockerService.setup(instance => instance.updateAsync(id, It.IsAny<Locker>()))
          .returnsAsync(locker);

        const lockerController = new LockersController(lockerService.object());

        const mockRequest = {
          params: {
            id: bloqId,
            lockerId: id,
          },
          body: {
            isOccupied: false,
            status: LockerStatus.CLOSED,
          },
        } as unknown as Request;

        const response = new Mock<Response>();
        const responsejson = new Mock<Response<any, Record<string, any>>>();

        responsejson.setup(instance => instance.json())
            .returns(new Mock<Response<any, Record<string, any>>>().object());

        response.setup(instance => instance.status(It.IsAny<number>()))
          .returns(responsejson.object());

        const nextFunction = new Mock<NextFunction>();

        // Act
        await lockerController.updateLockerAsync(mockRequest, response.object(), nextFunction.object());

        // Assert
        response.verify(instance => instance.status(200), Times.Once());
        lockerService.verify(instance => 
          instance.updateAsync(id, It.Is<Locker>(x => x.isOccupied == false && x.status == LockerStatus.CLOSED)), Times.Once());
    });
  });
});