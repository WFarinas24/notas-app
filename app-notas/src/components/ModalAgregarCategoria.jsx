import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

import { Badge } from "flowbite-react";

import { FaCheckCircle } from "react-icons/fa";
import { GuardarCategoria } from "../services/services";
import { badgeColors, iconList } from "../util/Iconos";
import { useStoreCategorias } from "../services/estadoGlobal";

import { Toaster, toast } from "sonner";

export function ModalAgregarCategoria({
  openModal,
  setOpenModal,
}) {
  const categoriaAlmacen =  useStoreCategorias(x => x.actualizar);
  
  const [data, setdata] = useState({
    icono: "default",
    color: "info",
    nombre : ""
  });


  return (
    <>
        <Toaster position="top-right" richColors  />

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Categoria
            </h3>
            <div>
              <div className="block">

                <Label htmlFor="email" />
              </div>
              <TextInput id="text" placeholder="Nombre" value={data.nombre} onChange={(e) => { 
                    setdata({...data, nombre : e.target.value}) }
                  }  required />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="email" value="Color" />
              </div>

              <div className="flex flex-wrap gap-2">
                {badgeColors.map((x, id) => {
                  return (
                    <Badge 
                      onClick={() => {
                        setdata({ ...data, color: x.color });
                      }}
                      className="relative"
                      key={x.color}
                      color={x.color}
                      size="sm"
                    >
                      {x.text}
                      {x.color == data.color && (
                        <FaCheckCircle
                          color="gray"
                          className="absolute"
                          style={{
                            right: "-4px",
                            top: "-4px",
                          }}
                        />
                      )}
                    </Badge>
                  );
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
                      key={x.texto}
                        onClick={() => {
                          setdata({ ...data, icono: x.texto });
                        }}
                        className={
                          "relative border-2 p-3 rounded-md justify-items-center m-auto " +
                          (x.texto == data.icono ? "border-black " : "")
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
              <Button onClick={async ()=> {

                if(data.nombre?.trim() == ""){
                  toast.error('Debe ingresar un nombre')
                  return;
                }
                await GuardarCategoria({ nombre : data.nombre, color : data.color, icono : data.icono})
                toast.success('Categoria "' + data.nombre + '" creada')
                setdata({
                  icono: "default",
                  color: "info",
                  nombre : ""
                })
                setOpenModal(false);
                categoriaAlmacen();
              }}>Crear</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
