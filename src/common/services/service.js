const service = {}

service.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

service.getMeta = async () => {
    const res = await fetch(`entityMeta.json`, service.headers);
    const result = await res.json();
    const userFields = [];
    for (let field of result.field) {
        if (!field.system) {
            field.value = '';
            userFields.push(field);
        }

    }
    const returnObj = {};
    returnObj.name = result.name;
    returnObj.label = result.label;
    returnObj.userFields = userFields;
    return returnObj;
}

service.getData = async () => {
    const res = await fetch(`entityData.json`, service.headers);
    const result = await res.json();
    return result;
}

service.generateInstanceLabel = (len = 20, arr = "123456abcedefghi") => {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}

service.store = (key, value, dict) => {
    const dictionaryStr = localStorage.getItem(dict);
    let dictionary;
    const setting = {};

    setting[key] = value;
    if (dictionaryStr === null) {
        localStorage.setItem(dict, JSON.stringify(setting));
    } else {
        dictionary = JSON.parse(dictionaryStr);
        dictionary[key] = value;
        localStorage.setItem(dict, JSON.stringify(dictionary));
    }
}


export default service;