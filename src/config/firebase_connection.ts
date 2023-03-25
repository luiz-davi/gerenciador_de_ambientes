import * as admin from 'firebase-admin';
const firebase_config = require("../config/firebase.json");
const BUCKET = 'gerenciamento-de-ambientes.appspot.com';

if (!global.bucket) {
  global.bucket = admin.initializeApp({
    credential: admin.credential.cert(firebase_config),
    storageBucket: BUCKET,
  }).storage().bucket();
}

let bucket = global.bucket;


export default bucket;