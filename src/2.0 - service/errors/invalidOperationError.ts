export default class InvalidOperationError extends Error {
  constructor(resourceName: string, resourceId: string, message: string) {
    super(`${resourceName} invalid operation. Id - ${resourceId}. Message: ${message}`);
    this.name = 'InvalidOperationError';
  }
}