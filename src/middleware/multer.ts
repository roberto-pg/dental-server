import express from 'express'
import crypto from 'crypto'
import * as multer from 'multer'

module.exports = {
  storage: multer.diskStorage({
    destination: (req: express.Request, file: any, cb: any) => {
      cb(null, process.env.IMAGE_STORAGE)
    },
    filename: (req: express.Request, file: any, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: express.Request, file: any, cb: any) => {
    const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalide file type.'))
    }
  },
}
