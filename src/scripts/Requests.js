import { deleteRequest, getRequests } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()

    //creating a string with <ul><li>for every request object
    //joining the objects to create one large string
    let html = `<ul>`
            
    let requestList = requests.map(request => {
        return `   <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`
    })
            
    html += requestList.join("")     
    html += `</ul>`

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})