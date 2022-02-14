const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer');
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb(new Error('please upload word file'))
       }
       cb(undefined,true);
    }
});
const sharp = require('sharp');

router.get('/allbooks',async (req,res)=>{
    try{
        const book = await Book.find();
        res.status(201).send(book);
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/books', auth,upload.single('image'),async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({height:300}).png().toBuffer();
        console.log(buffer);
        const book = await Book.create({...req.body,owner: req.user._id,image: buffer});
        res.status(201).send(book)
    } catch (e) {
        //when error is occure then that block is send error message
        console.dir(e);
        res.status(200).send(e)
    }
})

router.get('/books', auth, async (req, res) => {
    const userId = req.user._id
    try{
        const allbook = await Book.find({owner : userId})
        res.status(201).send(allbook)
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.get('/books/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {

        const book = await Book.findOne({ _id, owner: req.user._id })

        if (!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/books/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['bookName', 'author','year','isbn']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findOne({ _id: req.params.id, owner: req.user._id})

        if (!book) {
            return res.status(404).send()
        }

        updates.forEach((update) => book[update] = req.body[update])
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

// router.post('/books/img/:id',auth,upload.single('avatar'),async(req,res)=>{
//     const buffer = await sharp(req.file.buffer).resize({width:250 , height:250}).png().toBuffer();
//     req.user.avatar = buffer;
//     await req.user.save();
//     res.send({"success": "your profile pic is uploaded successfully"});
// },(error,req,res,next)=>{
//     res.status(400).send({"error": error.message})
// })

router.get('/books/img/:id',async(req,res)=>{
    try{
        const book = await Book.findById(req.params.id);
        if( !book.image){
            throw new Error("image is not available");
        }
        res.set('Content-type','image/png')
        res.send(book.image);
    }catch(error){
        res.status(404).send(error.message);
    }
});


module.exports = router