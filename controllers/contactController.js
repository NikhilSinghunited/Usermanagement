// const asyncHandler = require("express-async-handler");
// const asyncHandler = require('express-async-handler');
// const Contact = require('../models/contactModel');
// //@desc Get all contacts
// //@route GET /api/contacts
// //@access private
// const getContacts = asyncHandler(async (req, res) => {
//   const contacts = await Contact.find({ user_id: req.user.id });
//   res.status(200).json(contacts);
// });

// //@desc Create New contact
// //@route POST /api/contacts
// //@access private
// const createContact = asyncHandler(async (req, res) => {
//   console.log('The request body is :', req.body);
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400);
//     throw new Error('All fields are mandatory !');
//   }
//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//     user_id: req.user.id,
//   });

//   res.status(201).json(contact);
// });

// //@desc Get contact
// //@route GET /api/contacts/:id
// //@access private
// const getContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error('Contact not found');
//   }
//   res.status(200).json(contact);
// });

// //@desc Update contact
// //@route PUT /api/contacts/:id
// //@access private
// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error('Contact not found');
//   }

//   if (contact.user_id.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error("User don't have permission to update other user contacts");
//   }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updatedContact);
// });

// //@desc Delete contact
// //@route DELETE /api/contacts/:id
// //@access private
// const deleteContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error('Contact not found');
//   }
//   if (contact.user_id.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error("User don't have permission to update other user contacts");
//   }
//   await Contact.deleteOne({ _id: req.params.id });
//   res.status(200).json(contact);
// });

// module.exports = {
//   getContacts,
//   createContact,
//   getContact,
//   updateContact,
//   deleteContact,
// };
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  console.log(req.body.user_id)
  const contacts = await Contact.findOne({ _id: req.body.user_id });
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
  const contact = new Contact({
    name: name,
    email: email,
    phone: phone,
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

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    return next(new Error('Contact not found'));
  }
  
  // console.log(req)
  if (contact._id.toString() !== req.params.id) {
    res.status(403);
    return next(
      new Error("User doesn't have permission to update other user contacts")
      );
    }
console.log('hello')
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
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
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
