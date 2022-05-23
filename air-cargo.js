const dropZone = document.querySelector(".dropZone");
let validExtensions = ["pdf", "jpeg", "png", "docx", "doc"]
const nameFiles = document.getElementById('nameFiles');
const inputHidden = document.getElementById('filesAddHidden');
const buttonShow = document.getElementById('filesAddShow');
var files = new Set();

function addPayload() {
    const payloadRowHTML = `                       
        <td><input name="nameCargo" type="text" placeholder="Nazwa ładunku" required></td>
        <td><input name="loadWeight" type="text" placeholder="Ciężar ładunku [kg]" required></td>
        <td>
            <select name="data" id="selectPayloadType" required>
            <option value="" disabled selected class="grayFont">Typ ładunku</option>
            <option value="normalPayload">Zwykły</option>
            <option value="dangerousPayload">Niebezpieczny</option>
        </td>
    `
    const payloadTable = document.getElementById('payloadTable');
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
        // nameText += `${separateFile.name}<br>`
        // console.log(nameText)
    }else{
        alert("Plik nie posiada odpowiedzniego rozszerzenia. Akceptowalne rozszerzenia: jpg, png, doc, docx, pdf")
        dropZone.classList.remove("active");
    }
}
function printINDropZone(){
    let filenamesStr = "";
    files.forEach(file => {
        filenamesStr += `${file.name}<br>`
        console.log(file)
    });
    nameFiles.innerHTML = filenamesStr;
}
addPayload();
document.getElementById('removePayload').addEventListener('click', removePayload);
document.getElementById('addPayload').addEventListener('click', addPayload);