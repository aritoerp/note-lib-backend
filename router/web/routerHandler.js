module.exports = { 
    health: require("./implement/health.js"),
    login: require("./implement/login.js"),
    categories: require("./implement/categories.js"),
    getBooksByCategory: require("./implement/getBooksByCategory.js"),
    featured : require("./implement/featured.js"),
    recent: require("./implement/recent.js"),
    popular: require("./implement/popular.js"),
    downloadPdf: require("./implement/downloadPdf.js")
}