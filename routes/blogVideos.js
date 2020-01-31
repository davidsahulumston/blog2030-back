const express = require('express');
const BlogVideosService = require('../services/blogVideos');
const multer = require('multer');




// const { blogVideosMock } = require('../utils/mocks/blogVideos');
const { 
    blogVideoIdSchema,
    crateBlogVideoSchema
 } = require('../utils/schema/blogVideos');
const validationHandlers = require('../utils/middleware/validationHandler');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({storage: storage});


function blogVideosApi(app) {
  const router = express.Router();
  app.use('/api/blogVideos', router);

  const blogVideoService = new BlogVideosService();

  router.get('/', async function(req, res, next) {
    const { tags } = req.query;
    try {
      const blogVideos = await blogVideoService.getBlogVideos({ tags });
      res.status(200).json({
        data: blogVideos,
        message: 'blog videos listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:blogVideoid', validationHandlers({blogVideoId:blogVideoIdSchema }), async function(req, res, next) {
    const { blogVideoId } = req.params;
    try {
      const blogVideo = await blogVideoService.getBlogVideos({ blogVideoId });

      res.status(200).json({
        data: blogVideo,
        message: 'Blog retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  // validationHandlers(crateBlogVideoSchema),
  router.post('/', upload.single('file'), async function(req, res, next) {
    const { body: blogVideo } = req;
    try {
      const createBlogVideoId = await blogVideoService.createBlogVideo({
        blogVideo,
       // finalImg,
        //file
      });
      res.status(200).json({
        data: createBlogVideoId,
        message: 'blog with videos created'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = blogVideosApi;
