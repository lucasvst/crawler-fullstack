const config = require('./../config/api');
const writer = require('./persistence/api')(config);
const checksum = require('./checksum');

const write = rows => {

    const myRows = rows.map(r => Object.assign({}, r, { checksum: checksum(r) }));
    writer(myRows);
}

module.exports = write;