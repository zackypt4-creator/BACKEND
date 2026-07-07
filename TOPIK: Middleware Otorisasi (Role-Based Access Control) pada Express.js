TOPIK: Middleware Otorisasi (Role-Based Access Control) pada Express.js

SOAL:
Siti mengembangkan backend untuk sebuah blog. Ia memiliki route DELETE /api/posts/:id dan ingin memastikan bahwa hanya user dengan role "ADMIN" yang boleh mengakses route tersebut.

Ketentuan:
1. Diasumsikan middleware autentikasi sebelumnya telah mengisi req.user.
2. Buat middleware bernama checkAdminRole.
3. Jika req.user ada dan req.user.role === "ADMIN", lanjutkan dengan next().
4. Jika bukan ADMIN, kembalikan status 403 dengan format JSON berikut:

{
  "success": false,
  "message": "Akses ditolak: Hak akses Admin diperlukan."
}

5. Terapkan middleware tersebut pada route DELETE.

JAWABAN:

const express = require("express");
const router = express.Router();

// Middleware Otorisasi Admin
function checkAdminRole(req, res, next) {
    if (req.user && req.user.role === "ADMIN") {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Akses ditolak: Hak akses Admin diperlukan."
    });
}

// Route DELETE hanya untuk ADMIN
router.delete("/api/posts/:id", authenticate, checkAdminRole, (req, res) => {
    res.json({
        success: true,
        message: "Postingan berhasil dihapus."
    });
});

module.exports = router;
