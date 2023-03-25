import BaserUpload  from '@services/uploads/base_upload'
const BUCKET = 'gerenciamento-de-ambientes.appspot.com';

class EnvironmentsUpload extends BaserUpload{
  async call(files, user, environment){
    const result: Array<String> = [];

    files.forEach((file) => {
      const image_name = `${Date.now()}_${file.originalname}`;

      const username = `${user.id}_${user.first_name}_${user.last_name}`;
      const environment_name = environment.split(' ').join('_');

      const firebase_file = this.bucket.file(`environments/${username}/${environment_name}/${image_name}`);
      const stream = firebase_file.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      stream.on('error', (e) => {
        console.log(e);
      })

      stream.on('finish', async () => {
        await firebase_file.makePublic();
      });
      
      stream.end(file.buffer);
      result.push(`https://storage.googleapis.com/${BUCKET}/environments/${username}/${environment_name}/${image_name}`);
    });

    return result;
  }
}

export default new EnvironmentsUpload();