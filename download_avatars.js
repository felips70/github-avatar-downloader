var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "felips70";
var GITHUB_TOKEN = "679bbc02e4e7d7257a37d47186c08f9fc9a0082b";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {url: requestURL,
                 headers:{'User-Agent': 'felip70'}
               };
  request.get(options, cb);
}


getRepoContributors("jquery", "jquery", function(err, result) {
  var json = JSON.parse(result.body);
  var avatarURLs = [];
  for(var i = 0; i < json.length; i++) {
    avatarURLs.push(json[i].avatar_url);
  }
  console.log(avatarURLs);
});