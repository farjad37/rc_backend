
const db = require('../_helpers/db');

module.exports = {
    create,
    
  };
async function create(params) 
{
    // validate
    if (await db.images.findOne({ where: { name: params.name } })) {
        throw 'Imagename "' + params.name + '" is already taken';
    }

   
    // save user
    await db.images.create(params);
    
}