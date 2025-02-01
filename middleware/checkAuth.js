// middleware untuk ngeamanin halaman halaman yang user harus terautentikasi dlu untuk ngakses halaman-halamannya
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user_id) {
        next(); // User sudah login, lanjutkan ke handler berikutnya
    } else {
        req.flash('msg', 'Silakan login terlebih dahulu');
        res.redirect('/login');
    }
};
