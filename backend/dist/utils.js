"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.filter(permissionTheyHave => permissionsNeeded.includes(permissionTheyHave));
    if (!matchedPermissions.length) {
        throw new Error(`You do not have sufficient permissions

        : ${permissionsNeeded}

        You Have:

        ${user.permissions}
        `);
    }
}
exports.hasPermission = hasPermission;
;
function isEmail(email) {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(email);
}
exports.isEmail = isEmail;
;
//# sourceMappingURL=utils.js.map