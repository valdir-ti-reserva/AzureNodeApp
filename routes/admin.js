var express = require('express');
var router = express.Router();
var { MongoClient } = require('mongodb');

const title = process.env.TITLE;

const books = [
    {
        title: 'Life on the Mississippi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'NodeJS',
        genre: 'Programmation',
        author: 'Ed Joe',
        read: true
    },
    {
        title: 'Padrão de Projetos',
        genre: 'Programmation',
        author: 'Jane Doe',
        read: false
    },
    {
        title: 'MongoDB the Glossary',
        genre: 'Programmation',
        author: 'Leon Doe',
        read: false
    },
    {
        title: 'MySQL',
        genre: 'Programmation',
        author: 'John Foe',
        read: true
    },
];

/* GET home page. */
router.get('/', function(req, res, next) {
    const URL = process.env.URL;
    const dbName = 'Library';
    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = client.db(dbName);
            const response = await db.collection('books').insertMany(books);
            res.json(response); 
        } catch (err) {
            console.log(err);
        }
    }());
});

module.exports = router;
