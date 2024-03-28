import Router from 'express';
import NewsController from '../controllers/NewsController.js';
import PostController from '../controllers/PostController.js';

export const router = new Router();

router.get('/posts', PostController.getPosts);
router.get('/posts/:id', PostController.getPostById);
router.post('/posts/create', PostController.createPost);
router.put('/posts/update/:id', PostController.editPost);
router.delete('/posts/delete/:id', PostController.deletePost);

router.get('/news', NewsController.getNews);
router.post('/news/create', NewsController.createNews);
