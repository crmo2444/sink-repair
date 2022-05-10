import { deleteRequest, getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const completions = getCompletions()

    //creating a string with <ul><li>for every request object
    //joining the objects to create one large string
    let html = `<ul>`
    
        
    let requestList = requests.map(request => { 
        const foundCompletion = completions.find((completion) => {
            return completion.requestId === request.id
        })
        if (typeof foundCompletion !== "undefined") {
            html += `   <li style="background-color:lightblue;">
            ${request.description}: Completed by `
            if (foundCompletion.plumberId === 1) {
                html += `Maude!`
            }
            else {
                html += `Merle!`
            }
            html += `<button class="request__delete"
                    id="request--${request.id}">
                Delete
            </button>
        </li>`
        }
        else {
        return `   <li style="background-color:yellow;">
        ${request.description}
        <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`
    }

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

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            let newRequestId = parseInt(requestId)
            let newPlumberId = parseInt(plumberId)
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: newRequestId,
                plumberId: newPlumberId,
                date_created: Date.now()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
             saveCompletion(completion)

        }
    }
)