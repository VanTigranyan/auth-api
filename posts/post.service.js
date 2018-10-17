const db = require("_helpers/db");
const User = db.User;
const Post = db.Post;

module.exports = {
  createPost,
  getPostsByAuthor,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
}

async function createPost(postParams) {
    const user = await User.findById(postParams.author).select('-hash');

    console.log(postParams)
    const post = new Post(postParams);

    Post.create(post, (err, post) => {
        if(err) {
            throw new Error(err);
        }

        user.posts.push(post);
        user.save()
    })

    return post;
  }
  
  async function getPostsByAuthor(userId) {

    const posts = await User.findById(userId)
    .populate({path: 'posts', model: 'Post'})
    .select('posts')

    return posts;
  }

  async function getAllPosts() {
      const posts = await Post.find({})
      .populate('author', '-posts -hash')

      return posts;
  }

  async function updatePost(postId, postParams) {
    return await Post.findByIdAndUpdate(postId, postParams, {new: true}, (err, post) => {
        if (err) return res.status(500).send(err);
        return post
    })

  }

  async function deletePost(postId) {
      return await Post.findByIdAndRemove(postId)
  }

  async function getPostById(postId) {
      console.log( await Post.findById(postId) )
      return await Post.findById(postId)
  }