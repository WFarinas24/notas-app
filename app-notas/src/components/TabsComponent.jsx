import React, { useEffect, useState } from "react";

import { Button, Label, Tooltip  } from "flowbite-react";
import {
  HiAdjustments,
  HiClipboardList,
  HiUserCircle,
  HiPlusCircle,
} from "react-icons/hi";
import { NuevaNota } from "../pages/NuevaNota";
import { ModalAgregarCategoria } from "./ModalAgregarCategoria";
import { useStoreCategorias, useStoreIdCategoria, useStoreNotas } from "../services/estadoGlobal";
import { ObtenerColorCss, ObtenerIcono } from "../util/Iconos";
import { ObtenerIdCategoria, SetIdCategoria } from "../services/autenticacion";

export const TabsComponent = ({ notas, actualizarTabla, setautenticado }) => {
  const actualizarCategorias = useStoreCategorias((x) => x.actualizar);
  const actualizarnotas = useStoreNotas((x) => x.actualizar);
  const listaCategorias = useStoreCategorias((x) => x.categorias);

  const actualizarIdCategoria = useStoreIdCategoria((x) => x.actualizar);
  const categoriaId = useStoreIdCategoria((x) => x.idCategoria);


  const [openModal, setOpenModal] = useState(false);

  async function iniciar() {
    actualizarIdCategoria(ObtenerIdCategoria());
    console.log(ObtenerIdCategoria())
    actualizarCategorias();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <>
      <ModalAgregarCategoria
        setOpenModal={setOpenModal}
        openModal={openModal}
      />

      <div className="max-w-5xl flex flex-wrap">
        {[
          {
            nombre: "Importantes",
            icono: "HiUserCircle",
            id : null
          },
          ...listaCategorias,
        ].map((x) => {
          return (
            <Tooltip content={x.nombre}>
            <Button
              onClick={async() => {
                SetIdCategoria(x.id ?? "null");
                actualizarIdCategoria(x.id ?? "null")
                actualizarnotas()
              }}
              key={x.id ?? -2}
              className="flex items-center max-w-60"
              color={categoriaId == (x.id ?? "null" ) ? x.color : "gray"}
              style={{
                borderBottom : "4px solid " + ObtenerColorCss(x.color)
              }}
            >
              <div className="max-w-md">{ObtenerIcono(x.icono)}</div>
              <Label className={categoriaId == (x.id ?? "null" )?"text-white" : ""}>{x.nombre.substring(0, 20)}</Label>
            </Button>
            </Tooltip>
          );
        })}
        
        <Button onClick={() => setOpenModal(true)} color={"gray"}>
          <div className="max-w-md ">{ObtenerIcono("Nuevo")}</div>
          Nuevo
        </Button>
      </div>
      <NuevaNota
        notas={notas}
        actualizarTabla={actualizarTabla}
        setautenticado={setautenticado}
      ></NuevaNota>
    </>
  );
};
