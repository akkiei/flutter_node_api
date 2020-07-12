const bcrypt = require('bcrypt');

 getHashed = async (password) => {
	const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    return hashedPwd;
};

module.exports = getHashed;
