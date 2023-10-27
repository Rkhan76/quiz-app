import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

//Database connection
mongoose
  .connect('mongodb://127.0.0.1:27017/quiz-app')
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((err) => {
    console.log('Mongo Error', err)
  })

// Schema
const quizSchema = new mongoose.Schema({
  subject: String,
  quantity: Number,
  difficulty: String,
  hour: Number,
  minute: Number,
  seconds: Number,
});

const quiz = mongoose.model('quiz', quizSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    try{
        res.render('home')
    }catch(err){
        res.status(404).send('<h1>Not found</h1>');
    }
});

app.post('/submit',(req, res)=>{
    const subject = req.body.category;
    const quantity = req.body.quantity;
    const difficulty = req.body.difficulty;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const seconds = req.body.seconds;
    

    res.render('quizPage');
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}.`);
})