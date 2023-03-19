const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ac-tbgns4u-shard-00-00.cqs0kus.mongodb.net:27017,ac-tbgns4u-shard-00-01.cqs0kus.mongodb.net:27017,ac-tbgns4u-shard-00-02.cqs0kus.mongodb.net:27017/testNoteApp?ssl=true&replicaSet=atlas-3u2nns-shard-0&authSource=admin&retryWrites=true&w=majority`


// `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'We are moving on!',
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})