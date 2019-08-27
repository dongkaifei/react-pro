module.exports = {
    plugins: {
        "autoprefixer": {},
        "postcss-pxtorem": {
            "rootValue": 100,  // 375的2倍图750px
            "propList": ["*"],
            "selectorBlackList": ["van"]
        }
    }
}
