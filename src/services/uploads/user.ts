import BaseUpload from './base_upload';
const BUCKET = 'gerenciamento-de-ambientes.appspot.com';
const DEFAULT_IMAGE = 'https://static.vecteezy.com/ti/vetor-gratis/p1/6026787-avatar-profile-default-social-media-photo-icon-vector-in-flat-style-vetor.jpg';

class UserUpload extends BaseUpload{
  async call(file, user){
    if(!file) return DEFAULT_IMAGE;
    const image_name = `${Date.now()}_${file.originalname}`;

    const username = `${user.first_name}_${user.last_name}`;
    const firebase_file = this.bucket.file(`avatar_images/${username}/${image_name}`);
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
    return `https://storage.googleapis.com/${BUCKET}/avatar_images/${username}/${image_name}`;
  }
}


export default new UserUpload();