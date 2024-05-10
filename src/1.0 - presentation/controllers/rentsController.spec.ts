import { It, Mock, Times } from "moq.ts";
import IRentService from "../../2.0 - service/rent_service";
import RentsController from "./rentsController";
import { NextFunction, Request, Response } from 'express';
import { Rent } from "../../2.0 - service/dtos/rent/rent";
import { RentSize } from "../../2.0 - service/dtos/rent/rentSize";
import { RentStatus } from "../../2.0 - service/dtos/rent/rentStatus";

describe('RentsController', () => {
    describe('getRentsAsync', () => {
        it('should call service getAllAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerId: string = "lockerId";
            const rentService = new Mock<IRentService>();
            rentService.setup(instance => instance.getAllAsync(bloqId, lockerId))
              .returnsAsync([]);

            const rentsController = new RentsController(rentService.object());

            const mockRequest = {
              params: {
                id: bloqId,
                lockerId: lockerId
              },
            } as unknown as Request;

            const response = new Mock<Response>();

            const responsejson = new Mock<Response<any, Record<string, any>>>().object();
            response.setup(instance => instance.json(It.IsAny()))
              .returns(responsejson);

            const nextFunction = new Mock<NextFunction>();

            // Act
            await rentsController.getRentsAsync(mockRequest, response.object(), nextFunction.object());

            // Assert
            response.verify(instance => instance.json(It.IsAny()), Times.Once());
        });
    });

    describe('createRentAsync', () => {
      it('should call service createRentAsync', async () => {
          // Arrange
          const bloqId: string = "bloqId";
          const lockerId: string = "lockerId";
          const rentService = new Mock<IRentService>();
          rentService.setup(instance => instance.createRentAsync(bloqId, It.IsAny<Rent>()))
            .returnsAsync(null as unknown as Rent);

          const rentsController = new RentsController(rentService.object());

          const mockRequest = {
            params: {
              id: "bloqId",
              lockerId: lockerId
            },
            body: {
              weight: 1,
              size: RentSize.L,
              status: RentStatus.DELIVERED,
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
          await rentsController.createRentAsync(mockRequest, response.object(), nextFunction.object());

          // Assert
          response.verify(instance => instance.status(201), Times.Once());
          rentService.verify(instance => instance.createRentAsync(bloqId, It.IsAny<Rent>()), Times.Once());
      });
    });

    describe('deleteRentAsync', () => {
      it('should call service deleteAsync', async () => {
          // Arrange
          const bloqId: string = "bloqId";
          const lockerId: string = "lockerId";
          const id: string = "id";

          const rent: Rent = {
            id: id,
            lockerId: lockerId,
            size: RentSize.L,
            status: RentStatus.CREATED,
            weight: 1
          };

          const rentService = new Mock<IRentService>();
          rentService.setup(instance => instance.deleteAsync(bloqId, lockerId, id))
            .returnsAsync(rent);

          const rentsController = new RentsController(rentService.object());

          const mockRequest = {
            params: {
              id: bloqId,
              lockerId: lockerId,
              rentId: id
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
          await rentsController.deleteRentAsync(mockRequest, response.object(), nextFunction.object());

          // Assert
          response.verify(instance => instance.status(200), Times.Once());
          rentService.verify(instance => instance.deleteAsync(bloqId, lockerId, id), Times.Once());
      });
  });

  describe('updateRentAsync', () => {
    it('should call service updateAsync', async () => {
        // Arrange
        const bloqId: string = "bloqId";
        const lockerId: string = "lockerId";
        const id: string = "id";

        const rent: Rent = {
          id: id,
          lockerId: lockerId,
          size: RentSize.L,
          status: RentStatus.CREATED,
          weight: 1
        };

        const rentService = new Mock<IRentService>();
        rentService.setup(instance => instance.updateAsync(bloqId, id, It.IsAny<Rent>()))
          .returnsAsync(rent);

        const rentsController = new RentsController(rentService.object());

        const mockRequest = {
          params: {
            id: bloqId,
            lockerId: lockerId,
            rentId: id
          },
          body: {
            weight: 1,
            size: RentSize.L,
            status: RentStatus.DELIVERED,
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
        await rentsController.updateRentAsync(mockRequest, response.object(), nextFunction.object());

        // Assert
        response.verify(instance => instance.status(200), Times.Once());
        rentService.verify(instance => 
          instance.updateAsync(bloqId, id, It.IsAny<Rent>()), Times.Once());
    });
  });
});