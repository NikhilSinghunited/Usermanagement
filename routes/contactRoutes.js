const express = require('express');
const router = express.Router();
const port = process.env.PORT || 5000;
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
router.route('/').get(getContacts);
// router.route('/:id').get(createContact);
router.route('/').post(getContact);

router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const {
//   getContacts,
//   createContact,
//   getContact,
//   updateContact,
//   deleteContact,
// } = require('../controllers/contactController');

// // Define routes
// router.route('/').post(createContact);
// router.route('/contdet').get(getContacts);
// // router.route('/del').post(deleteContact);
// router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

// module.exports = router;
