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

router.post('/', validateAction, (req, res, next) =>
{
    Actions.insert(req.body)
        .then(action =>
        {
            res.status(201).json(action);
        })
        .catch(error =>
        {
            next(error);
        });
});

router.put('/:id', validateAction, checkActionId, (req, res, next) =>
{
    Actions.update(req.params.id, req.body)
        .then(action =>
        {
            res.status(200).json(action);
        })
        .catch(error =>
        {
            next(error);
        });
});

router.delete('/:id', checkActionId, (req, res, next) =>
{
    Actions.remove(req.params.id)
        .then(() =>
        {
            res.status(200).json({ message: 'The project has been nuked' });
        })
        .catch(error =>
        {
            next(error);
        });
});

router.get('/:id/actions', checkActionId, (req, res, next) =>
{
    Actions.getProjectActions(req.project.id)
        .then(actions => 
        {
            res.status(200).json(actions);
        })
        .catch(next);
});

module.exports = router;