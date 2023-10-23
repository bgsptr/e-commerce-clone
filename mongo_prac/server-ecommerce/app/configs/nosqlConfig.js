import mongoose from "mongoose";

const mongoDB_URL = 'mongodb://127.0.0.1:27017/personDB'

class MongoDB {
    constructor(mongoDB_URL) {
        this.mongoDB_URL = mongoDB_URL
    }
    connected() {
        mongoose.connect(this.mongoDB_URL, { useNewUrlParser: true })
        .then(() => {console.log("MongoDB connected")})
        .catch(err => console.log(err.message));
    }
    disconnected() {
        mongoose.disconnect()
        .then(() => {console.log("MongoDB disconnected")})
        .catch(err => console.log(err.message));
    }
}

const mongoDB = new MongoDB(mongoDB_URL);

export default mongoDB;