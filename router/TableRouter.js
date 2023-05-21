import { Router } from "express";
import multer from 'multer';
import fs from "fs"

import * as TableController from '../controllers/TableController.js';

const fileStorage = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploadsFile')) {
            fs.mkdirSync('uploadsFile');
        }
        cd(null,'uploadsFile')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const uploadFile = multer({ storage: fileStorage })

const router = new Router();

router.post('/create-table', uploadFile.single('file'),TableController.createTable);

export default router;