module.exports = {
    orderHistory: (req, res) => {
        const db = req.app.get('db');
        const email = req.session.user.email;

        db.orderHistory.orders(email)
        .then(orderHistory => res.status(200).send(orderHistory))
        .catch(err => res.status(500).send(err));
    }
}