import { RESTDataSource } from 'apollo-datasource-rest';

export class TrefleAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://trefle.io/api/v1/'
  }

  willSendRequest(request) {
    request.params.set('token', this.context.token);
  }

  async getPlants() {
    const response = await this.get('plants');
    return response.data;
  }
}