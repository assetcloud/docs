module.exports = {
    title: '云原生应用开发文档',
    description: '本文档提供资产云应用中心上架应用相关技术说明',

    themeConfig: {
        logo: './ocia.png',
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
            "/API explain/": ["", "one", "two","unicode"],
            "/Tools and resources/": ["", "one", "two"],
        }

        
    }
}