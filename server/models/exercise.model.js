import mongoose from 'mongoose'

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, description: {
        type: String,
        required: true
    }, duration: {
        type: Number,
        required: true
    }, date: {
        type: Date,
        required: true
    }
}, {
    timestamp: true
})

const ExerciseModel = mongoose.model('Exercise', exerciseSchema)

export default ExerciseModel