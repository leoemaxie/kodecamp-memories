export default function authMiddleware(req, res, next) {
	const [ username, password ] = req.headers.authorization || "";

	if (username == "admin" && password == "password") {
		next();
	}

	res.set("WWW-Authenticate", "Basic realm=Access to unathorized page");
	return res.status(401).json({error: "Unathorized"});
}
