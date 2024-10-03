import { cifrar, descifrar, generarMD5 } from "./seguridad";

export const ObtenerId = () => {

  return localStorage.getItem("idUsuario");
};

export const ObtenerClave = () => {
  return localStorage.getItem("contrasena");
};

export const SetUsuaraio = (idUsuario, contrasena) => {
  localStorage.setItem("contrasena", contrasena);

  localStorage.setItem("idUsuario", generarMD5(idUsuario + contrasena));

};

export const cerrarSesion = (idUsuario) => {
  return localStorage.removeItem("idUsuario");
};

export const EsAutenticado = () => {
  return localStorage.getItem("idUsuario") != null;
};


export const ObtenerIdCategoria = () => {
  return localStorage.getItem("idCategoria") ?? null;
};

export const SetIdCategoria = (id = null) => {
  return localStorage.setItem("idCategoria", id) 
};
