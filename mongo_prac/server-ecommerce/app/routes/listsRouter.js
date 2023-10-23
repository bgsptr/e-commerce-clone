import express, { response } from "express";
import List from "../Model/List.js";
import mongoDB from "../configs/nosqlConfig.js";
import Task from "../Model/Task.js";
import axios from "axios";
import _ from "lodash";

mongoDB.connected();

const router = express.Router();

router.get("/", async (req, res) => {
    const allList = await List.find({});
    res.json(allList);
});

router.post("/", async (req, res) => {
    const list = req.body.list;
    try {
        const newList = new List({
            name: list,
            // total_task: await listCounted,
        });
        await newList.save();
        // console.log(newList);
    } catch(err) {
        console.log(err);
    }
    res.redirect("/tasks/today");
});

router.get("/:listId", async (req, res) => {
    try {
        const listId = req.params.listId;
        const url = `http://localhost:3000/lists/${listId}`;
        const allList = await List.find({});
        const listObj = await List.findById(listId).exec();
        const {_id: idList, name, created_at: listCreated, total_task} = listObj;

        const taskObj = await Task.find({list: name}).exec();
        const taskCounted = total_task;

        const {
            _id,
            activity,
            description,
            list,
            due_date,
            is_completed,
            created_at,
            updated_at,
        } = taskObj
        const arr = [];
        taskObj.forEach((response) => {
            const slug = _.kebabCase(response.activity);
            const newObjSlug = {
                slug: slug
            }
            const returnedObj = {...response, ...newObjSlug};
            arr.push(returnedObj);
        });
        const actName = listObj.name;
        res.render("list.ejs", {
            name: actName,
            lists: allList,
            taskCounted: taskCounted,
            taskObj: arr,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:listId", async (req, res) => {
    try {
        const listId = req.params.listId;
        const listObj = await List.findById(listId).exec();
        const {_id, name, created_at, total_task} = listObj;
    
        Task.find({}).countDocuments({ list: name })
        .then(count => {
            console.log(count);
            List.updateOne({ total_task: count }).where({"_id": listId}).exec();
            res.json({total_task});
        }).catch((err) => {
            console.log(err);
        });
    } catch(err) {
        console.log(err);
        res.status(500).send("internal server error");
    }
});

router.get("/:listId/:taskSlug", (req, res) => {
    res.send("hell")
});

export default router;