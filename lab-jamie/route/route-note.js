'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    debug('Post');
    let newNote;
    new Note(req.body.title, req.body.content)
      .then(note => newNote = note)
      .then(note => JSON.stringify(note))
      .then(json => storage.create('note', newNote._id, json))
      .then(() => res.status(201).json(newNote)) // 201: Created
      .catch(err => errorHandler(err, res));
  });
  router.get('/note/:_id', (req, res) => {
    debug('Get One');
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))  // 200: Success
      .catch(err => errorHandler(err, res));
  });
  
  router.get('/', (req,res) => {
    debug('Get All');
    storage.fetchAll('note')
      .then(paths => {
        console.log('paths', paths);
        return paths.map(p => p.split('.')[0])
          .then(item => res.status(200).json(item)) // 200: Success
          .catch(err => errorHandler(err, res));
      })
      .then(ids => {
        console.log('ids', ids);
        res.status(200).json(ids);
      })
      .catch(err => errorHandler(err, res));
  });
  
  router.put('/note/:_id', bodyParser, (req,res) => {
    debug('Put');
    storage.update(req.params._id, req.body);
    new Note(req.body.title, req.body.content)
      .then(note => storage.update('note', req.params._id, note))
      .then(item => res.status(204).json(item)) // 201: No Content
      .catch(err => errorHandler(err, res));
  });

  router.delete('/note/:_id', bodyParser, (req,res) => {
    debug('Delete');
    storage.destroy('note', req.params._id)
      .then(item => res.status(204).json(item))
      .then(() => res.sendStatus(204)) // 204: No Content
      .catch(err => errorHandler(err, res));
  });
};
