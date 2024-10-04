import {Router} from 'express';
import { posts } from "../data/posts.js";

const postsRouter=Router();

postsRouter.get("/", (req, res) => {
    res.json(posts); // take the posts data imported above
  });
  
postsRouter.get("/:id", (req, res, next) => {
    console.log(req.params);
    const post = posts.find((post) => post.id == req.params.id);
    if (post) {
      res.json(post);
    } else {
      next(); //call 404 middleware
      //res.json({error: `Post id ${req.params.id} does not exist`})
    }
  });
export default postsRouter;  