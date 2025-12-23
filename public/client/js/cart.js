// Modify product quantity in cart
const modifyInputs = document.querySelectorAll(".cart-quantity-input[name='quantity']")
if(modifyInputs.length > 0){
    modifyInputs.forEach(input => {
        input.addEventListener("change", () => {
            if(input.value != 1){
                const product_id = input.getAttribute("product-id")
                const quantity = input.value
                window.location.href = `cart/update_quantity/${product_id}/${quantity}`
            }
        })
    })
}