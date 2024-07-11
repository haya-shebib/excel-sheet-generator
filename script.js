
const generateButton = document.getElementById('generateButton');
const exportButton = document.getElementById('exportButton');

const rowsInput = document.getElementById('rowsInput');
const columnsInput = document.getElementById('columnsInput');

// Add an event listener to the button to show the alert
generateButton.addEventListener('click', () => {
    if (!rowsInput.value  || !columnsInput.value) { // Check if the input field is empty
        Swal.fire({
            text: ' field is empty.',
            confirmButtonText: 'OK'
        });
    } 
});



let table = document.getElementsByClassName("sheet-body")[0],
rows = document.getElementsByClassName("rows")[0],
columns = document.getElementsByClassName("columns")[0]
tableExists = false

const generateTable = () => {
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    table.innerHTML = ""
    for(let i=0; i<rowsNumber; i++){
        var tableRow = ""
        for(let j=0; j<columnsNumber; j++){
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    if(rowsNumber>0 && columnsNumber>0){
        tableExists = true
    }




}

const ExportToExcel = (type, fn, dl) => {
    if(!tableExists){
        Swal.fire({
            text: 'there is no generated table to be exported.',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
        : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}


