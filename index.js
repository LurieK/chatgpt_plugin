const express = require('express');
const router = express.Router();

let books = [
    { genre: 'Fantasy', title: 'A Game of Thrones', author: 'George R. R. Martin'},
    { genre: 'Mystery', title: 'The Da Vinci Code', author: 'Dan Brown' },
    { genre: 'Thriller', title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson' },
    { genre: 'Science Fiction', title: 'Dune', author: 'Frank Herbert' }
]