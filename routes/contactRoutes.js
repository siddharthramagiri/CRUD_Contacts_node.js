const express = require('express');
const router = express.Router();

const { getContacts,
    createContacts,
    getcontact,
    updContact,
    dltContact,
} = require('../controllers/contactcontrollers');
const validateToken = require('../middleware/validateTokenHandle');


router.use(validateToken)
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getcontact).put(updContact).delete(dltContact);

module.exports = router;