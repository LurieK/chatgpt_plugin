const express = require('express');
const router = express.Router();

let books = [
    { genre: 'Fantasy', title: 'A Game of Thrones', author: 'George R. R. Martin'},
    { genre: 'Mystery', title: 'The Da Vinci Code', author: 'Dan Brown' },
    { genre: 'Thriller', title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson' },
    { genre: 'Science Fiction', title: 'Dune', author: 'Frank Herbert' }
];

const getBookRecommendaton= async function(req, res) {
    const {genre} = req.body;

    if (!genre){
        return res.status(400).json({error:'Genre is required'})
    }
    const book = books.find(book=> book.genre === genre);
    if (book){
        res.json(book);
    }else{
        res.status(404).json({error: 'No books found for that genre'})
    }
}

router.post('/', getBookRecommendaton);

module.exports = router