import { WelcomePage } from './components/WelcomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./modules/MyRoutes";
import { MainPageSpares } from './MainPageSpares';
import { SpareInfoPage } from './components/SpareInfoPage';
import { useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { RegistrationPage } from './components/RegistrationPage';
import { LoginPage } from './components/LoginPage';
import { OrderPage } from './components/OrderPage';
import { PrivateUser } from './components/privateUser';
import { ChangeInfo } from './components/changeInfo';
import.meta.env.VITE_DEVELOPER_MINDSET;


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

      <BrowserRouter>

        <Routes>
          <Route path={ROUTES.HOME} index element={<WelcomePage />} />
          <Route path={ROUTES.SPARES} element={<MainPageSpares />} />
          <Route path={`${ROUTES.SPARES}/:id_spare`} element={<SpareInfoPage />} />
          <Route path={ROUTES.REG} element={<RegistrationPage />} />
          <Route path={ROUTES.LOG} element={<LoginPage />} />
          <Route path={`${ROUTES.ORDER}/:id_order`} element={<OrderPage />} />
          <Route path={`${ROUTES.USER}/:id_user`} element={<PrivateUser />} />
          <Route path={`${ROUTES.USERINFO}/:id_user`} element={<ChangeInfo />} />
        </Routes>

      </BrowserRouter>

  )
}

export default App
