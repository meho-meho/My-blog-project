import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// render home page
app.get("/", async (req, res) => {
    try {
        const posts = await axios.get(`${API_URL}/api`);
        console.log(posts.data);
        res.render("index.ejs", {posts: posts.data});
    } catch (error) {
        res.json({massege: "errer fetching the posts"});
    }
});

// render modify page for new post (newPost = true)
app.get("/new", (req, res) => {
    res.render("modify.ejs", {newPost: true});
});

// sending submitted new post to api
app.post("/submit", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/api/newPost`, req.body);
        res.redirect("/");
    } catch (error) {
        res.json({massege: "error submitting the post"});
    }
});

// render modify page for edit post (newPost = false)
app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await axios.get(`${API_URL}/api/edit/${id}`);
        res.render("modify.ejs", {newPost: false, post: post.data});
    } catch (error) {
        res.json({massege: "error getting the post"});
    }
});

// sending submitted edit post to the api
app.post("/editSubmit/:id", async (req, res) => {
    try {
        const response = await axios.patch(`${API_URL}/api/editSubmit/${req.params.id}`, req.body);
        res.redirect("/");
    } catch (error) {
        res.json({massege: "error submitting your edit"});
    }
});

// requesting delete from api
app.get("/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}/api/delete/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.json({massege: "error deleting the post"});
    }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});