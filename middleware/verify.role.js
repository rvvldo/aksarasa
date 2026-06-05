import { verifikasiToken } from "./auth.middleware";
import { errorHandler } from "./errorhandler.middleware";

export const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          code: "UNAUTHORIZED",
          message: "Anda harus login untuk mengakses resource ini.",
        });
      }
      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          code: "FORBIDDEN",
          message: "Anda tidak memiliki izin untuk mengakses resource ini.",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
