const Actions = require('./actions-model');

async function checkActionId(req, res, next)
{
    try
    {
        const possibleActions = await Actions.get(req.params.id);
        if (possibleActions)
        {
            req.actions = possibleActions;
            next();
        } else
        {
            next({ status: 404, message: `No Action ${req.params.id}` });
        }
    } catch (err)
    {
        next(err);
    }
}

function validateAction(req, res, next)
{
    if (!req.body.notes || !req.body.description) 
    {
        next({ status: 400, message: "Please provide the notes and description" });
    } else 
    {
        next();
    }
}

module.exports = {
    checkActionId,
    validateAction,
};
