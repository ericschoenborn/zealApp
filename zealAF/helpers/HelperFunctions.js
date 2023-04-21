export const setPassword = (base, val, update) => {
    if (val.length > 0) {
        const newPass = `${base}${val.slice(-1)}`;
        const newMask = `${val.slice(0, -1)}*`;
        update({ password: newPass, passwordMask: newMask })
    } else {
        update({ password: "", passwordMask: "" })
    }
}
export const setConfirm = (base, val, update) => {
    if (val.length > 0) {
        const newPass = `${base}${val.slice(-1)}`;
        const newMask = `${val.slice(0, -1)}*`;
        update({ confirm: newPass, confirmMask: newMask })
    } else {
        update({ confirm: "", confirmMask: "" })
    }
}