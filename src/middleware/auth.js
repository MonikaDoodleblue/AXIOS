const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            req.admin = decoded;
            next();
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const generateToken = (admin) => {
    const token = jwt.sign({ name: admin.name, email: admin.email, password: admin.password }, process.env.JWT_SECRET, { expiresIn: '2m' });
    return { token };
};

module.exports = {
    auth,
    generateToken
};

//const expirationTime = new Date(Date.now() + 60000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });