var https = require('https');
var fs = require('fs');
var path = require('path');
var request = require('request');
var jsYaml = require('js-yaml');
var unzip = require('unzip2');

var hubApiUrl = "https://dev.api.hub.gov.bc.ca/swagger/v1/swagger.json";

var swaggerTempFile = __dirname + path.sep + "swagger.json";

function downloadCB(models2get) {
  var codeGenEndpoint = 'http://generator.swagger.io/api/gen/clients'; // swagger-codegen

  fs.readFile(path.resolve(swaggerTempFile), 'utf8', function (error, yaml) {
    if (error) {
      throw error;
    }
    var swaggerObj = jsYaml.load(yaml);
    var postBody = {
      spec: swaggerObj,
      options: {
        modelPropertyNaming: 'camelCase',
        apiPackage: 'services',
        modelPackage: 'view-models',
        ngVersion : "6.0"
      }
    };

    request.post({
      url: codeGenEndpoint + '/typescript-angular',
      body: JSON.stringify(postBody),
      headers: {
          'Content-Type': 'application/json'
      }
    }, function(error, response, body) {
      if (error) {
          throw error;
      }

      if (response.statusCode !== 200) {
        throw new Error('Response code was not 200. ' + body);
      }

      var responseObj = JSON.parse(body);

      request({
        url: responseObj.link,
        encoding: null
      }).pipe(unzip.Parse())
        .on('entry', function (entry) {
          var fileName = entry.path;
          var i = models2get.length;
          if (fileName.indexOf("/encoder") === -1 && fileName.indexOf("/variables") === -1 && fileName.indexOf("/configuration") === -1) {
            while (--i >= 0) {
              if (fileName.indexOf(models2get[i]) !== -1) break;
            }
          }
          if (i >= 0) {
            entry.pipe(fs.createWriteStream(fileName.replace('typescript-angular-client/', "./src/app/")));
            return;
          }
          console.log("Excluding : " + fileName);
          entry.autodrain();
        });
    });
  });
}

// invoke the download...
var download = function (url, models2get) {
  console.log("Download URL is " + url);
  console.log("Destination is " + swaggerTempFile);
  var file = fs.createWriteStream(swaggerTempFile);
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(downloadCB(models2get));  // close() is async, call downloadCB after close completes.
    });
  });
}

//generate services for message and socialMediaPost, but not activities
downloadCB(["/message", "/socialMediaPost", "/activity.ts", "/post.ts", "/document", "/ministries"]);
//download(hubApiUrl, ["/message", "/socialMediaPost", "/activity.ts", "/post.ts", "/document"]);
