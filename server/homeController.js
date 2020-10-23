module.exports = {
    maleHomePage: (req, res) => {
        const db = req.app.get('db');

        db.setup.getHomeMens()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    femaleHomePage: (req, res) => {
        const db = req.app.get('db');

        db.setup.getHomeWomens()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    }
}