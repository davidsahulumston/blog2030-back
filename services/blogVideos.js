const MongoLib = require('../lib/mongo');


class BlogVideosService {
    constructor() {
        this.collection = 'blogVideos';
        this.mongoDB = new MongoLib();
    }

    async getBlogVideos({tags}) {
        const query = tags && { tags: {$in:tags} }
        const blogVideos = await this.mongoDB.getAll(this.collection, query);
        return blogVideos || [];
    }

    async getBlogVideo({blogVideoId}) {
        const blogVideo = await this.mongoDB.get(this.collection, blogVideoId);
        return blogVideo || {};
    }

    async createBlogVideo({blogVideo}) {
        const createBlogVideoId = await this.mongoDB.create(this.collection, blogVideo);
        return createBlogVideoId || {};
    }

}

module.exports = BlogVideosService;