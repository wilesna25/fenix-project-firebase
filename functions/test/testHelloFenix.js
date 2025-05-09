const assert = require('assert');
const { helloFenix } = require('../src/index'); // Adjust the path to your function

// Mock the onRequest and response objects
const mockRequest = (method = 'GET', body = {}) => ({
  method,
  body,
});

const mockResponse = {
  send: (data) => {
    mockResponse.body = data;
  },
  status: (code) => {
    mockResponse.statusCode = code;
    return mockResponse; // For chaining
  },
  statusCode: 0,
  body: '',
};

describe('helloFenix (POST with body parameter)', () => {
  beforeEach(() => {
    mockResponse.statusCode = 0;
    mockResponse.body = '';
  });

    it('should respond with a personalized message when POST request has "message" in the body', () => {
        const req = mockRequest('POST', { message: 'HAPPY SHOWCASE FÉNIX!' });
        helloFenix(req, mockResponse);
        assert.strictEqual(mockResponse.statusCode, 200);
        assert.strictEqual(mockResponse.body, 'Fénix says: HAPPY SHOWCASE FÉNIX!');
    });

    it('should respond 405 when GET requests', () => {
        const reqGet = mockRequest('GET');
        helloFenix(reqGet, mockResponse);
        assert.strictEqual(mockResponse.statusCode, 405);
    });

    it('should respond 405 when PUT requests', () => {
    const reqPut = mockRequest('PUT', { message: 'Trying PUT' });
    helloFenix(reqPut, mockResponse);
    assert.strictEqual(mockResponse.statusCode, 405);
  });
});