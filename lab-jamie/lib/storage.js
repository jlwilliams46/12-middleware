'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:server');
const basePath = `${__dirname}/../../data`;
const storage = module.exports = {};

storage.create = (schema, item) => {
  debug('Something was created');

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${basePath}/${schema}/${id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
  debug('Something was fetched');
  fs.readFileProm(`${basePath}/${schema}/${id}.json`)

};

storage.fetchAll = (schema) => {
  debug('Everything was fetched');
  return fs.readdirProm(`${basePath}/${schema}`)
};

storage.update = (schema, itemId, item) => {
  debug('Something was updated');
  return fs.writeFileProm(`${basePath}/${schema}/${id}.json`, json);
};

storage.destroy = (schema, itemId) => {
  debug('Something was destroyed');
  return fs.unlinkProm(`${__dirname}/../${basePath}/${schema}/${itemId}.json`);
};
