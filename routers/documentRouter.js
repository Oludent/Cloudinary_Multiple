const router = require('express').Router()

const {documentUploads, multipleUploads, getAllDocuments} = require('../controllers/document')
const upload = require('../middleware/multer')


router.post('/uploads', upload.array('documents', 5), documentUploads)
router.post('/upload-multiple', upload.fields([{ name: 'documents', maxCount: 5 }, { name: 'displayPicture', maxCount: 1 }]  ), multipleUploads)
router.get('/getall', getAllDocuments)


module.exports = router