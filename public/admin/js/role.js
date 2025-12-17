// Specific script for Role Page
const tablePermissions = document.querySelector("table.permission")
if(tablePermissions){
    const submitButton = document.querySelector("[button-submit]")
    submitButton.addEventListener("click", () => {
        let permissions = []
        const rows = tablePermissions.querySelectorAll("tr[data-name]")
        rows.forEach(row => {
            const data_name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")
            if(data_name == "id"){
                inputs.forEach(input => {
                    permissions.push({
                        id: input.value,
                        permissions: []
                    })
                })
            }
            else{
                inputs.forEach((input, index) => {
                    if(input.checked){
                        permissions[index].permissions.push(data_name)
                    }
                })
            }
        })
        const permissionForm = document.querySelector("#form-change-permissions")
        const inputForm = permissionForm.querySelector('input[name="permissions"]')
        inputForm.value = JSON.stringify(permissions)
        permissionForm.submit()
    })
}