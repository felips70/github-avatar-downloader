var request = require('request');
var fs = require('fs');
var theRepoOwner =  process.argv[2];
var theRepoName =  process.argv[3];
var dotenv = require('dotenv').config()
var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {url: requestURL,
                 headers:{'User-Agent': 'felip70'}
               };
  request.get(options, cb);
}

function downloadImageByURL(url, filePath) {
  if(fs.existsSync('./avatars') === false) {
    fs.mkdirSync('./avatars');
  }
  request.get(url)
         .on('error', function (err) {
         throw err;
          })
         .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
}


  if (!theRepoOwner || !theRepoName) {
    console.error('Please specify repoOwner and repoName');
  }

  if (process.argv.length >= 5) {
    console.error('Incorrect number of arguments given to program, please specify repoOwner and repoName');
  }

  if (!GITHUB_TOKEN || !GITHUB_USER) {
    console.error('Please create and populate .env file')
  }

  else {

getRepoContributors(theRepoOwner, theRepoName, function(err, result) {
  if (err) {
  console.log('Errors:', err);
}
  var json = JSON.parse(result.body);
  if(json.message === 'Bad credentials') {
  console.error('Please imput correct credentials in .env file');
  throw err;
}

  json.forEach(function(element) {
    downloadImageByURL(element.avatar_url, element.login)
  });

});
}
