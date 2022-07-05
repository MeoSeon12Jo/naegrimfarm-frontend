function goMyPage(){

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
}

//네비바 유저 포인트
// async function getUserPointView() {

//     const auctions = await userPointView();

//     let userPoint = auctions['user_point']

//     console.log(userPoint)
  
//     const userCurrentPoint = document.getElementsByClassName("user-point")[0]

//     userCurrentPoint.replaceChildren()

//     const newUserPoint = document.createElement("div")
//     newUserPoint.setAttribute("class", "point-int")
//     newUserPoint.innerText = "POINT " + userPoint.toLocaleString()
//     userCurrentPoint.append(newUserPoint)

// }
