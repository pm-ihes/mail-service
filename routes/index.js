const express = require('express');
const router = express.Router();
const contact = require('./contact/index');
const application = require('./application/index');

router.use(contact.path, contact.router);
router.use(application.path, application.router);

module.exports = router;