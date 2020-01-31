const express = require('express');
const BlogImagesService = require('../services/blogImages');
const multer = require('multer');

// const { blogImagesMock } = require('../utils/mocks/blogImages');
const {
  blogImageIdSchema,
  createBlogImageSchema,
  updateMovieSchema
} = require('../utils/schema/blogImages');
const validationHandlers = require('../utils/middleware/validationHandler');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

function blogImagesApi(app) {
  const router = express.Router();
  app.use('/api/blogImages', router);

  const blogImageService = new BlogImagesService();

  router.get('/', async function(req, res, next) {
    const { tags } = req.query;
    try {
      const blogImages = await blogImageService.getBlogImages({ tags });
      res.status(200).json({
        data: blogImages,
        message: 'blog images listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:blogImageId',
    validationHandlers({ blogImageId: blogImageIdSchema }),
    async function(req, res, next) {
      const { blogImageId } = req.params;
      try {
        const blogImage = await blogImageService.getBlogImage({ blogImageId });

        res.status(200).json({
          data: blogImage,
          message: 'Blog retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // validationHandlers(createBlogImageSchema),
  router.post('/', upload.single('picture'), async function(req, res, next) {
    const { body: blogImage } = req;
    try {
      const createBlogImageId = await blogImageService.createBlogImage({
        blogImage
        // finalImg,
        //file
      });
      res.status(200).json({
        data: createBlogImageId,
        message: 'blog with images created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/usersVotes', async function(req, res, next) {
    const { body: blogImage } = req;
    try {
      const createUserVote = await blogImageService.createVote({
        blogImage
      });
      res.status(200).json({
        data: createUserVote,
        message: 'User vote'
      });
    } catch (err) {
      next(err);
    }
  });

  //,  validationHandlers(updateMovieSchema),
  router.put(
    '/:blogImageId',
    validationHandlers({ blogImageId: blogImageIdSchema }, 'params'),
    async function(req, res, next) {
      const { blogImageId } = req.params;
      let { body: blogImage } = req;
      try {
        let blogScore = await blogImageService.getBlogImage({ blogImageId });
        // let result = parseInt(blogScore.totalScore) + parseInt(blogImage);
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        blogScore.totalScore = blogScore.usersVotes
          .map(({ score }) => score)
          .reduce(reducer);

        console.log(
          blogScore.usersVotes.map(({ score }) => score).reduce(reducer)
        );

        blogImage.totalScore = blogScore.usersVotes
          .map(({ score }) => score)
          .reduce(reducer);

        console.log(blogScore);
        const updatedBlogImageId = await blogImageService.updateBlogImage({
          blogImageId,
          blogImage
        });

        // console.log(req.body);
        res.status(200).json({
          data: updatedBlogImageId,
          message: 'blog updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put('/:blogImageId/append/:attr', async function(req, res, next) {
    const update = req.body;
    const { attr, blogImageId } = req.params;
    try {
      let $push = {};
      $push[attr] = update;

      let query = {
        $push
      };

      const createUserVote = await blogImageService.userVote({
        blogImageId,
        query
      });

      res.status(200).json({
        data: createUserVote,
        message: 'user vote registered'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = blogImagesApi;
