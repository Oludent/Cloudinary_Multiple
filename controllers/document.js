const {Documents_Portal} = require('../models');
const cloudinary = require('../config/cloudinary')
const fs = require('fs')


exports.documentUploads = async (req, res) =>{
    try {
        const {username} = req.body;
        const files = req.files
        const record = await Documents_Portal.findOne({where: {username}})
        if (record){
            return res.status(400).json({
                message: `User record with username: ${username} already exists, Please update your documents instead.`
            })
        }
        if(files.length == 0){
            return res.status(404).json({
                message: `Please upload at least one(1) file`
            })
        }
        const uploadedFiles = files.map((el)=> el.path);
        const documents = []

        // uploadedFiles.forEach( async (element) => {
        //     const result = await cloudinary.uploader.upload(element)
        //     const obj = {}
        //         obj.fileUrl= result.secure_url,
        //         obj.fileId= result.public_id

        // });

        for(const file of uploadedFiles){
           const result = await cloudinary.uploader.upload(file)
            const obj = {}
                 obj.fileUrl= result.secure_url,
                 obj.fileId= result.public_id

                 documents.push(obj)
        }

        const data = {
            username,
            documents
        }

        const createUser = await Documents_Portal.create(data)

        res.status(201).json({
            message: `Document uploaded successfully!`,
            data: createUser
    
        })
    } catch (error) {
        res.status(500).json({
             message: error.message
        })
       
    }
}


exports.multipleUploads = async (req, res) =>{
    try {
        const {username} = req.body;
        const files = req.files
        const record = await Documents_Portal.findOne({where: {username}})
        if (record){
            return res.status(400).json({
                message: `User record with username: ${username} already exists, Please update your documents instead.`
            })
        }
        if(!files.documents && !files.displayPicture){
            return res.status(404).json({
                message: `Please upload documents and display picture`
            })
        }
        const displayPath = files.displayPicture[0].path
        const documentsPath = files.documents.map((el) => el.path)

        const data = {
            username,
            documents: []
        }
     

        if (files.displayPicture){
            const result = await cloudinary.uploader.upload(displayPath)
            data.displayPicture = result.secure_url
        }

         if (files.documents){
            for(const file of documentsPath){
                const result = await cloudinary.uploader.upload(file)
                const obj = {}
                obj.fileUrl= result.secure_url,
                obj.fileId= result.public_id

                
                data.documents.push(obj)
            }
        }

        const newUpload = await Documents_Portal.create(data)

        res.status(201).json({
            message: `Multiple documents uploaded successfully!`,
            data: newUpload
        })

    } catch (error) {
        res.status(500).json({
             message: error.message
        })
    }
}   

exports.getAllDocuments = async (req, res) =>{
    try {
         const allDocuments = await Documents_Portal.findAll({attributes: ['username', 'displayPicture']})
        res.status(200).json({
            message: `All document are: ${allDocuments.length}`,
            data: allDocuments
        })
    } catch (error) {
         res.status(500).json({
             message: error.message
        })
    }
}
       