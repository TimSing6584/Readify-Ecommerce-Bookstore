// Filter Button By Stock (/admin/product)
const buttons = document.querySelectorAll("button[stock]")
if(buttons){
    let url = new URL(window.location.href)
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const stock = button.getAttribute("stock")
            if(stock){
                url.searchParams.set("stock", stock)
            }
            else{
                url.searchParams.delete("stock")
                url.searchParams.delete("search_key_word") // remove any search_key_word
                // url.searchParams.delete("page") // comeback to first page
            }
            window.location.href = url.href
        })
    })
}
// End Filter Button By Stock (/admin/product)


// Search Form (/admin/product)
const searchForm = document.querySelector("#form-search")
if(searchForm){
    let url = new URL(window.location.href)
    searchForm.addEventListener("submit", event => {
        event.preventDefault() // prevent page reload (can lose data of the filter by stock before)
        const keyword = event.target.elements.search_key_word.value
        if(keyword){
            url.searchParams.set("search_key_word", keyword)
        }
        else{
            url.searchParams.delete("search_key_word")
        }
        window.location.href = url.href
    })
}
// End Search Form (/admin/product)

// Pagination
const pages = document.querySelectorAll("button[pageNumber]")
if(pages){
    let url = new URL(window.location.href)
    pages.forEach((page) => {
        page.addEventListener("click", () => {
            pageNumber = page.getAttribute("pageNumber")
            url.searchParams.set("page", pageNumber)
            window.location.href = url.href
        })
    })
}
// End Pagination