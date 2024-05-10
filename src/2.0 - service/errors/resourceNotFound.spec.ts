import ResourceNotFound from "./resourceNotFound";

describe('ResourceNotFound', () => {
  it('validate error message', async () => {
      // Act
      const resourceName = "ResourceName";
      const resourceId = "ResourceId";
      const error = new ResourceNotFound(resourceName, resourceId);

      // Assert
      expect(error.message).toBe(`${resourceName} not found. Id - ${resourceId}`);
  });
});