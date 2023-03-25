import {Bucket} from '@google-cloud/storage'
import bucket from '@config/firebase_connection';
export default class BaseUpload {
  bucket: Bucket;

  constructor(){
    this.bucket = bucket;
  }
}