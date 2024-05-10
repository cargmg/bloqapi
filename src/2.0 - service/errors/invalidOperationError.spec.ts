import InvalidOperationError from "./invalidOperationError";

describe('InvalidOperationError', () => {
  it('validate error message', async () => {
      // Act
      const resourceName = "ResourceName";
      const resourceId = "ResourceId";
      const message = "error message";
      const error = new InvalidOperationError(resourceName, resourceId, message);

      // Assert
      expect(error.message).toBe(`${resourceName} invalid operation. Id - ${resourceId}. Message: ${message}`);
  });
});