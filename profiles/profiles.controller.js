﻿const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const profileService = require('./profile.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

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

function updateSchema(req, res, next) {
    const schemaRules = {
        stageName: Joi.string().empty('').optional(),
        description: Joi.string().allow(null, ''),
        contactDetails: Joi.string().allow(null, ''),
        geoReach: Joi.any().empty('').optional(),
        userId: Joi.number().empty(''),
        avatarURL: Joi.string().optional().allow(null, ''),
        coverURL: Joi.string().optional().allow(null, '')
    };

    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    if (Number(req.body.userId) !== req.user.id) {
        return res.status(401).json({ message: 'Ej behörig' });
    }

    console.log(req.body) // eslint-disable-line no-console

    profileService.update(req.params.id, req.body)
        .then(profile => res.json(profile))
        .catch(next);
}
