const express = require('express');
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// Define routes
router.route('/').post(createContact);
router.route('/contdet').get(getContacts);
// router.route('/del').post(deleteContact);
router.route('/:id').get(getContact);
router.route('/:id').put(updateContact);
router.route('/:id').delete(deleteContact);
module.exports = router;
