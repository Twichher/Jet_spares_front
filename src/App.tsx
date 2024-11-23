import { WelcomePage } from './components/WelcomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./modules/MyRoutes";
import { MainPageSpares } from './MainPageSpares';
import { SpareInfoPage } from './components/SpareInfoPage';
import { useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import.meta.env.VITE_DEVELOPER_MINDSET;


window.onerror = function (message, source, lineno, colno, error) {
  console.error("Error: ", message, "Source: ", source, "Line: ", lineno, "Column: ", colno, "Error object: ", error);
};


function App() {

  useEffect(() => {
    invoke ('tauri', {cmd : "create"})
      .then ((response : any ) => console.log(response))
      .catch ((error : any) => console.log(error))

    return () => {
      invoke ('tauri', {cmd : "close"})
      .then ((response : any ) => console.log(response))
      .catch ((error : any) => console.log(error))
    }

  }, [])

  return (

      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }} >

        <Routes>
          <Route path={ROUTES.HOME} index element={<WelcomePage />} />
          <Route path={ROUTES.SPARES} element={<MainPageSpares />} />
          <Route path={`${ROUTES.SPARES}/:id_spare`} element={<SpareInfoPage />} />
        </Routes>

      </BrowserRouter>

  )
}

export default App
