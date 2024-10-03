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
import { useStoreCategorias, useStoreNotas } from "../services/estadoGlobal";
import { ObtenerCategorias } from "../services/services";
import { ObtenerIcono } from "../util/Iconos";
import { SetIdCategoria } from "../services/autenticacion";

export const TabsComponent = ({ notas, actualizarTabla, setautenticado }) => {
  const actualizarCategorias = useStoreCategorias((x) => x.actualizar);
  const actualizarnotas = useStoreNotas((x) => x.actualizar);
  const listaCategorias = useStoreCategorias((x) => x.categorias);

  const [openModal, setOpenModal] = useState(false);

  async function iniciar() {
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
          },
          ...listaCategorias,
        ].map((x) => {
          return (
            <Tooltip content={x.nombre}>
            <Button
              onClick={async() => {
                SetIdCategoria(x.id);
                actualizarnotas()
              }}
              key={x.id ?? -2}
              className="flex items-center max-w-60"
              color={"gray"}
            >
              <div className="max-w-md">{ObtenerIcono(x.icono)}</div>
              <Label>{x.nombre.substring(0, 8)}</Label>
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
