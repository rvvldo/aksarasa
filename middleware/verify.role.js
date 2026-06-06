import { verifikasiToken } from "./auth.middleware";
import { errorHandler } from "./errorhandler.middleware";

export const verifyRole = (requiredRole) => { //disini kita akan membuat middleware untuk memverifikasi role user, yang dimana kita akan memasukkan requiredRole sebagai parameter, sehingga kita bisa menentukan role apa saja yang bisa mengakses resource tersebut, dan juga agar bisa di maintenance kedepannya, sehingga apabila ada perubahan pada role yang bisa mengakses resource tersebut, kita hanya perlu mengubahnya di satu tempat saja yaitu di middleware ini, sehingga lebih efisien dan mudah untuk di maintenance kedepannya
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          code: "UNAUTHORIZED",
          message: "Anda harus login untuk mengakses resource ini.",
        }); //apabila req.user tidak ada maka akan return json dan status 401, karena itu berarti user belum login atau token tidak valid
      }
      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          code: "FORBIDDEN",
          message: "Anda tidak memiliki izin untuk mengakses resource ini.",
        }); //apabila role user tidak sesuai dengan requiredRole maka akan return json dan status 403, karena itu berarti user tidak memiliki izin untuk mengakses resource tersebut
      }
      next();
    } catch (error) {
      next(error); //apabila terjadi error maka akan diteruskan ke error handler middleware untuk ditangani, sehingga kita bisa menghindari duplikasi kode untuk menangani error di setiap middleware atau route handler yang kita buat, dan juga agar bisa di maintenance kedepannya, sehingga apabila ada perubahan pada cara menangani error, kita hanya perlu mengubahnya di satu tempat saja yaitu di error handler middleware, sehingga lebih efisien dan mudah untuk di maintenance kedepannya
    }
  };
};
