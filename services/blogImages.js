const MongoLib = require('../lib/mongo');


class BlogImagesService {
    constructor() {
        this.collection = 'blogImages';
        this.mongoDB = new MongoLib();
    }

    async getBlogImages({tags}) {
        const query = tags && { tags: {$in:tags} }
        const blogImages = await this.mongoDB.getAll(this.collection, query);
        return blogImages || [];
    }

    async getBlogImage({blogImageId}) {
        const blogImage = await this.mongoDB.get(this.collection, blogImageId);
        return blogImage || {};
    }

    async createBlogImage({blogImage}) {
        const createBlogImageId = await this.mongoDB.create(this.collection, blogImage);
        return createBlogImageId || {};
    }

    async updateBlogImage({ blogImageId, blogImage } = {}) {
        const updatedBlogImageId = await this.mongoDB.update(
          this.collection,
          blogImageId,
          blogImage
        );
        return updatedBlogImageId;
      }

    async userVote({ blogImageId, query}) {
        const createUserVote = await this.mongoDB.append(this.collection, blogImageId, query);
        this.collection,
        blogImageId,
        query
        return createUserVote || {};
    }
}

module.exports = BlogImagesService;