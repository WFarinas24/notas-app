import CryptoJS from "crypto-js"
import { ObtenerClave } from "./autenticacion";


export function cifrar(texto) {
  return CryptoJS.AES.encrypt(texto, ObtenerClave()).toString();
}

export function descifrar(textoCifrado) {
  const bytes = CryptoJS.AES.decrypt(textoCifrado, ObtenerClave());
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function generarMD5(texto) {
  return CryptoJS.MD5(texto).toString();
}