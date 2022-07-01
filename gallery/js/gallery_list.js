async function galleryView(){
    
    const users = await getGalleryListData()
    const galleries = document.getElementsByClassName("gallery_list")
    
    for (let i = 0; i < users.length; i++){

        let user = users[i]
        let nickname = user.nickname
        let paintingsList = user.paintings_list
        
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
        newImage.setAttribute("src", "https://m.7art7.com/web/product/big/202012/4dc33b6141e960cb7f820ea58172f5d5.jpg")
        newGalleryContent.append(newImage)
        
        const newNickname = document.createElement("p")
        newNickname.innerText = nickname
        newText.append(newNickname)
        
        const newQuantity = document.createElement("p")
        newQuantity.innerText = '전시된 작품 : ' + paintingsList.length
        newText.append(newQuantity)
    }
}

async function loadMoreBtn(){
    
    const users = await getGalleryListData()

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
loadMoreBtn()