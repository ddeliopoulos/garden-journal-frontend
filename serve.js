const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const fs = require('fs');
const https = require('https');

const historyLibName = 'connect-history-api-fallback';
if (!fs.existsSync(historyLibName)){
  fs.mkdirSync(historyLibName);
}

const file = fs.createWriteStream(`${historyLibName}/index.js`);
https.get("https://unpkg.com/connect-history-api-fallback@1.6.0/lib/index.js", function(response) {
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const history = require('connect-history-api-fallback');

      const app = express()

      // Use a fallback for non-root routes (required for Vue router)
      //   NOTE: History fallback must be "used" before the static serving middleware!
      app.use(history({
        // OPTIONAL: Includes more verbose logging
        verbose: true
      }))

      // Serve static assets from the build files (images, etc)
      app.use(serveStatic(path.join(__dirname, '/dist')))

      const port = process.env.PORT || 8081

      app.listen(port, () => console.log(`listening on port ${port}`));
    });
  });
});