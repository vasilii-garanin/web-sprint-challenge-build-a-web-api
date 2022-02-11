const express = require('express');

const {
    validateProject,
    checkProjectId,
} = require('./projects-middleware');

const Projects = require('./projects-model.js');

const router = express.Router();
router.get('/', (req, res, next) =>
{
    Projects.getAll()
        .then(projects =>
        {
            res.status(200).json(projects);
        })
        .catch(error =>
        {
            next(error);
        });
});

router.get('/:id', checkProjectId, (req, res) =>
{
    res.json(req.project);
});

router.post('/', validateProject, (req, res, next) =>
{
    Projects.insert(req.body)
        .then(projects =>
        {
            res.status(201).json(projects);
        })
        .catch(next);
});

router.put('/:id', checkProjectId, validateProject, (req, res, next) =>
{
    Projects.update(req.params.id, req.body)
        .then(project =>
        {
            res.status(200).json(project);
        })
        .catch(error =>
        {
            next(error);
        });
});

module.exports = router;