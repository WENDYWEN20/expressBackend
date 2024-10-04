import {Router} from 'express'
import {users} from '../data/users.js'
import {error} from '../middlewares/error.js'
const usersRouter=Router();

usersRouter.get("/", (req, res) => {
    res.json(users);
    console.log('apiKey::: ', req.key)
    console.log(req.query)
  }); //Parse users into json file
  
usersRouter.get(":id", (req, res, next) => {
    console.log(req.params);
    const user = users.find((user) => user.id == req.params.id);
    if (user) {
      res.json(user);
    } else {
      next();
      //res.json({error: 'User not found'})} //send out json data not plain HTML/text
    }
  });
  
  //POST add new users
usersRouter.post("/", (req, res) => {
    console.log(req.body);
  
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "Username Already Taken" });
        return;
      }
  
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
  
      users.push(user);
      res.json(users[users.length - 1]);
    }
  });
  //patch or update by id
usersRouter.patch(":id", (req,res, next)=>{
      console.log(req.params);
      const user=users.find((u,i)=>{
          if (u.id==req.params.id){
              for (const key in req.body){
                  users[i][key]=req.body[key];
              }
          return true;}
      })
      if (user) res.json(user);
      else next();
  })
  
  
  //delete by id
usersRouter.delete(':id', (req,res, next)=>{
      console.log(req.params)
      const user = users.find((u, i) => {
          if (u.id == req.params.id) {
            users.splice(i, 1);
            return true;
          }
        });    
        if (user) res.json(user);
        else next();
  })
  

export default usersRouter