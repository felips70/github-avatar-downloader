var request = require('request');
var fs = require('fs');
var theRepoOwner =  process.argv[2];
var theRepoName =  process.argv[3];

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

function downloadImageByURL(url, filePath) {
  if(fs.existsSync("./avatars") === false) {
    fs.mkdirSync("./avatars");
  }
  request.get(url)
         .on('error', function (err) {
         throw err;
          })
         .pipe(fs.createWriteStream("./avatars/" + filePath + '.jpg'));
}



getRepoContributors(theRepoOwner, theRepoName, function(err, result) {
  if (err) {
  console.log("Errors:", err);
}
  var json = JSON.parse(result.body);
  // var avatarURLs = [];
  // var avatarLogin = [];
  // for(var i = 0; i < json.length; i++) {
  //   avatarURLs.push(json[i].avatar_url);
  //   avatarLogin.push(json[i].login);
  // }

  json.forEach(function(element) {

    downloadImageByURL(element.avatar_url, element.login)

  })

});
