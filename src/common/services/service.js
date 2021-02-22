const service = {}

service.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

service.getMeta = async () => {
    const res = await fetch(`entityMeta.json`, service.headers);
    const result = await res.json();
    let userFields = [];
    for (let field of result.field) {
        if (!field.system)
            userFields.push(field);
    }
    return userFields;
}

service.getData = async () => {
    const res = await fetch(`entityData.json`, service.headers);
    const result = await res.json();
    return result;
}

export default service;