require('dotenv').config();

class MarvelApiClient {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://marvelrivalsapi.com/api/v1';
    this.defaultHeaders = {
      'x-api-key': process.env.MARVEL_API_KEY,
      'Content-Type': 'application/json'
    };
  }

  async get(endpoint) {
    return await this.request.get(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders
    });
  }

}

module.exports = { MarvelApiClient };