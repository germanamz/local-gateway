const express = require('express');
const http = require('http');

const config = require('./config');
const getEvent = require('./getEvent');

const {
  PORT = '3000',
} = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

for (let route of config.routes) {
  app[route.method.toLowerCase()](route.path, (req, res) => {
    const event = getEvent(req);
    const url = `http://${route.host}/2015-03-31/functions/function/invocations`;
    const lambdaReq = http.request(url, { method: 'POST', port: 8080 }, (lambdaRes) => {
      let data = Buffer.from([]);
      lambdaRes.on('data', chunk => data = Buffer.concat([data, chunk]));
      lambdaRes.on('end', () => {
        const {
          statusCode,
          headers,
          isBase64Encoded,
          multiValueHeader,
          body,
          ...lambdaResData
        } = JSON.parse(data.toString('utf8'));

        if (statusCode) {
          res.status(statusCode);
        }

        if (headers) {
          res.set(headers);
        }

        if (multiValueHeader) {
          res.set(multiValueHeader);
        }

        if (isBase64Encoded && body) {
          const bodyRes = Buffer.from(body, 'base64').toString('utf8');
          res.write(bodyRes);
          res.end();
          return;
        }

        res.write(body || (lambdaResData && JSON.stringify(lambdaResData)));
        res.end();
      });
    });
    lambdaReq.write(JSON.stringify(event));
    lambdaReq.end();
  });
}

app.listen(PORT);
