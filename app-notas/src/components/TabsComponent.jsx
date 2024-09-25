import React, { useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import {
  HiAdjustments,
  HiClipboardList,
  HiUserCircle,
  HiPlusCircle,
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useRef } from "react";
import { NuevaNota } from "../pages/NuevaNota";
import { ModalAgregarCategoria } from "./ModalAgregarCategoria";

const ObtenerIcono = (icono) => {
  switch (icono) {
    case "Nuevo":
      return HiPlusCircle;

    default:
      return HiUserCircle;
  }
};

export const TabsComponent = ({
  notas,
  actualizarTabla,
  setautenticado,
  setNotas,
  tabs = [
    {
      nombre: "Importantes",
      component: (
        <NuevaNota
          notas={notas}
          actualizarTabla={setNotas}
          setautenticado={setautenticado}
        ></NuevaNota>
      ),
    },
    {
      nombre: "Dos",
    },
    {
      nombre: "Nuevo",
      icon: "Nuevo",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ModalAgregarCategoria setOpenModal={setOpenModal} openModal={openModal} />
      <Tabs
        aria-label="Default tabs"
        variant="default"
        onActiveTabChange={(tab) => {
          if (tabs.length - 1 == tab) {
            setOpenModal(true)
          }
        }}
      >
        {tabs.map((x) => {
          return (
            <Tabs.Item active title={x.nombre} icon={ObtenerIcono(x.icon)}>
              {x.component}
            </Tabs.Item>
          );
        })}
      </Tabs>
    </>
  );
};
