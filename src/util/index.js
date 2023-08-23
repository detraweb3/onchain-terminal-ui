import CryptoJS from "crypto-js";

const EncryptData = (data, encryptionKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

const DecryptData = (ciphertext, encryptionKey) => {
  console.log(ciphertext, encryptionKey);
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  let data;
  try {
    data = { data: JSON.parse(bytes.toString(CryptoJS.enc.Utf8)), err: null };
  } catch (err) {
    data = { data: {}, err: true };
  }
  return data;
};

export { EncryptData, DecryptData };
