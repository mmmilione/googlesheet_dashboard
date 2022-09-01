const post = async (url, vars) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vars),
        cache: "no-cache"
    }
    const res = await fetch(url, options);
    return res;
}

const del = async (vars) => {

    const url = "./api/deleteUser"
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vars),
        cache: "no-cache"
    }
    const res = await fetch(url, options);
    return res;
}

export { post, del };