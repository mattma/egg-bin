'use strict';

const path = require('path');
const assert = require('assert');
const coffee = require('coffee');
const mm = require('mm');

describe('my-egg-bin', () => {
  const eggBin = require.resolve('./fixtures/my-egg-bin/bin/my-egg-bin.js');

  afterEach(mm.restore);

  it('should my-egg-bin test success', done => {
    mm(process.env, 'TESTS', 'test/**/*.test.js');
    coffee.fork(eggBin, ['test'], {
      cwd: path.join(__dirname, 'fixtures/test-files'),
    })
    // .debug()
    .expect('stdout', /✓ should success/)
    .expect('stdout', /a.test.js/)
    .expect('stdout', /b\/b.test.js/)
    .expect('code', 0)
    .end((err, res) => {
      assert.ifError(err);
      assert.ok(!/a.js/.test(res.stdout));
      done();
    });
  });

  it('should my-egg-bin nsp success', done => {
    coffee.fork(eggBin, ['nsp'], {
      cwd: path.join(__dirname, 'fixtures/test-files'),
    })
    // .debug()
    .expect('stdout', /run nsp check at/)
    .expect('code', 0)
    .end(done);
  });
});
