const joi = require('@hapi/joi');

const blogImageIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const blogImageMonthIdeaSchema =  joi.boolean();
const blogImageNameIdeaSchema = joi.string();
const blogImageDescriptionIdeaSchema = joi.string().max(300);
const blogImageTagsIdeaSchema = joi.array().items(joi.string());
const blogImageTimeStampSchema =  joi.date().default(new Date().getTime());
const blogImageArrayImagesSchema = joi.array().items(joi.string()).max(3);
const blogAudioArraySchema = joi.array().items().max(1);
const blogVideoArraySchema = joi.array().items().max(1);
const blogImageScoreSchema = joi.number();



const blogImageUserSchemaItems = joi.object().keys({
    userId: joi.string(),
    userName: joi.string(),
    pictureUrl: joi.string(),
});

const blogImageUsersVoteSchema = joi.object().keys({
    userId: joi.string(),
    userName: joi.string(),
    date: joi.date().default(new Date().getTime()),
    score: joi.number()
});

const blogImageUserSchema = joi.array().items(blogImageUserSchemaItems);
const blogScoresbyUsers = joi.array().items(blogImageUsersVoteSchema);
const createBlogImageSchema = {
    isMonthIdea: blogImageMonthIdeaSchema.required(),
    nameIdea: blogImageNameIdeaSchema.required(),
    description: blogImageDescriptionIdeaSchema.required(),
    tags: blogImageTagsIdeaSchema.required(),
    timeStamp: blogImageTimeStampSchema,
    totalScore: blogImageScoreSchema,
    usersVotes :blogScoresbyUsers,
    images: blogImageArrayImagesSchema.required(),
    video: blogAudioArraySchema,
    audio: blogVideoArraySchema,
    user: blogImageUserSchema
}


const updateBlogImageSchema = {
    totalScore: blogImageScoreSchema,
    usersVotes :blogScoresbyUsers,
}

module.exports = {
    blogImageIdSchema,
    createBlogImageSchema,
    updateBlogImageSchema
}