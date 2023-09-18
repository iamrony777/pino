/**
  Github issue link: https://github.com/pinojs/pino/issues/1802
  Author: https://github.com/pradeep-mishra
  Comment link: https://github.com/pinojs/pino/issues/1802#issuecomment-1715153724
*/
'use strict'

function noOpPrepareStackTrace (_, stack) {
  return stack
}

module.exports = function getCallers () {
  const originalPrepare = Error.prepareStackTrace
  Error.prepareStackTrace = noOpPrepareStackTrace
  let stack = new Error().stack
  Error.prepareStackTrace = originalPrepare

  if (!Array.isArray(stack)) {
    let stackStrs = Array.from(stack.matchAll(/\((.+)\)/gm))
    stackStrs = stackStrs.map((match) => {
      match[1] = match[1].trim();
      return match[1].split(':')[0];
    });
    stack = stackStrs;
    //return undefined
  }

  const entries = stack.slice(2)

  const fileNames = []

  for (const entry of entries) {
    if (!entry) {
      continue
    }
    fileNames.push(entry?.getFileName?.() ?? entry)
  }
  return fileNames
}

