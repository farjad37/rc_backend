const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const nodemailer  = require('../configs/nodemailer.config');
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getUserverification
};

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'User with email address  "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params)
    .then(result => {
    db.verification.create({
        userId: result.id,
        token: Math.random().toString(36).slice(2)
      }).then((vresult) => {
        console.log(nodemailer.sendConfirmationEmail(result.email, vresult.token), "okkkk")
      }).catch((error) => {
        throw error;
      }) 
        //return res.status(200).json(`${user.email} account created successfully`);
      
    }).catch((error) => {
        throw error;
      });
    
    
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

async function getUserverification() {
    const user = await db.User.findOne({
        order: [ [ 'id', 'DESC' ]],
    });
   await db.verification.create({
        userId: user.id,
        token: Math.random().toString(36).slice(2)
      })
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}