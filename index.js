const nacl = require("tweetnacl")
nacl.util = require("tweetnacl-util");

const generateKeyPair = function() {
    let keys = nacl.sign.keyPair();
    const secretKey = nacl.util.encodeBase64(keys.secretKey)
    const publicKey = nacl.util.encodeBase64(keys.publicKey)

    return {
        secretKey,
        publicKey
    }
}

const sign = function(message, secretKey) {
    const secretKeyUint8Array = _decodeSecretKey(secretKey)
    if (!secretKeyUint8Array) return;
    const messageUint8Array = nacl.util.decodeUTF8(message)
    const signature = nacl.sign.detached(messageUint8Array, secretKeyUint8Array)
    return nacl.util.encodeBase64(signature)
}

const verify = function(publicKey, signature, message) {
    signature = _decodeSignature(signature)
    publicKey = _decodePublicKey(publicKey)
    message = nacl.util.decodeUTF8(message)
    const verification = nacl.sign.detached.verify(message, signature, publicKey)

    if (!signature || !publicKey || !message || !verification) {
        return false
    }

    return true
}

const _decodePublicKey = function(publicKey) {
    try {
      const publicKeyDecoded = nacl.util.decodeBase64(publicKey);
      if (publicKeyDecoded.length != nacl.sign.publicKeyLength) {
        throw new Error('Bad public key length: must be ' + nacl.sign.publicKeyLength + ' bytes');
      }
      return publicKeyDecoded;
    } catch(e) {
      throw new Error('Failed to decode public key from Base64');
    }
}

const _decodeSecretKey = function(secretKey) {
    try {
      var secretKeyDecoded = nacl.util.decodeBase64(secretKey);
      if (secretKeyDecoded.length != nacl.sign.secretKeyLength) {
        throw new Error('Bad secret key length: must be ' + nacl.sign.secretKeyLength + ' bytes')
      }
      return secretKeyDecoded;
    } catch(e) {
      throw new Error('Failed to decode secret key from Base64');
    }
}

const _decodeSignature = function(signature) {
    try {
      var signDecoded = nacl.util.decodeBase64(signature);
      if (signDecoded.length != nacl.sign.signatureLength) {
        throw new Error('Bad signature length: must be ' + nacl.sign.signatureLength + ' bytes');
      }
      return signDecoded;
    } catch(e) {
      throw new Error('Failed to decode signature from Base64');
    }
}

exports.generateKeyPair = generateKeyPair;
exports.sign = sign;
exports.verify = verify;