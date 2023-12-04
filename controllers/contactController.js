const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res, next) => {
  console.log('The request body is:', req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);

    return next(new Error('All fields are mandatory!'));
  }
  console.log('hi');
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  const contacts = await contact.save();
  console.log(contacts);
  res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    return next(new Error('Contact not found'));
  }
  res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    return next(new Error('Contact not found'));
  }
  console.log(contact.user_id);
  if (contact.user_id !== req.user.id) {
    res.status(403);
    return next(
      new Error("User doesn't have permission to update other user contacts")
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runvalidators: true,
    }
  );
  console.log(updatedContact);
  res.status(200).json(updateContact);
});
// const updateContact = asyncHandler(async (req, res, next) => {
//   var { contactid } = req.params;
//   var { name, email, phone } = req.body;
//   let checkIfContactExists;

//   try {
//     checkIfContactExists = await contactModel.findOne({
//       _id: contactid,
//       isDeleted: false,
//     });
//   } catch (err) {
//     return res.status(400).send('Error checking contact existence');
//   }

//   if (!checkIfContactExists) {
//     return res.status(400).send('Contact ID does not exist');
//   }

//   try {
//     let updateContact = await contactModel.updateOne(
//       { _id: contactid },
//       {
//         name,
//         email,
//         phone,
//         updatedAt: new Date(),
//       }
//     );
//     console.log(updateContact);
//     if (!updateContact) {
//       return res.status(500).send('Contact not updated, something went wrong');
//     }

//     return res.status(200).send('Contact updated successfully');
//   } catch (err) {
//     return res.status(500).send('Error updating contact');
//   }
// });

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    return next(new Error('Contact not found'));
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    return next(
      new Error("User doesn't have permission to delete other user contacts")
    );
  }
  const val = await Contact.deleteOne({ _id: req.body.id });
  console.log(val);
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
