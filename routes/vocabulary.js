const express = require('express');
const router = express.Router();

const taskModel = require('./../model/vocabulary');

const getTasks = (req, res) => {
    taskModel.find()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(err => {
            res.send(err);
        });
};

const getTask = (req, res) => {
    taskModel.findById(req.params.id)
        .then(task => {
            res.json(task)
        })
        .catch(err => {
            res.send(err);
        });
};

const postTasks = (req, res) => {
    const newTask = new taskModel(req.body);
    newTask.save()
        .then(task => {
            res.json(task)
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        })
};

const deleteTask = (req, res) => {
    taskModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204);
            res.send('');
        })
        .catch(err => res.send(err));
};

const patchTask = (req, res) => {
    taskModel.findById(req.params.id)
        .then(task => {
            Object.assign(task, req.body).save()
                .then(task => {
                    res.json(task);
                })
                .catch(err => {
                    res.status(400);
                    res.send(err);
                })
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
};

router.route('/vocabulary')
    .get(getTasks)
    .post(postTasks);

router.route('/vocabulary/:id')
    .get(getTask)
    .delete(deleteTask)
    .patch(patchTask);

module.exports = router;
