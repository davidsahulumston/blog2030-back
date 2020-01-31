const joi = require('@hapi/joi');

const blogVideoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const blogVideoMonthIdeaSchema =  joi.boolean();
const blogVideoNameIdeaSchema = joi.string();
const blogVideoDescriptionIdeaSchema = joi.string().max(300);
const blogVideoTagsIdeaSchema = joi.array().items(joi.string());
const blogVideoTimeStampSchema =  joi.date().default(new Date().getTime());
const blogVideoArrayVideosSchema = joi.array().items(joi.string()).max(3);
const blogVideoUserSchemaItems = joi.object().keys({
    userId: joi.string(),
    userName: joi.string(),
    pictureUrl: joi.string(),
});
const blogVideoUserSchema = joi.array().items(blogVideoUserSchemaItems);

const crateBlogVideoSchema = {
    isMonthIdea: blogVideoMonthIdeaSchema.required(),
    nameIdea: blogVideoNameIdeaSchema.required(),
    description: blogVideoDescriptionIdeaSchema.required(),
    tags: blogVideoTagsIdeaSchema.required(),
    timeStamp: blogVideoTimeStampSchema,
    Videos: blogVideoArrayVideosSchema.required(),
    user: blogVideoUserSchema
}


module.exports = {
    blogVideoIdSchema,
    crateBlogVideoSchema
}