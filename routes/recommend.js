const express = require('express');
const router = express.Router();
const { getGenre, getBooksByGenre, getBooksByAuthor} = require ('./books')

router.post('/getGenre', async (req, res)=> {
    const title= req.body.title;
    const result = await getGenre(title);
    res.json(result);
})

module.exports = router