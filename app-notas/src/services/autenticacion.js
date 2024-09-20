import { cifrar } from "./seguridad";

export const ObtenerId = () => {
  return localStorage.getItem("idUsuario");
};

export const ObtenerClave = () => {
  return localStorage.getItem("contrasena");
};

export const SetUsuaraio = (idUsuario, contrasena) => {
  localStorage.setItem("idUsuario", idUsuario);
  localStorage.setItem("contrasena", contrasena);
};

export const cerrarSesion = (idUsuario) => {
  return localStorage.removeItem("idUsuario");
};

export const EsAutenticado = () => {
  return localStorage.getItem("idUsuario") != null;
};
