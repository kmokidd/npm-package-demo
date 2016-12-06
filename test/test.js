import assert from 'assert';
import path from 'path';
import fs from 'fs';
import download from '../';
import {randomFilename} from '../lib/utils';

let readFile = f => fs.readFileSync(f).toString();
let getFileSize = f => fs.statSync(f).size;

describe('es2015_demo', function(){
  this.timeout(15000);

  it('复制本地文件成功', function(done){
    this.timeout(15000);
    setTimeout(done, 15000);

    let source = __filename;
    let target = randomFilename();
    let onProgress = false;

    download(source, target, (size, total) => {

      onProgress = true;
      console.log('1');
      assert.equal(size, total);
      console.log('2');
      assert.equal(total, getFileSize(source));
      console.log('3');
      console.log("!!!");

    }).then(filename => {

      assert.equal(onProgress, true);
      assert.equal(target, filename);
      assert.equal(readFile(source), readFile(target));

      done();

    }).catch(err => {
      throw err;
    });
  });
});