exports.index = async (req, res) => {
    res.render("index", {
        title: "Ana Sayfa | Etüt Planlama Sistemi",
        activePage: "dashboard",
    });
};

exports.login = (req, res) => {
    res.render("login", {
        title: "Yönetici Giriş | Etüt Planlama Sistemi",
    });
};
