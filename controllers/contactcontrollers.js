//to avoid errors and Using Try catch Blocks in async functions
const asynchandler = require('express-async-handler');
const Contacts = require('../models/contactmodel');

// to get All contacts
//GET /api/contacts
const getContacts = asynchandler(async (req,res) => {
    const contacts = await Contacts.find({user_id : req.users.id});
    res.status(200).json(contacts);
});

//to Create contacts
// POST /api/contacts
const createContacts = asynchandler(async (req,res) => {
    console.log(`requested Body is`, req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields Requires");
    }
    const contact = await Contacts.create({
        user_id : req.users.id,
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//to get selected contact
// GET /api/contacts/::id
const getcontact = asynchandler(async (req,res) => {
    // const contact = await Contacts.find(Contacts.id === req.params.id);
    const contact = await Contacts.findById(req.params.id);
    if(!contact) {
        res.status(404)
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//to Update contact
// UPDATE /api/contact/::id
const updContact = asynchandler(async (req,res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.users.id) {
        res.status(403);
        throw new Error("User not have Permission to Update Contacts");
    }
    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

//to delete contact
// DELETE /api/contacts
const dltContact = asynchandler(async (req,res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact) {
        res.status(404)
        throw new Error("Contact Not Found");
    };
    if(contact.user_id.toString() !== req.users.id) {
        res.status(403);
        throw new Error("User not have Permission to Update Contacts");
    };
    await Contacts.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContacts, 
    getcontact, 
    updContact, 
    dltContact
};