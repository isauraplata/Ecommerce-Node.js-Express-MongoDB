import Role from "../models/Role.js";
import User from "../models/User.js";
import jwt  from "jsonwebtoken";

const checkRole = () => {
    const authorize = async (req, res, next) => {
        try {
     
            const token = req.cookies.access_token;
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
            // Obtener el rol "admin" de la base de datos
            const adminRole = await Role.findOne({ name: "admin" });
            console.log("Imprimiendo id del role: " + adminRole._id)

            // Obtener el rol del usuario desde la solicitud
            const userRole = await User.findById(data.id)
            console.log("Imprimiendo el user: " + userRole.role)

            // Verificar si el usuario tiene el rol de "admin"
            if (userRole.role.toString() !== adminRole._id.toString()) {
                return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
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



// // authMiddleware.js
// export const authorize = (requiredPermission) => {
//     return (req, res, next) => {
//         const userRole = req.user.role;

//         // // Verificar si el usuario tiene el permiso requerido
//         // if (!userRole || !userRole.permissions.includes(requiredPermission)) {
//         //     return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
//         // }

//         if(userRole != "admin" ){
//             return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
//         }

//         next();
//     };
// };

