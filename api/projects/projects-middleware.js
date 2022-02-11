const Project = require('./projects-model');

async function checkProjectId(req, res, next)
{
    try
    {
        const possibleProject = await Project.get(req.params.id);
        if (possibleProject)
        {
            req.project = possibleProject;
            next();
        } else
        {
            next({ status: 404, message: `No Project ${req.params.id}` });
        }
    } catch (err)
    {
        next(err);
    }
}

function validateProject(req, res, next)
{
    if (!req.body.name || !req.body.description || req.body.completed == null)
    {
        next({ status: 400, message: "Please provide a name, description or completed " });
    } else{
        next();
    }
}

module.exports = {
    checkProjectId,
    validateProject
};
