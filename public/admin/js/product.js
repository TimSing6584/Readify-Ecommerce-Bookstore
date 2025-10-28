// Increment/Decrement Stock Value
const counterButtons = document.querySelectorAll(".stock-counter")
if(counterButtons.length > 0){
    // let url_params = new URLSearchParams(new URL(window.location.href).search).toString()
    counterButtons.forEach(button => {
        const changeStockForm = document.querySelector("#change-stock")
        const path = changeStockForm.getAttribute("path")
        button.addEventListener("click", () => {
            // const current_stock = button.getAttribute("current_stock")
            const counter_value = button.getAttribute("counter_value")
            const data_id = button.getAttribute("data-id")

            changeStockForm.setAttribute("action", `${path}/${counter_value}/${data_id}?_method=PATCH`)
            changeStockForm.submit()
        })
    })
}