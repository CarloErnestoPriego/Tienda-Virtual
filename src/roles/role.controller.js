import Role from './role.model.js';

export const postRoles = async () => {
    try {
        const adminRole = await Role.findOne({ role: 'ADMIN_ROLE' });   //Busca si existe el rol
        const clientRole = await Role.findOne({ role: 'CLIENT_ROLE' });

        if (!adminRole) {
            await Role.create({ role: 'ADMIN_ROLE' });
            console.log('Role de administrador agregado');
        }

        if (!clientRole) {
            await Role.create({ role: 'CLIENT_ROLE' });
            console.log('Role de cliente agregado');
        }

    } catch (error) {
        console.error('Error adding default roles:', error);
    }
};