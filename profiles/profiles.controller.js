const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const profileService = require('./profile.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

function getAll(req, res, next) {
    profileService.getAll()
        .then(profiles => res.json(profiles))
        .catch(next);
}

function getById(req, res, next) {
    profileService.getById(req.params.id)
        .then(profile => profile ? res.json(profile) : res.sendStatus(404))
        .catch(next);
}
