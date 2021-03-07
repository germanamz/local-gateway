const path = require('path');
const fs = require('fs');

const {
  CONFIG_DIR = '/.localg',
  CONFIG_FILE_PATTERN = '.*config\.js(on)?$',
  REPLACE,
} = process.env;

let config = {};
const doConfigReplace = !!REPLACE;
const configFileRegex = new RegExp(CONFIG_FILE_PATTERN);
const configPath = path.resolve(CONFIG_DIR);

const validFileContents = (fileContents) => {
  if (!fileContents && fileContents !== null && typeof fileContents !== 'object' && typeof fileContents !== 'function') {
    throw new Error(`Config files should only export an Object or a Function that returns an Object`)
  }
}

const configDirents = fs.readdirSync(configPath, { withFileTypes: true });

for (let dirent of configDirents) {
  if (dirent.isFile() && configFileRegex.test(dirent.name)) {
    const filePath = path.resolve(CONFIG_DIR, dirent.name);
    let fileContents = require(filePath);

    if (typeof fileContents === 'function') {
      fileContents = fileContents({ ...config });
    }

    validFileContents(fileContents);

    if (doConfigReplace) {
       config = fileContents;
    } else {
      config = {
        ...config,
        ...fileContents,
        routes: [
          ...(config.routes || []),
          ...(fileContents.routes || []),
        ]
      };
    }
  }
}

module.exports = config;
