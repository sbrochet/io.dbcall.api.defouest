const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const http = require("http")
var pino = require('pino')
const dotenv = require('dotenv')

dotenv.config()

const logger = pino({
  level: process.env.LOG_LEVEL
})

http.get('http://passerelledi.defouest.fr/rest', function(res) {
  var response_data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        response_data += chunk;
    });
    res.on('end', function() {
      const parser = new XMLParser();
      let jObj = parser.parse(response_data);
        
      jObj.class.contrat.forEach(element => {
        const object={}
        for (let x in element) {
          object[x]=element[x].value.substring(1,element[x].value.length-1)          
        }
        logger.info({"event":"parse","object":object})

      });
    });
    res.on('error', function(err) {
        console.log('Got error: ' + err.message);
    });

});

