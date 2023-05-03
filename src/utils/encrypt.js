import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("kuncirahasiaaes");
const iv = CryptoJS.enc.Utf8.parse("ivrahasiaaes1234");

export function encrypt(text) {
    const cipher = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(text),
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return cipher.toString();
  }
  
  // Dekripsi teks
export function decrypt(text) {
    const cipher = CryptoJS.AES.decrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  }

const plainText = "Ini teks rahasia yang akan dienkripsi";
const encryptedText = encrypt(plainText);
console.log("Teks terenkripsi: ", encryptedText);

const decryptedText = decrypt(encryptedText);
console.log("Teks terdekripsi: ", decryptedText);