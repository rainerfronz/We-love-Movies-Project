const service = require("./critics.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");


//middleware 
async function criticExists(req, res, next) { 
    const {critic_id} = req.params; 
    const foundCritic = await service.read(critic_id);
    
    if(foundCritic.length > 0) {
        res.locals.critic = foundCritic;
        next();
    } else {
        next({
            status: 404,
            message: `No critic found with id: ${critic_id}`
        });
    }
};

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
};

async function read(req, res) {
    res.json({ data: res.locals.critic });  
};

module.exports = {
    list: asyncErrorBoundary(list),
    read: [criticExists, asyncErrorBoundary(read)],
}