import Role from "../models/Role.js";
import User from "../models/User.js";
import jwt  from "jsonwebtoken";

const checkRole = () => {
    const authorize = async (req, res, next) => {
        try {
     
            const token = req.cookies.access_token;
            
            if (!token) {
                return res.status(401).json({ message: "Unauthorized. Missing access token." });
            }

            const data = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
            // Obtener el rol "admin" de la base de datos
            const adminRole = await Role.findOne({ name: "admin" });
            
            // Obtener el rol del usuario desde la solicitud
            const userRole = await User.findById(data.id)

            // Verificar si el usuario tiene el rol de "admin"
            if (userRole.role.toString() !== adminRole._id.toString()) {
                return res.status(403).json({ message: "[Error] Not authorized!" });
            }

            // Si el usuario tiene el rol de "admin", permitir el acceso
            next();
        } catch (error) {
            // Manejar cualquier error
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };
    
    return authorize;
};

export default checkRole;
