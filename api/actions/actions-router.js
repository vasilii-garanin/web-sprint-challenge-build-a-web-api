// Write your "actions" router here!
const express = require('express');

const {
    validateAction,
    checkActionId,
} = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();
router.get('/', (req, res, next) =>
{
    Actions.getAll()
        .then(actions =>
        {
            res.status(200).json(actions);
        })
        .catch(error =>
        {
            next(error);
        });
});

router.get('/:id', checkActionId, (req, res) =>
{
    res.json(req.actions);
});

module.exports = router;