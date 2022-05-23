const dropZone = document.querySelector(".dropZone");
let validExtensions = ["pdf", "jpeg", "png", "docx", "doc"]
const nameFiles = document.getElementById('nameFiles');
const inputHidden = document.getElementById('filesAddHidden');
const buttonShow = document.getElementById('filesAddShow');
var files = new Set();

function addPayload() {
    const payloadTable = document.getElementById('payloadTable');
    let idNumber = payloadTable.rows.length
    const payloadRowHTML = `                       
        <td><input name="nameCargo" type="text" placeholder="Nazwa ładunku" id="cargo${idNumber}" required></td>
        <td><input name="loadWeight" type="text" placeholder="Ciężar ładunku [kg]" id="load${idNumber}" required></td>
        <td>
            <select name="loadType" id="type${idNumber}" id="selectPayloadType" required>
            <option value="" disabled selected class="grayFont">Typ ładunku</option>
            <option value="normalPayload">Zwykły</option>
            <option value="dangerousPayload">Niebezpieczny</option>
        </td>
    `

    if (payloadTable.rows.length < 10) {
        var newRow = payloadTable.insertRow();
        newRow.innerHTML = payloadRowHTML;
    }
}
function removePayload(){
    const payloadTable = document.getElementById('payloadTable');
    var rowCount = payloadTable.rows.length;
    if (rowCount > 1) {
        payloadTable.deleteRow(rowCount - 1);
    }
}
buttonShow.onclick = ()=>{
    inputHidden.click();
}
inputHidden.addEventListener("change", function(){
    let documents = this.files;
    addFiles(documents)
});
function pullFileExtensionFromName(f){
    const spliteName = f.name.split('.');
    const position = spliteName.length - 1;
    return spliteName[position];
}
dropZone.addEventListener("dragover", (event)=>{
    event.preventDefault();
    dropZone.classList.add("active");
});
dropZone.addEventListener("dragleave", ()=>{
    dropZone.classList.remove("active");
});
dropZone.addEventListener("drop", (event)=>{
    event.preventDefault();
    let documents = event.dataTransfer.files;
    addFiles(documents)
});
function addFiles(files){
    var totalfiles = files.length
    console.log(totalfiles)
    if(totalfiles > 0 ){
        for(let i = 0; totalfiles > i; i++){
            console.log(files[i].name)
            addFilename(files[i])
        }
        printINDropZone();
    }
}
function addFilename(separateFile){
    let fileType = pullFileExtensionFromName(separateFile)
    if(validExtensions.includes(fileType)){
        files.add(separateFile)
    }else{
        alert("Plik nie posiada odpowiedzniego rozszerzenia. Akceptowalne rozszerzenia: jpg, png, doc, docx, pdf")
        dropZone.classList.remove("active");
    }
}
function printINDropZone(){
    let filenamesStr = "";
    files.forEach(file => {
        filenamesStr += `${file.name}<br>`
    });
    nameFiles.innerHTML = filenamesStr;
}
function changePageLayout(){
    var table = document.getElementById('formTable');
    if(screen.width < 750 && table.rows.length < 2){
        const halfPageHTML = 
        `
        <div>
        <h2 class="formHeader">Ładunek</h2>
        <span id="table"></span>
        </div>
        <input value="+" type="button" id="addPayload" class="formContent grayFont changePayload"> 
        <input value="-" type="button" id="removePayload" class="grayFont changePayload">
        `;
        const tableHTML = `<table id="payloadTable" class="formContent ">
        </table>`
        var table = document.getElementById('formTable');
        table.rows[0].deleteCell(1);
        var newRowPage = table.insertRow();
        newRowPage.innerHTML = halfPageHTML;
        document.getElementById('table').innerHTML = tableHTML;
        addPayload();
        };
        if(screen.width > 750  &&  table.rows.length == 2){
            location.reload();
        }
    }
function checkSize(){
    if(screen.width < 750)
    changePageLayout();
}
addPayload();
checkSize();
document.getElementById('removePayload').addEventListener('click', removePayload);
document.getElementById('addPayload').addEventListener('click', addPayload);
window.addEventListener('resize', changePageLayout);