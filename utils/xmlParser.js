const { XMLParser, XMLBuilder } = require("fast-xml-parser");

const xmlParserOptions = {
    ignoreAttributes: false,
};

const parser = new XMLParser(xmlParserOptions);

const builder = new XMLBuilder();

module.exports = { parser, builder };
