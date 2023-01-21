const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const http = require("http")

const xmlFile = `<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications 
      with XML.</description>
   </BOOK>   
</catalog>`;

http.get('http://passerelledi.defouest.fr/rest', function(result) {
  result.on('data', function (data) {
    console.log(data)
    const parser = new XMLParser();
    let jObj = parser.parse(data);

    const builder = new XMLBuilder();
    const xmlContent = builder.build(jObj);

    console.log(jObj)
    });
  }).on('error', function(e) {
  console.log('Got error: ' + e.message);
});

