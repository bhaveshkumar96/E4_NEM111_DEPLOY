const express = require("express");
const { connection } = require("./configs/db");
const { authentication } = require("./middlewares/auth.middleware");
const { postsRouter } = require("./routes/posts.routes");
const { usersRouter } = require("./routes/users.routes");

const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
    res.send(`<h1>Home page</h1>`)
})
//authentication
// app.use("/posts",authentication)
app.use("/posts",authentication,postsRouter)
app.use("/users",usersRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Running on PORT ${process.env.PORT}`);
});

// {
//     "name":"bhavesh",
//     "email":"b@gmail.com",
//     "gender":"male",
//     "pass":"bhavesh",
//     "age":26,
//     "city":"bhavesh"
//     }
    // {
//     "title":"bhavesh",
//     "body":"learn",
//     "device":"mobile",
 //       "no_if_comments":5