import { It, Mock, Times } from "moq.ts";
import IBloqService from "../../2.0 - service/bloq_service";
import BloqsController from "./bloqsController";
import { NextFunction, Request, Response } from 'express';
import ResourceNotFound from "../../2.0 - service/errors/resourceNotFound";
import { Bloq } from "../../2.0 - service/dtos/bloq/bloq";

describe('BloqsController', () => {
    describe('getBloqsAsync', () => {
        it('should call service getAllAsync', async () => {
            // Arrange
            const bloqService = new Mock<IBloqService>();
            bloqService.setup(instance => instance.getAllAsync())
              .returnsAsync([]);

            const bloqsController = new BloqsController(bloqService.object());

            const request = new Mock<Request>();
            const response = new Mock<Response>();
            const nextFunction = new Mock<NextFunction>();

            const responsejson = new Mock<Response<any, Record<string, any>>>().object();
            response.setup(instance => instance.json(It.IsAny()))
              .returns(responsejson);

            // Act
            await bloqsController.getBloqsAsync(request.object(), response.object(), nextFunction.object());

            // Assert
            response.verify(instance => instance.json(It.IsAny()), Times.Once());
        });
    });

    describe('createBloqAsync', () => {
      it('should call service createBloqAsync', async () => {
          // Arrange
          const bloqService = new Mock<IBloqService>();
          bloqService.setup(instance => instance.createBloqAsync(It.IsAny<Bloq>()))
            .returnsAsync(null as unknown as Bloq);

          const bloqsController = new BloqsController(bloqService.object());

          const mockRequest = {
            body: {
              title: "title",
              address: "address",
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
          await bloqsController.createBloqAsync(mockRequest, response.object(), nextFunction.object());

          // Assert
          response.verify(instance => instance.status(201), Times.Once());
        bloqService.verify(instance => instance.createBloqAsync(It.IsAny<Bloq>()), Times.Once());
      });
    });

    describe('deleteBloqAsync', () => {
      it('should call service deleteAsync', async () => {
          // Arrange
          const id: string = "id";
          const bloqService = new Mock<IBloqService>();

          const bloq: Bloq = {
            id: "id",
            address: "address",
            title: "title"
          }

          bloqService.setup(instance => instance.deleteAsync(id))
            .returnsAsync(bloq);

          const bloqsController = new BloqsController(bloqService.object());

          const mockRequest = {
            params: {
              id: id,
            },
          } as unknown as Request;

          const response = new Mock<Response>();
          const responsejson = new Mock<Response<any, Record<string, any>>>();

          response.setup(instance => instance.status(It.IsAny<number>()))
            .returns(responsejson.object());

          responsejson.setup(instance => instance.json())
            .returns(new Mock<Response<any, Record<string, any>>>().object());

          const nextFunction = new Mock<NextFunction>();

          // Act
          await bloqsController.deleteBloqAsync(mockRequest, response.object(), nextFunction.object());

          // Assert
          response.verify(instance => instance.status(200), Times.Once());
          bloqService.verify(instance => instance.deleteAsync(id), Times.Once());
      });
  });

  describe('updateBloqAsync', () => {
    it('should call service updateAsync', async () => {
        // Arrange
        const id: string = "id";
        const bloqService = new Mock<IBloqService>();
        const bloq: Bloq = {
          id: "id",
          address: "address",
          title: "title"
        }

        bloqService.setup(instance => instance.updateAsync(id, It.IsAny<Bloq>()))
          .returnsAsync(bloq);

        const bloqsController = new BloqsController(bloqService.object());

        const mockRequest = {
          body: {
            title: "new_title",
            address: "new_address",
          },
          params: {
            id: id,
          },
        } as unknown as Request;

        const response = new Mock<Response>();
        const responsejson = new Mock<Response<any, Record<string, any>>>();

        response.setup(instance => instance.status(It.IsAny<number>()))
          .returns(responsejson.object());

        responsejson.setup(instance => instance.json())
            .returns(new Mock<Response<any, Record<string, any>>>().object());

        const nextFunction = new Mock<NextFunction>();

        // Act
        await bloqsController.updateBloqAsync(mockRequest, response.object(), nextFunction.object());

        // Assert
        response.verify(instance => instance.status(200), Times.Once());
        bloqService.verify(instance => instance.updateAsync(id, It.IsAny<Bloq>()), Times.Once());
    });
  });
});