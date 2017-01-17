var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "felips70";
var GITHUB_TOKEN = "679bbc02e4e7d7257a37d47186c08f9fc9a0082b";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  return requestURL;
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});