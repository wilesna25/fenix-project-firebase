const assert = require('chai').assert;
const { onRequest } = require('firebase-functions/v2/https');
const sinon = require('sinon');

// Mock firebase-functions/logger using Sinon
const mockLogger = {
  info: sinon.spy(),
  warn: sinon.spy(),
};

// Helper function to create mock request and response objects
const createMockContext = (method, body) => {
  const mockRequest = {
    method: method,
    body: body,
  };
  const mockResponse = {
    status: (code) => {
      mockResponse.statusCode = code;
      return mockResponse;
    },
    send: (data) => {
      mockResponse.sendData = data;
    },
    statusCode: 0,
    sendData: null,
  };
  return { mockRequest, mockResponse };
};

describe('testCandidateReport', () => {
  let testCandidateReport;

  beforeEach(async () => { // Added async here
    // Reset mocks
    mockLogger.info.resetHistory();
    mockLogger.warn.resetHistory();

    // Re-require the function
    const mod = require('../src/index'); // Adjust the path if needed
    testCandidateReport = mod.testCandidateReport;
  });

  it('should return a successful response with the correct report data', async () => {
    const { mockRequest, mockResponse } = createMockContext('GET', {});

    await testCandidateReport(mockRequest, mockResponse);

    assert.strictEqual(mockResponse.statusCode, 200);
    assert.isString(mockResponse.sendData);
    assert.include(mockResponse.sendData, 'Candidate report generated and logged successfully');

    // Basic check of logger
    assert(mockLogger.info.called);
  });
});
