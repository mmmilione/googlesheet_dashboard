const crypto = require('crypto');

const generate = (mail, chars) => {
    const ts = new Date().getTime();
    const pw = crypto.createHash('sha1').update(ts + mail).digest('hex').slice(0, chars);
    return pw;
}

module.exports = generate;