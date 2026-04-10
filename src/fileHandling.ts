// import express from 'express'
import multer from 'multer'
// const app=express()

const storage = multer.diskStorage(
    {
    destination: function(req,file ,cb)
    {
        cb(null, 'uploads');
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now() +'-' +file.originalname)
    }
    });

    const uplaod = multer({storage:storage})