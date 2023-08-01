const express = require('express');
const router = express.Router();
const { getGenre, getBooksByGenre, getBooksByAuthor} = require ('./books')

router.post('/getGenre', async (req, res)=> {
    const title= req.body.title;
    const result = await getGenre(title);
    res.json(result);
});

router.post('/getBooksByAuthor', async(req, res)=>{
    const author = req.body.author;
    const result = await getBooksByAuthor(author);
    res.json(result);
})

router.post('/getBooksByGenre', async (req, res)=> {
    const genres = req.body.genres;
    const result = await getBooksByGenre(genres);
    res.json.apply(result);
})



module.exports = router