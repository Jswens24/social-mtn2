require('dotenv').config()

const express = require('express');
const cors = require('cors');

const { sequelize } = require('./util/database');

const { PORT } = process.env || 4001;

const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/posts');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');
const { User } = require('./models/user');
const { Post } = require('./models/post');

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);


//Auth
app.post('/register', register);
app.post('/login', login);

//GET posts
app.get('/posts', getAllPosts);

//CRUD posts - auth required
app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);


//If 'force' is true it will drop tables!
sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on post ${PORT}`));
    })
