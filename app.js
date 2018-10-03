/* eslint no-console: ["error", { allow: ["error"] }] */
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').ModuleClient;
const axios = require('axios');
const debug = require('debug')('iot-edge-httpclient:app');

console.error = (message) => {
  throw new Error(message);
};

const onRequest = (req, res) => {
  debug('got request', req);
  axios(req.payload)
    .then((response) => {
      debug('got response', response);
      const resultMsg = {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      };

      res.send(response.status, resultMsg, (err) => {
        if (err) {
          debug(`failed sending method response: ${err}`);
        }
        debug('response sent.');
      });
    })
    .catch((axiosErr) => {
      debug(`request failed, response: ${axiosErr}`);
      res.send(999, { error: axiosErr }, (err) => {
        if (err) {
          debug(`failed sending method response: ${err}`);
        }
        debug('response sent.');
      });
      debug(`axios error: ${axiosErr}`);
    });
};

Client.fromEnvironment(Protocol, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  client.on('error', (onErr) => {
    console.error(onErr.message);
  });

  client.open((openErr) => {
    if (openErr) {
      console.error(err);
      return;
    }

    debug('Client connected');

    client.getTwin((errTwin, twin) => {
      if (errTwin) {
        console.error(err);
        return;
      }

      if (!twin) {
        console.error(err);
        return;
      }

      twin.on('properties.desired', (delta) => {
      });
    });

    client.onMethod('request', onRequest);
  });
});
