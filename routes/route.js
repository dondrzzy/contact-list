var express = require('express');
var router = express.Router();

//import schema for contacts
const Contact = require('../models/contacts');

//retrieving all contacts
router.get('/', function(req, res, next){
    res.send('Hello world');
});

router.get('/contacts', function(req, res, next){
    Contact.find(function(err, contacts){
        if(err){
            res.json({error: 'Error in get request'});
        }else{
            res.json(contacts);
        }        
    });
});

//add contacts
router.post('/contact', function(req, res, next){
    let newContact = new Contact({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        phone:req.body.phone
    });
    newContact.save(function(err, result){
        if(err){
            res.json({msg: 'Failed to add contact'});
        }else{
            res.json({msg: 'Contact added successfully'});
        }
    });
});

//update contact
router.put('/contact/:id', function(req, res, next){
    console.log('Updating video');
    Contact.findByIdAndUpdate(req.params.id,
    {
        $set:{firstName:req.body.firstName, lastName:req.body.lastName, phone:req.body.phone}
    },
    {
        new : true
    },
    function(err, result){
        if(err){
            res.send('err updating');
        }else{
            res.json(result);
        }
    })
})

//delete contact
router.delete('/contact/:id', function(req, res, next){
    Contact.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});

module.exports = router;
