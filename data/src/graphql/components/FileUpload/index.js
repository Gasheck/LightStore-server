import fs from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';
import crypto from 'crypto';
import { map } from 'lodash';

const UPLOAD_DIR = './images';

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

const storeFS = async ({ stream, filename }) => {
  const id = shortid.generate();
  const name = `${id}-${filename}`;
  const path = `${UPLOAD_DIR}/${name}`;

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
      .on('finish', () => resolve({ path, name })),
  );
};

const storeDB = ({ filename, mimetype, checksum, path, FileModel }) => {
  const user = new FileModel({ filename, mimetype, checksum, path });
  return user.save();
};

const getAvailableFile = async (checksum, FileModel) => {
  return FileModel.findOne({ checksum });
};

const getChecksum = async stream => {
  return new Promise(resolve => {
    const hash = crypto.createHash('sha1');
    hash.setEncoding('hex');

    stream
      .on('end', () => {
        hash.end();
        resolve(hash.read());
      })
      .pipe(hash);
  });
};

export default async ({ files, FileModel }) => {
  return Promise.all(
    map(files, async file => {
      const { createReadStream, filename, mimetype } = await file;

      const checksum = await getChecksum(createReadStream());
      const availableFile = await getAvailableFile(checksum, FileModel);

      if (availableFile && availableFile._id) {
        return availableFile._id;
      }

      const { path, name } = await storeFS({
        stream: createReadStream(),
        filename,
      });

      const { _id: id } = await storeDB({
        filename: name,
        path,
        checksum,
        mimetype,
        FileModel,
      });

      return id;
    }),
  );
};
