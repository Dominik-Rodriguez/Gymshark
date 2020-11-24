module.exports = {
    orderHistory: (req, res) => {
        const db = req.app.get('db');
        const email = req.session.user.email;

        db.orderHistory.orders(email)
        .then(orderHistory => res.status(200).send(orderHistory))
        .catch(err => res.status(500).send(err));
    },
    userInfo: (req, res) => {
        const db = req.app.get('db');
        const email = req.session.user.email;
        // const info = await db.orderHistory.userInfo(email)
        // res.status(200).send(info)
        db.orderHistory.userInfo(email)
        .then(userInfo => res.status(200).send(userInfo[0]))
        .catch(err => res.status(500).send(err));
    },
    singlePurchase: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.orderHistory.singlePurchaseItems(id)
        .then(purchase => res.status(200).send(purchase))
        .catch(err => res.status(500).send(err));
    }
}