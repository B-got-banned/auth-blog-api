const express = require("express")
const {makePost, getAllPosts, getPostById, getPostsByKeyword, updatePostById, deletePostById} = require("../controllers/postController")
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send("<h1>Welcome to my Blog API! :D</h1>")
})

router.post('/articles', requireAuth, makePost)
router.get('/articles', requireAuth, getAllPosts)
router.get('/articles/search', requireAuth, getPostsByKeyword)
router.get('/articles/:id', requireAuth, getPostById)
router.put('/articles/:id', requireAuth, updatePostById)
router.delete('/articles/:id', requireAuth, deletePostById)

module.exports = router