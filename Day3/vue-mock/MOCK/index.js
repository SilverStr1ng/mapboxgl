const mockjs = require('mockjs');
const { Random } = mockjs;

module.exports = () => {
    return mockjs.mock({
        "user|10": [{
            "id|+1": 1001,
            "name": () => Random.last(),
            "password": () => Random.integer(100000, 999999),
            "type|1": ["admin", "traffic", "common"],
            "isOnline|1": true,
        }],
        "admin|100": [{
            "id|+1": 1001,
            "name": () => Random.last(),
            "info": "@paragraph()",
            "age|+1": 20,
        }]
    })
}
