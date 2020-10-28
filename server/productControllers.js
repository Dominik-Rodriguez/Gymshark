module.exports = {
    //homepage endpoints
    getMensProducts: (req, res) => {
        const db = req.app.get('db');

        db.setup.getMensProducts()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getAccessories: (req, res) => {
        const db = req.app.get('db');

        db.setup.getAccessories()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getWomensProducts: (req, res) => {
        const db = req.app.get('db');

        db.setup.getWomensProducts()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },

    //mens endpoints
    getProduct: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.Products.getProduct({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },
    getMensLikeProducts: (req, res) => {
        const {description} = req.params;
        const db = req.app.get('db');

        db.Products.getMensLikeProducts({description})
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getMenDifferentProduct: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.Products.getMenDifferentProduct({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },

    //womens endpoints
    getWomenProduct: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.Products.getWomenProduct({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },
    getWomensLikeProduct: (req, res) => {
        const {description} = req.params;
        const db = req.app.get('db');

        db.Products.getWomensLikeProducts({description})
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getWomenDifferentProduct: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.Products.getWomenDifferentProduct({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },

    //Accessory endpoint
    getAccessory: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.Products.getAccessory({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },
    getDifferentAccessory: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.Products.getDifferentAccessory({id})
        .then(product => res.status(200).send(product[0]))
        .catch(err => res.status(500).send(err));
    },
    LikeAccessories: (req, res) => {
        const {description} = req.params;
        const db = req.app.get('db');

        db.Products.getLikeAccessories({description})
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    }
}