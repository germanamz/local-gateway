
const toJson = (data) => {
  console.log('body', data);
  if (typeof data === 'string') {
    return data;
  }
  return JSON.stringify(data);
};

const getEvent = req => ({
  "resource": req.originalUrl,
  "path": req.path,
  "httpMethod": req.method,
  "headers": req.headers,
  "multiValueHeaders": {},
  "queryStringParameters": req.query,
  "multiValueQueryStringParameters": null,
  "pathParameters": req.params,
  "stageVariables": null,
  "requestContext": {},
  "body": req.body && toJson(req.body),
  "isBase64Encoded": false
});

getEvent.default = getEvent;

module.exports = getEvent;
