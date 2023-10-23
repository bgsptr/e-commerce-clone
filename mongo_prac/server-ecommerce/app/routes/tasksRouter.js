import express from "express";
import Task from "../Model/Task.js";
import List from "../Model/List.js";
import mongoDB from "../configs/nosqlConfig.js";
import axios from "axios";
import _ from "lodash";

mongoDB.connected();

const router = express.Router();

router.get('/today', async (req, res) => {
    try {
        const allList = await Task.find({});
        res.json(allList)
        // res.render("today.ejs", {
        //     lists: allList
        // });
    } catch(error) {
        console.log(error);
    }
});

router.post('/today', async (req, res) => {
    console.log(req.body);
    // destructor
    try {
        const { activity, desc, due_date, list } = req.body;
        const currDate = new Date();
        let nextWeekInc;
        const dueDate = () => {
            if(due_date === "next_week") {
                nextWeekInc = currDate.setDate(currDate.getDate() + 7);
            }
            else if(due_date === "tomorrow") {
                nextWeekInc = currDate.setDate(currDate.getDate() + 1);
            }
            const weekAfter = new Date(nextWeekInc);
            return weekAfter;
        };
        const newTask = new Task({
            activity: activity,
            description: desc,
            list: list,
            is_completed: false,
            due_date: new Date(dueDate()),
        });
        await newTask.save(); // Save the new task to the database
        console.log("successfully saved");
        const capitalizeList = _.capitalize(list);
        Task.find({}).countDocuments({ list: list })
        .then(count => {
            List.updateOne({ total_task: count }).where({"name": capitalizeList}).exec();
            // res.json({ total_task: count });
        }).catch((err) => {
            console.log(err);
        });
        const idList =  await List.find({name: capitalizeList});
        // const url = `http://localhost:3000/lists/${idList}`
        // await axios.patch(url);
        res.redirect("/tasks/today");
    } catch(err) {
        console.log(err.message);
    }
});


export default router;