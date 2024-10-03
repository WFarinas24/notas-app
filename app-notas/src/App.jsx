import { useEffect, useState } from "react";
import "./App.css";
import { EsAutenticado } from "./services/autenticacion";
import { Login } from "./pages/Login";
import { TabsComponent } from "./components/TabsComponent";
import { HeaderApp } from "./components/HeaderApp";

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
