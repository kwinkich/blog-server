import Router from 'express';
import NewsController from '../controllers/NewsController.js';
import PostController from '../controllers/PostController.js';
import AuthController from '../controllers/AuthController.js';

export const router = new Router();

router.post('/user/verify', AuthController.verifyTelegramWebApp);

router.get('/posts', PostController.getPosts);
router.get('/posts/:id', PostController.getPostById);
router.post('/posts/create', PostController.createPost);
router.put('/posts/update/:id', PostController.editPost);
router.delete('/posts/delete/:id', PostController.deletePost);

router.get('/news', NewsController.getNews);
router.get('/news/:id', NewsController.getNewsById);
router.post('/news/create', NewsController.createNews);
router.put('/news/update/:id', NewsController.editNews);
router.delete('/news/delete/:id', NewsController.deleteNews);
