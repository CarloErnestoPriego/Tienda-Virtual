export const tieneRole = (...roles) => {

    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                msg: 'Se requiere verificar un role sin verificar el token primero'
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                success: false,
                msg: `Usuario no autorizado, posee un role ${req.usuario.role}, los roles autorizados son ${roles}`
            })
        }

        next();
    }
}