const express = require('express');
const router = express.Router();
const { getGenre, getBooksByGenre, getBooksByAuthor} = require ('./books')



module.exports = router