let workList = [
    {
        workName: "project",
        date: "2025-04-10",
        personName: "Mr Luận",
        status: "Đang tiến hành",
    },
    {
        workName: "project1",
        date: "2025-04-11",
        personName: "Mr Luận",
        status: "Đang tiến hành"
    },
    {
        workName: "project2",
        date: "2025-04-1",
        personName: "Mr Luận",
        status: "Đang tiến hành"
    },
]
let workEditIndex = null;
let dataHTML = document.querySelector("tbody")
function renderData(list = workList) {
    let data = ``;
    for (let i = 0; i < list.length; i++) {
        data += `
        <tr>
                                <td>${list[i].workName}</td>
                            <td>${list[i].date}</td>
                            <td>${list[i].personName}</td>
                            <td>${list[i].status}</td>
                            <td>
                                <button class="btn btn-success" onclick ="editWork(${i})">Sửa</button>
                                <button class="btn btn-danger" style="background-color: red;" onclick="deleteWork (${i})">Xóa</button>
                            </td>
                        </tr>
                        `
    }
    dataHTML.innerHTML = data;
    // dataHTML.innerHTML = workList.map((work, index) => {
    //     return `
    //     <tr>
    //                             <td>${work.workName}</td>
    //                         <td>${work.date}</td>
    //                         <td>${work.personName}</td>
    //                         <td>${work.status}</td>
    //                         <td>
    //                             <button class="btn btn-success" onclick ="editWork(${index})">Sửa</button>
    //                             <button class="btn btn-danger" style="background-color: red;" onclick="deleteWork (${index})">Xóa</button>
    //                         </td>
    //                     </tr>
    //     `
    // }
    // ).join (" ")

}
renderData();
function deleteWork(index) {
    if (confirm("Có thật sự muốn xóa công việc này không?")) {
        workList.splice(index, 1);
        renderData();
    }
}
function addWork(event) {
    event.preventDefault();
    let flag = 0;
    let workName = event.target.workName.value
    let date = event.target.date.value
    let personName = event.target.personName.value
    let status = event.target.status.value
    let newWork = {
        workName: event.target.workName.value,
        date: event.target.date.value,
        personName: event.target.personName.value,
        status: event.target.status.value
    }
    if (workName == "") {
        let workNameHTML = document.querySelector(".inputTypeWorkName")
        workNameHTML.innerHTML = `
        <span>Tên công việc:</span><br>
                            <input type="text" name="workName" size="50"><br>
                            <span style="color: red;">Không được để trống</span>
        `
        flag = 1
    }
    else {
        let workNameHTML = document.querySelector(".inputTypeWorkName")
        workNameHTML.innerHTML = `
        <span>Tên công việc:</span><br>
                            <input type="text" name="workName" size="50">
        `
    }
    if (date == "") {
        let dateHTML = document.querySelector(".inputTypeDate")
        dateHTML.innerHTML = `
        <span>Hạn chót:</span><br>
                                <input type="date" name="date">
                                <br>
                            <span style="color: red;">Không được để trống</span>
        `
        flag = 1
    }
    else {
        let dateHTML = document.querySelector(".inputTypeDate")
        dateHTML.innerHTML = `
        <span>Hạn chót:</span><br>
                                <input type="date" name="date" >
        `
    }
    if (personName == "") {
        let personNameHTML = document.querySelector(".inputTypePersonName")
        personNameHTML.innerHTML = `
        <span>Người phụ trách:</span><br>
                                <input type="text" name="personName" size="50">
                                <br>
                            <span style="color: red;">Không được để trống</span>
        `
        flag = 1
    }
    else {
        let personNameHTML = document.querySelector(".inputTypePersonName")
        personNameHTML.innerHTML = `
        <span>Người phụ trách:</span><br>
                                <input type="text" name="personName" size="50">
        `
    }
    if (status == "") {
        let statusHTML = document.querySelector(".inputTypeStatus")
        statusHTML.innerHTML = `
        <span>Trạng thái</span><br>
                                <input type="text" name="status" size="50"><br>
                            <span style="color: red;">Không được để trống</span>
        `
        flag = 1
    }
    else {
        let statusHTML = document.querySelector(".inputTypeStatus")
        statusHTML.innerHTML = `
        <span>Trạng thái</span><br>
                                <input type="text" name="status" size="50">
        `
    }
    if (flag == 1) {
        return;
    }
    else {
        if (workEditIndex == null) {
            workList.push(newWork)
        }
        else {
            workList[workEditIndex] = newWork
            productEditIndex = null;
        }
        console.log(date)
        renderData()
        event.target.reset()
    }
}
function editWork(index) {
    let workEdit = workList[index]
    let workEL = document.querySelector("form")

    workEL.workName.value = workEdit.workName;
    workEL.date.value = workEdit.date;
    workEL.personName.value = workEdit.personName;
    workEL.status.value = workEdit.status
    workEditIndex = index
}
function searchWork() {
    let workSearch = document.querySelector('#searchIp').value.toLowerCase();
    let arrayResult = [];
    for (let i = 0; i < workList.length; i++) {
        if (workList[i].workName.toLowerCase().includes(workSearch)) {
            arrayResult.push(workList[i]);  
        }
    }
    renderData(arrayResult);
}
document.querySelector('#searchIp').addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchWork();
    }
});