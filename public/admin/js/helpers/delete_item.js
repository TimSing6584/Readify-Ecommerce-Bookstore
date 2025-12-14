// Delete item (product, category,...)
const deleteButtons = document.querySelectorAll("button.delete")

if(deleteButtons){
    deleteButtons.forEach((button) => {
        const deleteForm = document.querySelector("form#delete-item")
        button.addEventListener("click", () => {
            if(confirm("Are you sure to delete?")){
                const product_id = button.getAttribute("data-id")
                deleteForm.setAttribute("action", deleteForm.getAttribute("path") + `/${product_id}?_method=DELETE`)
                deleteForm.submit()
            }
        })
    })
}
// End delete item (product, category, ...)