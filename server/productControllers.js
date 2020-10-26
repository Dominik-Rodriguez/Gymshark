module.exports = {
    getMensProducts: (req, res) => {
        const db = req.app.get('db');

        db.setup.getMensProducts()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getWomensProducts: (req, res) => {
        const db = req.app.get('db');

        db.setup.getWomensProducts()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getAccessories: (req, res) => {
        const db = req.app.get('db');

        db.setup.getAccessories()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    }
}