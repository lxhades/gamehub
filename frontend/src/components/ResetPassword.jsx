import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const userId = searchParams.get("id");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/games/reset-password", { userId, token, newPassword: password });
            alert(res.data.message);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
            <div className="bg-white shadow-lg p-6 rounded-lg w-80 text-black">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Quên mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black"
                    />
                    <button type="submit"  className="text-black">Đặt lại mật khẩu</button>
                </form>

            </div>
        </div>
    );

};

export default ResetPassword;
