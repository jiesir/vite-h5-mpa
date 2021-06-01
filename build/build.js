const execa = require('execa');
const modules = require('../src/utils/modules');

async function runBuildTasks() {
  console.warn("checklist:", modules.module)
  for (let i = 0; i < modules.module.length; i++) {
    try {
      process.env.BUILD_INDEX = i;
      await execa('vite', ['build'], {
        stdio: 'inherit',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  console.warn('Compile successfully');
}

async function build() {
  process.env.VITE_ENV = "prod";

  try {
    await runBuildTasks();
  } catch (err) {
    console.error('Build failed');
    process.exit(1);
  }
}

build();