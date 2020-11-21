module.exports = {
    logOrder: async(req, res) => {
        const {firstName, lastName, email, state, zip, address, city, totalPrice, totalNumItems, date} = req.body;
        const db = req.app.get('db');
        const invoice = await db.invoice.invoice(firstName, lastName, address, city, state, zip, email, totalNumItems, totalPrice, date)
        res.sendStatus(200);
    }
}