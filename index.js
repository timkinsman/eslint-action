const core = require('@actions/core');
const github = require('@actions/github');
const glob = require('@actions/glob');

const run = async () => {
  console.log(__dirname);
  console.log('Test1');
  const globber = await glob.create('**/*.js');
  console.log('Test2');

  for await (const file of globber.globGenerator()) {
    console.log(file);
    console.log('Test3');
  }

  console.log('Test4');

  const gloober = await glob.create('**');
  const files = await gloober.glob();
  console.log(files);
}

run();