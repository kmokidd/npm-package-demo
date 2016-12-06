import {randomFilename, isURL, noop} from './utils';
import mkdirp from 'mkdirp';
import copyFile from './copy';
import downloadFile from './download';

export default function download(source, target, progress) {
  target = target || randomFilename(download.tmpDir);
  progress = progress || noop;
  return new Promise((resolve, reject) => {

    mkdirp(path.dirname(target), err => {
      if (err) return callback(err);

      resolve((isURL(source) ? downloadFile : copyFile)
        (source, target, progress));
    });

  });
}

copyFile(__filename, './tmp/copy.js', (size, total) => console.log(`进度${size}/${total}`))
  .then(filename => console.log(`已保存到${filename}`))
  .catch(err => console.log(`出错：${err}`));