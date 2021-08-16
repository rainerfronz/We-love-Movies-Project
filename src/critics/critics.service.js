const { whereExists } = require('../db/connection');
const knex = require('../db/connection');

function list() {
    return knex('critics')
    .select('*')
};

function read(critic_id) {
    return knex('critics')
    .select('*')
    .whereExists({critic_id});
};


module.exports = {
    list, 
    read,
}
