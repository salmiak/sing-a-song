const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const mediaService = require('./media.service');

// routes
router.get('/', getAll);
router.post('/', authorize(), createSchema, create);
router.delete('/:id', authorize(), _delete);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function getAll(req, res, next) {
    mediaService.getAll()
        .then(media => res.json(media))
        .catch(next);
}

function getById(req, res, next) {
    mediaService.getById(req.params.id)
        .then(media => media ? res.json(media) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().required(),
        url: Joi.string().required(),
        value: Joi.string().required(),
        provider: Joi.string().required(),
        profileId: Joi.number().empty('')
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
   mediaService.create(req.body, req.get('origin'))
        .then(media => res.json(media))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().required(),
        value: Joi.string().required(),
        description: Joi.string().empty(''),
        userId: Joi.number().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    if (Number(req.body.userId) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    mediaService.update(req.params.id, req.body)
        .then(media => res.json(media))
        .catch(next);
}

function _delete(req, res, next) {
  mediaService.delete(req.params.id)
  res.json({ message: 'deleted' });
}
