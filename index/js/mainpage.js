function goMyPage(){

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
}

//네비바 유저 포인트
async function getUserPointView() {

    const userPoint = await userPointView();

    console.log(userPoint.my_point)
  
    const userCurrentPoint = document.getElementsByClassName("user-point")[0]

    userCurrentPoint.replaceChildren()

    const newUserPoint = document.createElement("div")
    newUserPoint.setAttribute("class", "point-int")
    newUserPoint.innerText = "POINT " + userPoint.my_point.toLocaleString()
    userCurrentPoint.append(newUserPoint)

}

$('document').ready(getUserPointView());

