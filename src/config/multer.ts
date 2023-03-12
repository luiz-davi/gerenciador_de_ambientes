import multer from 'multer';
import path from 'path';

export const storage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024*1024
  }
});