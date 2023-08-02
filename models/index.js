// import models
const { Model } = require('sequelize');
const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');


User.hasMany(BlogPost);
User.hasMany(Comment);
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});
BlogPost.hasMany(Comment);
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
Comment.hasOne(BlogPost);


module.exports = {
  User,
  Comment,
  BlogPost
};