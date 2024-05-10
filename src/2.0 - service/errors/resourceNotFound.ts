export default class ResourceNotFound extends Error {
  constructor(resourceName: string, resourceId: string) {
    super(`${resourceName} not found. Id - ${resourceId}`);
    this.name = 'ResourceNotFound';
  }
}