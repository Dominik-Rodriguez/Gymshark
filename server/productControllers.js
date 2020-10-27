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
    },
    getProduct: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.setup.getProduct({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },
    getMensLikeProducts: (req, res) => {
        const {description} = req.params;
        const db = req.app.get('db');

        db.setup.getMensLikeProducts({description})
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    }
}