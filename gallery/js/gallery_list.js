function goMyPage(){

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
}

async function galleryView(){
    
    const usersData = await getGalleryListData()

    const users = usersData.user_serializer
    const userPoint = usersData.my_point

    if (users != undefined){
        const galleries = document.getElementsByClassName("gallery_list")
        const userCurrentPoint = document.getElementsByClassName("user-point")[0]

        userCurrentPoint.replaceChildren()

        //네비바 유저 포인트
        const newUserPoint = document.createElement("div")
        newUserPoint.setAttribute("class", "point-int")
        newUserPoint.innerText = "POINT " + userPoint.toLocaleString()
        userCurrentPoint.append(newUserPoint)
        
        for (let i = 0; i < users.length; i++){

            let user = users[i]
            let nickname = user.nickname
            let paintingsList = user.paintings_image
            
            const newGallery = document.createElement("a")
            newGallery.setAttribute("class", "gallery")
            newGallery.addEventListener('click', () => {
                location.href = `user_gallery.html?${nickname}`
            })
            galleries[0].append(newGallery)
            
            const newGalleryContent = document.createElement("div")
            newGalleryContent.setAttribute("class", "content")
            newGallery.append(newGalleryContent)
            
            const newText = document.createElement("div")
            newText.setAttribute("class", "text")
            newGalleryContent.append(newText)
            
            const newImage = document.createElement("img")
            newImage.setAttribute("class", "image")
            newImage.setAttribute("src", paintingsList[0].image)
            newGalleryContent.append(newImage)
            
            const newNickname = document.createElement("p")
            newNickname.innerText = nickname
            newText.append(newNickname)
            
            const newQuantity = document.createElement("p")
            newQuantity.innerText = '전시된 작품 : ' + paintingsList.length
            newText.append(newQuantity)

            loadMoreBtn(users)
        }
    }
}

async function loadMoreBtn(users){
    
    if (users.length > 8) {
        const loadMoreBtn = document.getElementsByClassName("loadmore")
        loadMoreBtn[0].style.display = 'block'
    }
}


var galleriesCount = 8

function loadData(){
    
    var galleries = document.querySelectorAll('.gallery')
    
    for (var i = galleriesCount; i < galleriesCount + 4; i++) {
        if (galleries[i]) {
            galleries[i].style.display = 'flex'
        }
    }

    galleriesCount += 4

    if (galleriesCount >= galleries.length) {
        event.target.style.display = 'none'
    }
}

galleryView()