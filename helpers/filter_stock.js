// Return a list of buttons to filter by stock
module.exports = (req) => {
    let filterButtons = [
        {
            buttonName: "All",
            stock: "",
            class: req.query.stock === undefined ? "active" : ""
        },
        {
            buttonName: "In stock",
            stock: "instock",
            class: req.query.stock === "instock" ? "active" : ""
        },
        {
            buttonName: "Out of stock",
            stock: "outofstock",
            class: req.query.stock === "outofstock" ? "active" : ""
        }
    ]
    return filterButtons
}