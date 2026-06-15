const router = require('express').Router();
const upload = require('../storage/uploadConfig');
const { uploadPdf } = require('../controllers/uploadController');

router.post('/', upload.single('file'), uploadPdf);

module.exports = router;

