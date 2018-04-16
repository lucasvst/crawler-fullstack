const express = require('express');
const router = express.Router();

var TokenVerifier = require(__root + 'modules/auth/token-verifier');

const Model = require('./model');

router.get('/', /* TokenVerifier, */ function(req, res) {

    const params = {};
    const search = req.query.search;

    if (search) {
        const conditions = params.$or = [];
        conditions.push({ origin: { $regex: search, $options: 'i' }});
        conditions.push({ category: { $regex: search, $options: 'i' }});
        conditions.push({ title: { $regex: search, $options: 'i' }});
        conditions.push({ excerpt: { $regex: search, $options: 'i' }});
    }

    const query = Model
        .find(params)
        .limit(100);

    query.exec(function(err, data) {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});

router.get('/:id', TokenVerifier, function(req, res) {

    const query = { _id: req.params.id };

    Model.findOne(query, function(err, data) {
        if (err || data == null) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    });
});

router.post('/', TokenVerifier, function(req, res) {

    const _body = req.body;
    const models = [];

    if (Array.isArray(_body)) {
        models.push(..._body.map(_op => new Model(_op)));
    } else {
        models.push(new Model(_body));
    }

    models.map(op => {

        const query = { checksum: op.checksum };
        Model.findOne(query, function(err, data) {

            if (err) {
                console.warning(err)
                return;
            }

            if (data == null) {
                op.save((err, data) => {
                    if (err) { console.log(err); }
                })
            }
        });
    });

    res.status(201).json(models);
});

router.put('/:id', TokenVerifier, function(req, res) {

    const query = { _id: req.params.id };
    const mod = req.body;
    delete mod._id;

    Model.update(query, mod, function(err, data) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(data);
        }
    });
});

router.delete('/:id', TokenVerifier, function(req, res) {

    const query = { _id: req.params.id };

    Model.remove(query, function(err, data) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;