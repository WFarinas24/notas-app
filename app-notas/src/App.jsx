import { useEffect, useState } from "react";
import "./App.css";
import { NuevaNota } from "./pages/NuevaNota";
import { ObtenerNotas } from "./services/services";
import { Button, Label, TextInput } from "flowbite-react";
import { EsAutenticado } from "./services/autenticacion";
import { Login } from "./pages/Login";

function App() {
  const [notas, setNotas] = useState([]);
  const [autenticado, setautenticado] = useState(false);

  async function obtenerDatos() {
    setNotas(await ObtenerNotas());
  }

  useEffect(() => {
    setautenticado(EsAutenticado())

    if (autenticado) {
      obtenerDatos();
    }
  }, [autenticado]);

  return (
    <>
      {EsAutenticado() ? (
        <NuevaNota notas={notas} actualizarTabla={setNotas} setautenticado={setautenticado}></NuevaNota>
      ) : (
        <Login setautenticado={setautenticado}></Login>
      )}
    </>
  );
}

export default App;
