function responseBuilder(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
}

export function success(body) {
  return responseBuilder(200, body);
}

export function failure(body) {
  return responseBuilder(500, body);
}
