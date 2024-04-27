import jwt  from "jsonwebtoken";

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403).json({ message: " [Error] Not authorized!" });
    }
    try {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
      //req.userId = data.id;
      return next();
    } catch {
      return res.sendStatus(403).json({ message: " [Error] Not authorized!" });
    }
};

export default authorization;