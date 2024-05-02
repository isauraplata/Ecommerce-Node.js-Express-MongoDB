import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    const errorMessage = "[Error] Not authorized!";
    
    if (!token) {
      return res.status(403).json({ message: errorMessage });
    }
    
    try {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
      return next();
    } catch (err) {
      
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ message: "Token expired. Please log in again." });
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: "Invalid token. Please log in again." });
      }
      return res.status(403).json({ message: errorMessage });
    }
};

export default authorization;
