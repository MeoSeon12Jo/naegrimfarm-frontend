function goMyPage() {

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
}

function Reader(event) {
    const columnDiv1 = document.getElementsByClassName('column-div1')
    const inputBox = document.getElementsByClassName('inputBox')
    columnDiv1[0].style.border = 'none'
    inputBox[0].style.display = 'none'
    var data = event.target
    var reader = new FileReader()
    reader.onload = function () {
        var dataURL = reader.result
        var offset = "previewImage"
        var output = document.getElementsByClassName(offset)
        output[0].style.display = 'block'
        output[0].src = dataURL
    }
    reader.readAsDataURL(data.files[0])
}

//네비바 유저 포인트
async function getUserPointView() {

    const userPoint = await userPointView();

    const userCurrentPoint = document.getElementsByClassName("user-point")[0]

    userCurrentPoint.replaceChildren()

    const newUserPoint = document.createElement("div")
    newUserPoint.setAttribute("class", "point-int")
    newUserPoint.innerText = "POINT " + userPoint.my_point.toLocaleString()
    userCurrentPoint.append(newUserPoint)

}

$('document').ready(getUserPointView());

