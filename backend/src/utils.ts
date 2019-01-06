export function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.filter(permissionTheyHave =>
        permissionsNeeded.includes(permissionTheyHave)
    );
    if (!matchedPermissions.length) {
        throw new Error(`You do not have sufficient permissions

        : ${permissionsNeeded}

        You Have:

        ${user.permissions}
        `);
    }
};

export function isEmail(email) {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(email);
};
