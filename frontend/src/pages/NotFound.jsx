export default function NotFound() {
  return (
    <div className=" flex flex-col  bg-amber-600  ">
      <div className="flex justify-center">
        <h1 className="text-white text-4xl">404 - Trang không tồn tại</h1></div>
      <div className="flex justify-center p-6">
        <a href="/" className="bg-sky-500 rounded-3xl hover:text-3xl">Quay về trang chủ</a>
      </div>
    </div>
  );
}
