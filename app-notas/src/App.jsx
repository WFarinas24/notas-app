import { useEffect, useState } from "react";
import "./App.css";
import { NuevaNota } from "./pages/NuevaNota";
import { ObtenerCategorias, ObtenerNotas } from "./services/services";
import { Button, Label, TextInput } from "flowbite-react";
import { EsAutenticado } from "./services/autenticacion";
import { Login } from "./pages/Login";
import { TabsComponent } from "./components/TabsComponent";
import { ModalAgregarCategoria } from "./components/ModalAgregarCategoria";
import { HeaderApp } from "./components/HeaderApp";
import { useStore } from "./services/estadoGlobal";

function App() {

  
  const [autenticado, setautenticado] = useState(false);

  
  useEffect(() => {
    setautenticado(EsAutenticado());

  }, [autenticado]);

  return (
    <>
      {EsAutenticado() ? (
        //<ModalAgregarCategoria></ModalAgregarCategoria>

        <>
          <HeaderApp setautenticado={setautenticado}></HeaderApp>
          <TabsComponent
            setautenticado={setautenticado}
          ></TabsComponent>
        </>
      ) : (
        <Login setautenticado={setautenticado}></Login>
      )}
    </>
  );
}

export default App;
