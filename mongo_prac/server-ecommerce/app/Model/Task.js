import mongoose from "mongoose";

// const nextWeek = () => {
//     const currDate = new Date();
//     const nextWeekInc = currDate.setDate(currDate.getDate() + 7);
//     const weekAfter = new Date(nextWeekInc);
//     // const currDate1 = weekAfter.toISOString();
//     return weekAfter;
// }

const SubTaskSchema = mongoose.Schema({
    activity: String,
    description: String,
    priority: String,
})

const taskSchema = mongoose.Schema({
    activity: String,
    description: String,
    list: {
        type: String,
        required: true,
    }, 
    created_at: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updated_at: {
        type: Date,
        default: () => Date.now(),
    },
    due_date: {
        type: Date,
    },
    is_completed: {
        type: Boolean
    },
    priority: String,
    sub_task: SubTaskSchema,
    listIdRef: {type: mongoose.Schema.Types.ObjectId, ref: "Task"},
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
