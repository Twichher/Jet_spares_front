import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./modules/myroutes/MyRoutes";
import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { MainSparePage } from "./MainSparePage";
import { InfoSparePage } from "./pages/InfoSparePage/InfoSparePage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import { PrivateUser } from "./pages/PrivateUser/PrivateUser";
import { ChangeInfoPage } from "./pages/ChangeInfoPage/ChangeInfoPage";
import { OrdersList } from "./pages/OrdersList/OrdersList";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path={ROUTES.HOME} index element={<WelcomePage />} />
        <Route path={ROUTES.REG} element={<RegistrationPage />} />
        <Route path={ROUTES.LOG} element={<LoginPage />} /> 
        <Route path={ROUTES.SPARES} element={<MainSparePage />} /> 
        <Route path={`${ROUTES.SPARES}/:id_spare`} element={<InfoSparePage />} />
        <Route path={`${ROUTES.ORDER}/:id_order`} element={<OrderPage />} />
        <Route path={`${ROUTES.USER}/:username`} element={<PrivateUser />} />
        <Route path={`${ROUTES.USERINFO}`} element={<ChangeInfoPage />} />
        <Route path={`${ROUTES.USERORDERS}`} element={<OrdersList />} />

      </Routes>
    

    </BrowserRouter>

  )
}

export default App
