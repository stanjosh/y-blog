const { User, BlogPost, Comment } = require("../models");


const db = {
  getAllComments: async () => {
    return await Comment.findAll({
      include: [{ 
        model: User,
        attributes: ["id", "author_name"],
        as: "user",
       }],
      order: [["comment_time", "DESC"]]
    });
  },

  getComment: async (id) => {
    return await Comment.findByPk(id, {
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
      ]
    });
  },

  createComment: async (comment) => {
    return await Comment.create(comment);
  },

  updateComment: async (id, comment) => {
    return await Comment.update(comment, { where: { id: id } });
  },

  deleteComment: async (id) => {
    return await Comment.destroy({ where: { id: id } });
  },

  getBlogPosts: async () => {
    return await BlogPost.findAll({
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["id", "author_name"],
            as: "user",
          },
        },
      ],
      order: [["post_time", "DESC"]]
    });
  },

  getBlogPost: async (id) => {
    return await BlogPost.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "author_name"], as: "user" },
        {
          model: Comment,
          include: [{ 
            model: User, 
            attributes: ["id", "author_name"], 
            as: "user" 
            },
          ]
        },
      ],
    });
  },

  createBlogPost: async (blogPost) => {
    return await BlogPost.create(blogPost);
  },

  updateBlogPost: async (id, blogPost) => {
    return await BlogPost.update(blogPost, { where: { id: id } });
  },

  deleteBlogPost: async (id) => {
    return await BlogPost.destroy({ where: { id: id } });
  },

  getAllUsers: async () => {
    return await User.findAll({
      include: [{ model: BlogPost }, { model: Comment }],
    });
  },

  getUser: async (id) => {
    return await User.findByPk(id, {
      include: [{ model: BlogPost }, { model: Comment }],
    });
  },

  getUserLogin: async (email) => {
    return await User.findOne({
      where: { email: email },
    });
  },

  createUser: async (user) => {
    return await User.create(user);
  },

  updateUser: async (id, info) => {
    return await User.update(info, { where: { id: id } })
    .catch((err) => {
      console.log(err)
      return false 
    });
  },

  authUser: async (user) => {
    console.log(user)
    let password = user.password;
    let authenticatedUser = await User.findOne({
      where: { email: user.email },
    })
    if (authenticatedUser.authenticate(password)) {
      return authenticatedUser;
    }
    else {
      return false;
    }
  }
}

module.exports = db;
