import Router from 'express';
import NewsController from '../controllers/NewsController.js';
import PostController from '../controllers/PostController.js';

export const router = new Router();

router.get('/posts', PostController.getPosts);
router.post('/posts/create', PostController.createPost);

router.get('/news', NewsController.getNews);
router.post('/news/create', NewsController.createNews);
