import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req,res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    })
}

export const getContacts = (req,res) => {
    Contact.find({}, (err, contacts) => {
        if(err){
            res.send(err)
        }
        res.json(contacts);
    }) 
}

export const getContactByID = (req,res) => {
    const { contactID } = req.params;
    Contact.findById(contactID, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact)
    })
}

export const updateContactByID = (req,res) => {
    const { contactID } = req.params;
    let newContact = new Contact(req.body);

    Contact.findOneAndUpdate({
        _id: contactID 
    }, req.body, 
    {new: true, useFindAndModify: false}, (err,contact) => {
        if(err){
            res.send(err)
        }
        res.json(contact);
    })
}

export const deleteContactByID = (req,res) => {
    const { contactID } = req.params;

    Contact.findByIdAndDelete(contactID, (err, contact) => {
        if(err) {
            res.send(err)
        }
        res.status(200).json({message: 'Deleted contact'});
    })
}
