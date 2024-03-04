import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

let posts = [];
let counter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sending posts
app.get("/api", (req, res) => {
    res.send(posts);
});

// sending a specific post for editing
app.get("/api/edit/:id", (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id == id);
    res.send(post);
})

// adding submitted new post to posts array
app.post("/api/newPost", (req, res) => {
    const date = new Date();
    const post = {
        title: req.body.title,
        auther: req.body.auther,
        content: req.body.content,
        date: date.toString(),
        id: counter
    };
    counter++;
    posts.push(post);
    res.send("success");
});

// updating edited post
app.patch("/api/editSubmit/:id", (req, res) => {
    console.log("api patch route for edit entered");
    const id = req.params.id;
    const newPost = req.body;
    const post = posts.find(post => post.id == id);
    const date = new Date();
    
    if (newPost.title) post.title = newPost.title;
    if (newPost.auther) post.auther = newPost.auther;
    if (newPost.content) post.content = newPost.content;
    post.date = date.toString();

    res.send("success");
});

// deleting a post
app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    posts = posts.filter(post => post.id != id);
    res.send("success");
});

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});