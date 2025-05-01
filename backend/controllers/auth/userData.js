const User = require('../../models/User.model');

const userData = async(req, res, next) =>{
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        console.error(error);
    }
}

module.exports = userData;