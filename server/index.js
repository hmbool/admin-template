const express = require('express')

const app = express()

app.use(express.json())
app.use(require('cors')())


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog-admin', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const Article = mongoose.model('Articles', new mongoose.Schema({
  title: { type: String },
  body: { type: String },
}))

// Article.insertMany({
//   title: 'uses1',
//   body: '122233'
// })
app.get('/', async (req, res) => {
  res.send('index')
})
// 新增文章

app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})


// 文章列表
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find()
  res.send(articles)
})

// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

// 文章详情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article)
})
// 修改文章
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})


app.listen(3001, () => {
  console.log('http://localhost:3001/')
})