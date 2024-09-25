import { useState } from "react";
import { cerrarSesion } from "../services/autenticacion";

export const HeaderApp = ({setautenticado}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex  items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Notas</span>
            <img
              alt=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            Notas
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>

        <div className=" lg:flex lg:flex-1 lg:justify-end">
          <a
            onClick={() => {
              cerrarSesion();
              setautenticado(false)
            }}
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cerrar Sesion
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
