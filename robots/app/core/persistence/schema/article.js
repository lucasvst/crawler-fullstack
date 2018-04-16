class Article {

    constructor(rawData) {

        this.date = rawData.date;
        this.origin = rawData.origin;
        this.category = rawData.category;
        this.title = rawData.title;
        this.excerpt = rawData.excerpt;
        this.url = rawData.url;
    }
}

module.exports = Article;