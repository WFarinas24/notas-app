

import {
    HiUserCircle,
    HiPlusCircle,
    HiAcademicCap,
    HiBriefcase,
    HiBan,
    HiExclamationCircle,
    HiHome,
    HiKey,
    HiHeart,
    HiCheckCircle,
    HiAtSymbol,
    HiBell,
    HiCloud,
  } from "react-icons/hi";


export const iconList = [
    { texto: "Nuevo", icono: <HiPlusCircle size={32} /> , component : <HiPlusCircle width={48} height={48}/>},
    { texto: "HiAcademicCap", icono: <HiAcademicCap size={32} /> , component : <HiAcademicCap width={48} height={48}/>},
    { texto: "HiBriefcase", icono: <HiBriefcase size={32} /> , component : <HiBriefcase width={48} height={48}/>},
    { texto: "HiBan", icono: <HiBan size={32} /> , component : <HiBan width={48} height={48}/>},
    { texto: "HiExclamationCircle", icono: <HiExclamationCircle size={32} /> , component : <HiExclamationCircle width={48} height={48}/>},
    { texto: "HiHome", icono: <HiHome size={32} /> , component : <HiHome width={48} height={48}/>},
    { texto: "HiKey", icono: <HiKey size={32} /> , component : <HiKey width={48} height={48}/>},
    { texto: "HiHeart", icono: <HiHeart size={32} /> , component : <HiHeart width={48} height={48}/>},
    { texto: "HiCheckCircle", icono: <HiCheckCircle size={32} /> , component : <HiCheckCircle width={48} height={48}/>},
    { texto: "HiAtSymbol", icono: <HiAtSymbol size={32} /> , component : <HiAtSymbol width={48} height={48}/>},
    { texto: "HiBell", icono: <HiBell size={32} /> , component : <HiBell width={48} height={48}/>},
    { texto: "HiCloud", icono: <HiCloud size={32} /> , component : <HiCloud width={48} height={48}/>},
    { texto: "HiUserCircle", icono: <HiUserCircle size={32} /> , component : <HiUserCircle width={48} height={48}/>},
    { texto: "default", icono: <HiUserCircle size={32} /> , component : <HiUserCircle width={48} height={48}/>},
  ];


export const badgeColors = [
    { text: "Azul", color: "info", cssColor : "rgb(21, 94, 117)"},
    { text: "Negro", color: "dark" , cssColor : "rgb(31,41,55)"},
    { text: "Rojo", color: "failure" , cssColor : "rgb(155,28,28)"},
    { text: "Verde", color: "success" , cssColor : "rgb(3,84,63)"},
    { text: "Amarillo", color: "warning" , cssColor : "rgb(227, 160, 8)"},
    { text: "Indigo", color: "blue" , cssColor : "rgb(66,56,157)"},
    { text: "Púrpura", color: "purple" , cssColor : "rgb(85,33,181)"},
  ];


  export const ObtenerColorCss = (color) => {
    const coloresSeleccionado = badgeColors.find((x) => x.color == color);
    if (coloresSeleccionado) return coloresSeleccionado.cssColor;
    return "rgb(21, 94, 117)";
  };

  
export const ObtenerIcono = (icono) => {
  const iconos = iconList.find((x) => x.texto === icono);
  if (iconos) return iconos.icono;
  return <HiUserCircle width={48} height={48}/>;
};