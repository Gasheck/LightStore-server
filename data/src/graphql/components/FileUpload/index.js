import fs from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';
import crypto from 'crypto';
import getStream from 'get-stream';
import { map } from 'lodash';

const UPLOAD_DIR = './images';

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

const storeFS = async ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path })),
  );
};

const storeDB = ({ filename, mimetype, checksum, path, FileModel }) => {
  const user = new FileModel({ filename, mimetype, checksum, path });
  return user.save();
};

const isFileAvailable = async (checksum, FileModel) => {
  const files = await FileModel.find({ checksum });
  return Boolean(files.length);
};

export default async ({ files, FileModel }) => {
  return Promise.all(
    map(files, async file => {
      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();
      const fileData = await getStream.buffer(stream);
      const checksum = crypto
        .createHash('md5')
        .update(fileData)
        .digest('hex');
      const exists = await isFileAvailable(checksum, FileModel);

      if (exists) {
        throw new Error('File already exists');
      }

      const { path } = await storeFS({ stream, filename });
      const { _id: id } = await storeDB({
        filename,
        path,
        checksum,
        mimetype,
        FileModel,
      });

      return id;
    }),
  );
};
