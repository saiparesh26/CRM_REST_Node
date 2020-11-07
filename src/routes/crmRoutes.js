import { Router } from 'express';
import { addNewContact, 
    getContacts,
    getContactByID,
    updateContactByID,
    deleteContactByID 
} from '../controllers/crmController';
import { loginRequired } from '../controllers/userController';
const router = Router();

router.get('/', loginRequired, (req,res) => {
    getContacts(req,res);
})

router.get('/:contactID', loginRequired, (req,res) => {
    getContactByID(req,res);
})

router.post('/', loginRequired, (req,res) => {
    addNewContact(req,res);
})

router.put('/:contactID', loginRequired, (req,res) => {
    updateContactByID(req,res);
})

router.delete('/:contactID', loginRequired, (req,res) => {
    deleteContactByID(req,res);
})

export default router;