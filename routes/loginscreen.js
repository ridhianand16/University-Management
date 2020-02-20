const express = require('express')
const app = express()

/*
Router - 
*/
const router = express.Router()

router.get('/',(req,res) => 
{
    res.render('login');
});

/*router.post('/',(req,res) =>
{
    res.post('login');
});

/**/
module.exports = router;