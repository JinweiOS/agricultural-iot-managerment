import { User } from '../database/entity/user-entity';
const { getOrm } = require('../loader/index');


async function valid(username, password) {
    const user = await getOrm().getRepository(User).findOne({ username: username });
    console.log(user);
    if (user && user.password === password) {
        return true;
    }
    return false;
}

module.exports = {
    valid
};
