import express from "express";
// import { users } from "./data/users.js";
// import { posts } from "./data/posts.js";
import usersRouter from './routes/users.js'
import postsRouter from "./routes/posts.js";
const app = express();
const PORT = 4000;
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
//New log middleware to help us keep track of requests during testing

//API routes  get by ID
// app.get("/api/users", (req, res) => {
//   res.json(users);
// }); //Parse users into json file

// app.get("/api/users/:id", (req, res, next) => {
//   console.log(req.params);
//   const user = users.find((user) => user.id == req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     next();
//     //res.json({error: 'User not found'})} //send out json data not plain HTML/text
//   }
// });

// //POST add new users
// app.post("/api/users", (req, res) => {
//   console.log(req.body);

//   if (req.body.name && req.body.username && req.body.email) {
//     if (users.find((u) => u.username == req.body.username)) {
//       res.json({ error: "Username Already Taken" });
//       return;
//     }

//     const user = {
//       id: users[users.length - 1].id + 1,
//       name: req.body.name,
//       username: req.body.username,
//       email: req.body.email,
//     };

//     users.push(user);
//     res.json(users[users.length - 1]);
//   }
// });
// //patch or update by id
// app.patch('/api/users/:id', (req,res, next)=>{
//     console.log(req.params);
//     const user=users.find((u,i)=>{
//         if (u.id==req.params.id){
//             for (const key in req.body){
//                 users[i][key]=req.body[key];
//             }
//         return true;}
//     })
//     if (user) res.json(user);
//     else next();
// })


// //delete by id
// app.delete('/api/users/:id', (req,res, next)=>{
//     console.log(req.params)
//     const user = users.find((u, i) => {
//         if (u.id == req.params.id) {
//           users.splice(i, 1);
//           return true;
//         }
//       });    
//       if (user) res.json(user);
//       else next();
// })

//GET
// app.get("/api/posts", (req, res) => {
//   res.json(posts); // take the posts data imported above
// });

// app.get("/api/posts/:id", (req, res, next) => {
//   console.log(req.params);
//   const post = posts.find((post) => post.id == req.params.id);
//   if (post) {
//     res.json(post);
//   } else {
//     next(); //call 404 middleware
//     //res.json({error: `Post id ${req.params.id} does not exist`})
//   }
// });

app.get("/", (req, res) => {
  res.send(`Restful API`);
});

// Custom 404 (not found) middleware.Error Middleware
// Since we place this last, it will only process
// if no other routes have already sent a response!
// We also don't need next(), since this is the
// last stop along the request-response cycle.
//customize error

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use((req, res) => {
  res.status(404).json({ error: "Middleware Error Resource Not Found" });
});

app.listen(PORT, () => console.log(`Server at ${PORT}`));
