const express = require('express');
const {addDatamodel} = require('../controllers/datamodelController');

const router = express.Router();

router.post('/datamodel', addDatamodel);

module.exports = {
    routes : router
}