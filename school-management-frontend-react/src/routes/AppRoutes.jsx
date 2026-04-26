import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlumnosPage from '../pages/AlumnosPage';
import FormPage from '../pages/FormPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlumnosPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
