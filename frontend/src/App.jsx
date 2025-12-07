import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import CategoryGamesDetail from "./pages/CategoryGamesDetail";
import GameDetailPage from "./pages/GameDetailPage"
import Search from "./pages/Search";
import { QuanLyTK } from "./pages/User/QuanLyTK";
import ResetPassword from "./components/ResetPassword";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quantri" element={<AdminHomePage/>}/>
        <Route path='*' element={<NotFound></NotFound>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game/:id" element={<GameDetailPage />} />
        <Route path="/game/category/:name" element={<CategoryGamesDetail />} />
        <Route path="/quanlytk" element={<QuanLyTK/>} />
        <Route path="/quenmk" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}
