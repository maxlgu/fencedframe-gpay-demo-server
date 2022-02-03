// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START gae_flex_node_static_files]
'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'public/trusted-merchants.json'));
let trustedMerchants = JSON.parse(rawdata);


const app = express();

// app.set('view engine', 'pug');
app.use((req, res, next) => {
    res.setHeader('Supports-Loading-Mode', 'fenced-frame');
    next();
});

app.use('/fencedframe.html', (req, res, next) => {
  const site = req.headers['top-level-site'];
  if (site && !trustedMerchants.includes(site)) {
    res.sendFile(path.join(__dirname, '/views/gpay.html'));
    return;
  }
  next();
});

// Use the built-in express middleware for serving static files from './public'
// app.use('/static', express.static('public'));
app.use(express.static('views'))
app.use(express.static('public'))
// app.use(express.static(__dirname + '/views'));

// app.get('/',function(req,res) {
//   res.setHeader('Supports-Loading-Mode', 'fenced-frame');
//   res.sendFile(path.join(__dirname, '/views/index.html'));
// });

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_node_static_files]
