const mongoose = require('mongoose')

if(process.argv.length <3) {
    console.log("give password as argument")
    process.exit(1)
}

console.log(process.argv[0], ' - ', process.argv[1])
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.jai3lhh.mongodb.net/ ?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'tonton pipi',
    important: true
})

// note.save().then(result => {
//     console.log('note saved:', result)
//     mongoose.connection.close()
// })

Note.find({important: false}).then(result => {
    result.forEach(n => console.log(n))
    mongoose.connection.close()
})