const fs = require('fs');

const commitMsgFile = process.argv[2];
const prefix = '[MODERN-SPA] ';

let msg = fs.readFileSync(commitMsgFile, 'utf8');
if (!msg.startsWith(prefix)) {
  msg = prefix + msg;
  fs.writeFileSync(commitMsgFile, msg);
} 