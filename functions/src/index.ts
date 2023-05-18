// for some reason i wasn't able to get this to work with import statements

const functions = require('firebase-functions')

exports.helloWorld = functions.https.onRequest(function (request, response) {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
