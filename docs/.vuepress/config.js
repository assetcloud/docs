module.exports = {
    title: '资产云文档',
    description: 'a doc',

    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '快速上手', link: '/Ues/' },
            { text: '开发指南', link: '/guide/' },
            { text: 'API说明', link: '/API explain/' },
            { text: '工具与资源', link: '/Tools and resources/' },
        ],
        sidebar: {
            "/Ues/": ["", "one", "two", "three", "four", "five"],
            "/guide/": ["", "one", "two", "three"],
            "/API explain/": ["", "one", "two"],
            "/Tools and resources/": ["", "one", "two"],
        }
    }
}