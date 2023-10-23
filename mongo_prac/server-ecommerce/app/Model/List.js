import mongoose from "mongoose";

const listSchema = mongoose.Schema({
    author: [{type: mongoose.Schema.Types.ObjectId, ref: "Person"}],
    name: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
    total_task: Number,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
});

const List = mongoose.model("List", listSchema);

export default List;
export {listSchema};