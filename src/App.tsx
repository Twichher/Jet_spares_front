import { WelcomePage } from './components/WelcomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./modules/MyRoutes";
import { MainPageSpares } from './MainPageSpares';
import { SpareInfoPage } from './components/SpareInfoPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} index element={<WelcomePage />} />
      <Route path={ROUTES.SPARES} element={<MainPageSpares />} />
      <Route path={`${ROUTES.SPARES}/:id_spare`} element={<SpareInfoPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
