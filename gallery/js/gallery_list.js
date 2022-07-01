async function galleryView(){
    
    const users = await getGalleryListData()
    const galleries = document.getElementsByClassName("gallery_list")
    
    for (let i = 0; i < users.length; i++){

        let user = users[i]
        let nickname = user.nickname
        let paintings_list = user.paintings_list
        
        const new_gallery = document.createElement("a")
        new_gallery.setAttribute("class", "gallery")
        new_gallery.addEventListener('click', () => {
            location.href = `user_gallery.html?${nickname}`
        })
        galleries[0].append(new_gallery)
        
        const new_gallery_content = document.createElement("div")
        new_gallery_content.setAttribute("class", "content")
        new_gallery.append(new_gallery_content)
        
        const new_text = document.createElement("div")
        new_text.setAttribute("class", "text")
        new_gallery_content.append(new_text)
        
        const new_image = document.createElement("img")
        new_image.setAttribute("class", "image")
        new_image.setAttribute("src", "https://m.7art7.com/web/product/big/202012/4dc33b6141e960cb7f820ea58172f5d5.jpg")
        new_gallery_content.append(new_image)
        
        const new_nickname = document.createElement("p")
        new_nickname.innerText = nickname
        new_text.append(new_nickname)
        
        const new_quantity = document.createElement("p")
        new_quantity.innerText = '전시된 작품 : ' + paintings_list.length
        new_text.append(new_quantity)
    }
}

async function loadmorebtn(){
    
    const users = await getGalleryListData()

    if (users.length > 8) {
        const loadmorebtn = document.getElementsByClassName("loadmore")
        loadmorebtn[0].style.display = 'block'
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
loadmorebtn()