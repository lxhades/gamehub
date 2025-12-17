import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Hãy đăng nhập với vai trò quản trị viên");
      navigate("/login", { replace: true });
      return;
    }

    if (user.role !== "admin") {
      alert("Bạn không có quyền truy cập trang quản trị");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") return null;

  return children;
};

export default ProtectedAdminRoute;
