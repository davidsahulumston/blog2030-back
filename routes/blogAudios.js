const express = require('express');
const BlogAudiosService = require('../services/blogAudios');
const multer = require('multer');

// const { blogAudiosMock } = require('../utils/mocks/blogAudios');
const {
  blogAudioIdSchema,
  crateBlogAudioSchema
} = require('../utils/schema/blogAudios');
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

function blogAudiosApi(app) {
  const router = express.Router();
  app.use('/api/blogAudios', router);

  const blogAudioService = new BlogAudiosService();

  router.get('/', async function(req, res, next) {
    const { tags } = req.query;
    try {
      const blogAudios = await blogAudioService.getBlogAudios({ tags });
      res.status(200).json({
        data: blogAudios,
        message: 'blog audios listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:blogAudioid',
    validationHandlers({ blogAudioId: blogAudioIdSchema }),
    async function(req, res, next) {
      const { blogAudioId } = req.params;
      try {
        const blogAudio = await blogAudioService.getBlogAudio({ blogAudioId });

        res.status(200).json({
          data: blogAudio,
          message: 'Blog retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // validationHandlers(crateBlogAudioSchema),
  router.post('/', upload.single('picture'), async function(req, res, next) {
    const { body: blogAudio } = req;
    try {
      const createBlogAudioId = await blogAudioService.createBlogAudio({
        blogAudio
        // finalImg,
        //file
      });
      res.status(200).json({
        data: createBlogAudioId,
        message: 'blog with audios created'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = blogAudiosApi;
