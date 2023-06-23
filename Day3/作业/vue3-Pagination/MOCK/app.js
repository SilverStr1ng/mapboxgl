const mockjs = require("mockjs");
const { Random } = require("mockjs")
module.exports = () => {
    return mockjs.mock({
        "songlist|300": [
            {
                "id|+1": 1,
                "playbackVolume": () => Random.natural(0, 9999),
                "singularTitle": () => Random.ctitle(2, 10),
                "singer": () => Random.cname(),
                "pic": Random.image("200x200", Random.color())
            }
        ]
    })
}
