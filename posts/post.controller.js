const express = require("express");
const router = express.Router();
const userService = require("../users/user.service");
const postService = require("./post.service");

module.exports = router;

router.post("/create", createPost);
router.get("/", getPostsByAuthor);
router.get('/all', getAllPosts)
router.put('/', updatePost);
router.delete('/', deletePost);


function createPost(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => {
      if (user) {
          postService.createPost({
            heading: req.body.heading,
            text: req.body.text,
            author: user._id
          })
          .then(post => res.json(post))
          .catch(err => next(err))
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
}


function getPostsByAuthor(req, res, next) {
    postService.getPostsByAuthor(req.user.sub)
    .then(data => res.json(data.posts))
    .catch(err => next(err))
  }

  function getAllPosts(req, res, next) {
      userService.getById(req.user.sub)
      .then(user => {
          if(user) {
              postService.getAllPosts()
              .then(posts => res.json(posts))
              .catch(err => next(err))
          } else {
              throw 'You have to Log In first to get posts!'
          }
      })
      .catch(err => next(err))
  }

function updatePost(req, res, next) {
    postService.getPostById(req.body.postId)
    .then(post => {
        if(post.author == req.user.sub) {
            const postId = req.body.postId;
            const postParams = req.body.postParams;
            postService.updatePost(postId, postParams)
            .then(post => res.json(post))
            .catch(err => next(err))
        } else {
            throw 'You can\'t update the post which author is not you!'
        }
    })
    .catch(err => next(err))
}

function deletePost(req, res, next) {
    postService.getPostById(req.body.postId)
    .then(post => {
        if(post.author == req.user.sub) {
            postService.deletePost(req.body.postId)
            .then(() => res.json({message: 'Post has been deleted successfully!'}))
            .catch(err => net(err))
        } else {
            throw 'You can\'t delete the post which author is not you!'
        }
    })
    .catch(err => next(err))
}