/* eslint-disable */
import * as fs from 'fs';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';

const filePattern = './static/messages/**/*.json';
const outputLanguageDataDir = './static/locales/';
const inputLanguageDataDir = './src/i18n/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(filePattern)
  .map((filename) => fs.readFileSync(filename, 'utf8'))
  .map((file) => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      // if (collection.hasOwnProperty(id)) {
      //   throw new Error(`Duplicate message id: ${id}`);
      // }
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

const langs = ['en', 'zh-TW', 'zh-CN-education', 'zh-TW-education', 'en-education'];
const langsMessages = {};
langs.forEach(langKey => {
  const filePath = inputLanguageDataDir + langKey + '.json';
  if (fs.existsSync(filePath)) {
    langsMessages[langKey] = fs.readFileSync(filePath, 'utf8');
  } else {
    console.log('lost file ' + filePath);
  }
});

mkdirpSync(outputLanguageDataDir);

let messagesStr = '';
Object.keys(langsMessages).forEach(langKey => messagesStr += `, "${langKey}": ${langsMessages[langKey]}`);

fs.writeFileSync(outputLanguageDataDir + 'zh-cn.json', `{ "zh-CN": ${JSON.stringify(defaultMessages, null, 2)}}`);
fs.writeFileSync(outputLanguageDataDir + 'data.json', `{ "zh-CN": ${JSON.stringify(defaultMessages, null, 2)} ${messagesStr}}`);
