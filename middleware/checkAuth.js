// middleware untuk ngeamanin halaman halaman yang user harus terautentikasi dlu untuk ngakses halaman-halamannya
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); // User sudah login, lanjutkan ke handler berikutnya
    } else {
        res.redirect('/login');
    }
};
