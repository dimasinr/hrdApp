export function encryptToken(message) {
  var encryptedMessage = "";
  for (var i = 0; i < message.length; i++) {
    var charCode = message.charCodeAt(i);
    if (65 <= charCode && charCode <= 90) {
      encryptedMessage += String.fromCharCode(((charCode - 65 + 2) % 26) + 65);
    } else if (97 <= charCode && charCode <= 122) {
      encryptedMessage += String.fromCharCode(((charCode - 97 + 2) % 26) + 97);
    } else {
      encryptedMessage += message.charAt(i);
    }
  }
  return encryptedMessage;
}

export function decryptToken(encryptedMessage) {
  return encryptToken(encryptedMessage, 26 - 2);
}