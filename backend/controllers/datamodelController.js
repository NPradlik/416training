'use strict';

const firebase = require('../db').default;
const Student = require('../models/datamodel');
const firestore = firebase.firestore();

const addDatamodel = async (req, res, next) => {
    try {
        const data = req.body;
        await firebase.collection('datamodel').doc().set(data);
        res.send('data saved successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addDatamodel
}