export function parseJwt(token_u) {
    var base64Payload = token_u.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    var decode=JSON.parse(payload.toString());
    return decode;
  }