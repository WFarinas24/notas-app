import { FloatingLabel, Table, Textarea } from "flowbite-react";
import { Card, Label, TextInput } from "flowbite-react";
import {
  EditarNota,
  EliminarNota,
  EstablecerFavorito,
  GuardarNota,
  ObtenerNotas,
} from "../services/services";
import { act, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { MdStar } from "react-icons/md";

import { Alert } from "flowbite-react";
import { MdSave } from "react-icons/md";
import { HeaderApp } from "../components/HeaderApp";

export const NuevaNota = ({ notas, actualizarTabla, setautenticado }) => {
  const [texto, setTexto] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cargando, setCargando] = useState({ id: -1, cargando: false });
  const [edit, setEdit] = useState({ id: -1, editar: false, text: "" });

  return (
    <>
      <HeaderApp setautenticado={setautenticado}></HeaderApp>
      <Card className="mx-4 mt-4">
        <h2 className="font-bold">Notas</h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nota" value="Escribe tu nota" />
          </div>
          <TextInput
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
            }}
            id="nota"
            type="nota"
            placeholder="nota"
            required
            shadow
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await GuardarNota(texto);
                setTexto("");
                actualizarTabla(await ObtenerNotas());
              }
            }}
          />
        </div>

        <div className="overflow-x-auto">
          {showAlert && (
            <Alert
              color="success"
              onDismiss={() => {
                setShowAlert(false);
              }}
            >
              <span className="font-medium">Información!</span>
              <span>Se ha copiado el texto</span>
            </Alert>
          )}

          <Table className="px-4">
            <Table.Head>
              <Table.HeadCell className="w-52">Contenido</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell className="w-10">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {notas?.map((x, index) => {
                return (
                  <Table.Row
                    key={index}
                    className={"bg-white dark:border-gray-700 dark:bg-gray-800"}
                  >
                    <Table.Cell className="text-wrap break-words whitespace-nowrap font-medium text-gray-900 dark:text-white items-center">
                      {!edit.editar ? (
                        <FaPencilAlt
                          size={24}
                          onClick={() => {
                            setEdit({
                              editar: true,
                              id: x.id,
                              text: x.nota_texto,
                            });
                          }}
                          className="hover:scale-125"
                        />
                      ) : (
                        edit.id == x.id && (
                          <MdSave
                            size={24}
                            className="hover:scale-125"
                            onClick={async () => {
                              await EditarNota(x.id, edit.text);
                              actualizarTabla(await ObtenerNotas());
                              setEdit({
                                editar: false,
                                id: -1,
                                text: "",
                              });
                            }}
                          />
                        )
                      )}

                      {edit.editar && edit.id == x.id ? (
                        <Textarea
                          value={edit.text}
                          onChange={(e) => {
                            setEdit({ ...edit, text: e.target.value });
                          }}
                          rows={4}
                        />
                      ) : (
                        <div style={{ maxHeight: "100px", overflowY: "auto" }}>
                          <Label style={{ height: "20px" }}>
                            {x.nota_texto}
                          </Label>
                        </div>
                      )}
                    </Table.Cell>
                    <Table.Cell className="w-40">
                      {new Date(x.created_at).toLocaleDateString("en-GB")}
                    </Table.Cell>
                    <Table.Cell className="w-40 flex items-center">
                      <MdContentCopy
                        className="hover:text-gray-800 hover:scale-125"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(x.nota_texto)
                            .then(function () {
                              setShowAlert(true);

                              setTimeout(() => {
                                setShowAlert(false);
                              }, 2000);
                            });
                        }}
                        size={24}
                      />
                      <MdDeleteOutline
                        className={
                          "hover:text-red-800 hover:scale-125" +
                          (cargando.cargando && cargando.id == x.id
                            ? " animate-bounce"
                            : "")
                        }
                        onClick={async () => {
                          setCargando({ cargando: true, id: x.id });
                          await EliminarNota(x.id);
                          actualizarTabla(await ObtenerNotas());
                          setCargando({ cargando: false, id: -1 });
                        }}
                        size={30}
                      />
                      {!x.favorito ? (
                        <MdStarBorder
                          className="hover:scale-125"
                          size={32}
                          onClick={async () => {
                            await EstablecerFavorito(x.id, !x.favorito);
                            actualizarTabla(await ObtenerNotas());
                          }}
                        />
                      ) : (
                        <MdStar
                          className="text-yellow-300 hover:scale-125"
                          size={32}
                          onClick={async () => {
                            await EstablecerFavorito(x.id, !x.favorito);
                            actualizarTabla(await ObtenerNotas());
                          }}
                        />
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </>
  );
};
