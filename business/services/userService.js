const User = require('../../data/user');

exports.getAll = async () => {
    const user = await User.fetchAll();
    return user[0]; //retorna un array con los rows y la metadata
}

exports.getById = async (id) => {
    const user = await User.findById(id);
    return user[0];
}

exports.getByEmail = async (email) => {
    const user = await User.findByEmail(email);
    return user[0];
}

exports.save =  async (email, password, name) => {
    const user = new User(null, email, password, name);
    await user.save();
}