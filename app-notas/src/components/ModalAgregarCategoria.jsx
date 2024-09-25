import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

import { Badge } from "flowbite-react";
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
import { FaCheckCircle } from "react-icons/fa";
const iconList = [
  { texto: "Nuevo", icono: <HiPlusCircle size={32} /> },
  { texto: "HiAcademicCap", icono: <HiAcademicCap size={32} /> },
  { texto: "HiBriefcase", icono: <HiBriefcase size={32} /> },
  { texto: "HiBan", icono: <HiBan size={32} /> },
  { texto: "HiExclamationCircle", icono: <HiExclamationCircle size={32} /> },
  { texto: "HiHome", icono: <HiHome size={32} /> },
  { texto: "HiKey", icono: <HiKey size={32} /> },
  { texto: "HiHeart", icono: <HiHeart size={32} /> },
  { texto: "HiCheckCircle", icono: <HiCheckCircle size={32} /> },
  { texto: "HiAtSymbol", icono: <HiAtSymbol size={32} /> },
  { texto: "HiBell", icono: <HiBell size={32} /> },
  { texto: "HiCloud", icono: <HiCloud size={32} /> },
  { texto: "default", icono: <HiUserCircle size={32} /> },
];
const badgeColors = [
  { text: "Azul", color: "info" },
  { text: "Negro", color: "gray" },
  { text: "Rojo", color: "failure" },
  { text: "Verde", color: "success" },
  { text: "Amarillo", color: "warning" },
  { text: "Indigo", color: "indigo" },
  { text: "Púrpura", color: "purple" },
  { text: "Rosa", color: "pink" },
];

export function ModalAgregarCategoria({openModal, setOpenModal}) {

  const [data, setdata] = useState({
    icono: "default",
    color: "info",
  });

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Categoria
            </h3>
            <div>
              <div className="block">
                <Label htmlFor="email" value="Nombre" />
              </div>
              <TextInput id="email" placeholder="Nombre" required />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="email" value="Color" />
              </div>

              <div className="flex flex-wrap gap-2">
                {badgeColors.map((x) => {
                  return <Badge onClick={()=> {
                    setdata({...data, color : x.color})
                  }} className="relative" key={x.color} color={x.color} size="sm">
                    {x.text}
                    {x.color == data.color && (
                          <FaCheckCircle
                            className="absolute"
                            style={{
                              right: "-4px",
                              top: "-4px",
                            }}
                          />
                        )}
                  </Badge>;
                })}
              </div>

              <div>
                <div className="block">
                  <Label htmlFor="email" value="Icono" />
                </div>

                <div className="grid grid-rows-5 md:grid-rows-3 grid-flow-col gap-1 ">
                  {iconList.map((x) => {
                    return (
                      <div
                        onClick={() => {
                          setdata({ ...data, icono: x.texto });
                        }}
                        className={
                          "relative border-2 p-3 rounded-md justify-items-center m-auto " +
                          (x.texto == data.icono ? "border-black ": "")
                        }

                      >
                        {x.icono}
                        {x.texto == data.icono && (
                          <FaCheckCircle
                            className="absolute"
                            style={{
                              right: "2px",
                              top: "2px",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full">
              <Button>Crear</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
