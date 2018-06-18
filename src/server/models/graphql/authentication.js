class Authenticate {
    constructor() {
        this.isLogged = this.isLogged.bind(this);
        this.hasRole = this.hasRole.bind(this);
    }

    isLogged(fn) {
        return (root, args, context, info) => {
            if (!context.user) {
                throw new Error('User is not logged in (or authenticated).');
            }
    
            return fn(root, args, context, info);
        }
    }

    hasRole(roleName, fn) {
        return (root, args, context, info) => {
            const hasRole = !!this.isLogged(fn) && context.user.roles.some(role => role.role.toLowerCase() === roleName.toLowerCase());
            if (!hasRole) {
                throw new Error('User is not authorized for this.');
            }
    
            return fn(root, args, context, info);
        }
    }
}
    

module.exports = new Authenticate();