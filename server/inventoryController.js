module.exports = {
    logOrder: async(req, res) => {
        const {firstName, lastName, email, state, zip, address, city, totalPrice, totalNumItems, date} = req.body;
        const db = req.app.get('db');
        const order_id = await db.invoice.invoice(firstName, lastName, address, city, state, zip, email, totalNumItems, totalPrice, date)
        res.status(200).send(order_id[0]);
    },
    logItems: async(req, res) => {
        const {itemsArray, orderNumber} = req.body;
        const db = req.app.get('db');
        for(let i = 0; i < itemsArray.length; i++){
            // const itemNum = itemsArray[i].item_id;
            const itemColor = itemsArray[i].color,
                  itemDescription = itemsArray[i].description,
                  itemImg = itemsArray[i].img,
                  itemName = itemsArray[i].name,
                  itemPrice = itemsArray[i].price,
                  itemQty = itemsArray[i].quantity,
                  itemSize = itemsArray[i].size;
            const orderHistory = await db.invoice.orderHistory(orderNumber, itemName, itemDescription, itemImg, itemColor, itemPrice, itemQty, itemSize);
        }
        res.sendStatus(200);
    }
}