import { It, Mock, Times } from "moq.ts";
import { NextFunction, Request, Response } from 'express';
import ResourceNotFound from "../../2.0 - service/errors/resourceNotFound";
import InvalidOperationError from "../../2.0 - service/errors/invalidOperationError";
import ErrorHandler from "./errorHandler";

describe('ErrorHandler', () => {
    describe('Exec', () => {
        it('Unidentified error returns 500 status code', async () => {
            // Arrange
            const response = new Mock<Response>();
            const request = new Mock<Request>();
            const nextFunction = new Mock<NextFunction>();

            const responsejson = new Mock<Response<any, Record<string, any>>>().object();
            const responseStatus = new Mock<Response<any, Record<string, any>>>();

            response.setup(instance => instance.status(It.IsAny<number>()))
                .returns(responseStatus.object());

            responseStatus.setup(instance => instance.json(It.IsAny()))
                .returns(responsejson);

            // Act
            ErrorHandler(new Error("error_message"), request.object(), response.object(), nextFunction.object());

            // Assert
            response.verify(instance => instance.status(500), Times.Once());
            responseStatus.verify(instance => instance.json(It.Is<any>(elem => elem.message == "error_message")))
        });

        it('ResourceNotFound error returns 404 status code', async () => {
            // Arrange
            const response = new Mock<Response>();
            const request = new Mock<Request>();
            const nextFunction = new Mock<NextFunction>();

            const responsejson = new Mock<Response<any, Record<string, any>>>().object();
            const responseStatus = new Mock<Response<any, Record<string, any>>>();

            response.setup(instance => instance.status(It.IsAny<number>()))
                .returns(responseStatus.object());

            responseStatus.setup(instance => instance.json(It.IsAny()))
                .returns(responsejson);

            var error = new ResourceNotFound("error_message", "resouceId");

            // Act
            ErrorHandler(error, request.object(), response.object(), nextFunction.object());

            // Assert
            response.verify(instance => instance.status(404), Times.Once());
            responseStatus.verify(instance => instance.json(It.Is<any>(elem => elem.message == error.message)), Times.Once());
        });

        it('InvalidOperationError error returns 400 status code', async () => {
            // Arrange
            const response = new Mock<Response>();
            const request = new Mock<Request>();
            const nextFunction = new Mock<NextFunction>();

            const responsejson = new Mock<Response<any, Record<string, any>>>().object();
            const responseStatus = new Mock<Response<any, Record<string, any>>>();

            response.setup(instance => instance.status(It.IsAny<number>()))
                .returns(responseStatus.object());

            responseStatus.setup(instance => instance.json(It.IsAny()))
                .returns(responsejson);

            var error = new InvalidOperationError("resource_name", "error_message", "resouceId");

            // Act
            ErrorHandler(error, request.object(), response.object(), nextFunction.object());

            // Assert
            response.verify(instance => instance.status(400), Times.Once());
            responseStatus.verify(instance => instance.json(It.Is<any>(elem => elem.message == error.message)), Times.Once());
        });
    });
});