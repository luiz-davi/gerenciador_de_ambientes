import * as admin from 'firebase-admin';
const firebase_config = require("../config/firebase.json");
const BUCKET = 'gerenciamento-de-ambientes.appspot.com';
const DEFAULT_IMAGE = 'https://static.vecteezy.com/ti/vetor-gratis/p1/6026787-avatar-profile-default-social-media-photo-icon-vector-in-flat-style-vetor.jpg';

admin.initializeApp({
  credential: admin.credential.cert(firebase_config),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const upload_image = (file) => {
  if(!file) return DEFAULT_IMAGE;
  const image_name = `${Date.now()}_${file.originalname}`;

  const firebase_file = bucket.file(`user_images/${image_name}`);
  const stream = firebase_file.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on('error', (e) => {
    console.log(e);
  })

  stream.on('finish', async () => {
    await firebase_file.makePublic();
  });
  
  stream.end(file.buffer);
  return `https://storage.googleapis.com/${BUCKET}/user_images/${image_name}`;
}

export default upload_image;