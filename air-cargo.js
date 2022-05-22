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

addPayload();
document.getElementById('removePayload').addEventListener('click', removePayload);
document.getElementById('addPayload').addEventListener('click', addPayload);
