const {Schema, model} = require('mongoose');

const skillSchema = new Schema({
    logo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = model('Skill', skillSchema);