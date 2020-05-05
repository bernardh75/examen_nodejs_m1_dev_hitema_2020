const crypto = require('crypto');

function sha1Encode(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

module.exports.digestAuth = (request, response, next) => {
    const encoded = authorization.replace('Basic ', '');
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    
    const authentication = decoded.split(':');
    const authorization = request.headers.authorization;
    
    const isValid = authentication[0] === 'node' && authentication[1] === sha1Encode('password');
    isValid ? next() : response.sendStatus(401);
}
