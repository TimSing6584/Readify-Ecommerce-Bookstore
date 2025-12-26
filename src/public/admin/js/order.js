// Sort orders by status
const filter = document.querySelector("select.order-filter")
if(filter){
    let url = new URL(window.location.href)
    filter.addEventListener("change", () => {
        if(filter.value != ""){
            url.searchParams.set("sort_status", filter.value)
        }
        else{
            url.searchParams.delete("sort_status")
        }
        window.location.href = url.href
    })
    // Show selected sort status
    const sort_status = url.searchParams.get("sort_status") ? url.searchParams.get("sort_status") : ""
    const options = filter.querySelectorAll("option")
    options.forEach(option => {
        if(option.value == sort_status){
            option.selected = true
        }
    })
}
// End sort orders by status

// Edit order status
const orderForm = document.querySelector("form[change-order-status]")
if (orderForm) {
    const selects = orderForm.querySelectorAll("select.order-status")
    selects.forEach(select => {
        select.addEventListener("change", () => {
            const order_id = select.getAttribute("order-id")
            const status = select.value
            orderForm.action = `/admin/order/edit/${order_id}/${status}`
            orderForm.submit()
        })
    })
}
// End edit order status