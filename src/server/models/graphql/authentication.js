const authenticateFn = fn =>
    (root, args, context, info) => {
        if (!context.user) {
            throw new Error('User is not logged in (or authenticated).');
        }

        return fn(root, args, context, info);
    }

module.exports = authenticateFn;