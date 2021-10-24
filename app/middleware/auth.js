const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token =
        req.query.token || req.headers["x-access-token"]; // Думаю что лучше хранить токен в бд, но реализую его просмотр и в заголовке

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
		// Ещё можно использовать какой-нибудь argon2 или что-то в этом роде, чтобы 
		// хоть как-то защитить это всё
        const decoded = jwt.verify(token, 'mySecret');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;