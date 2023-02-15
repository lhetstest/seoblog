const { trim } = require("lodash");

exports.smartTrim = (str, length, delim, appendix) => {
    if(str.length <= length) return str;

    let trimmedSTR = str.substr(0, length+delim.length);

    let lastDelimIndex = trimmedSTR.lastIndexOf(delim);

    if(lastDelimIndex >=0) trimmedSTR = trimmedSTR += appendix;
    return trimmedSTR;
}