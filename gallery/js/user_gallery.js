function userGalleryView(){
    
    var user = sessionStorage.getItem("user")
    var paintings = sessionStorage.getItem("paintings")
    var user = JSON.parse(user)
    var paintings = JSON.parse(paintings)
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("paintings")

    if (paintings.length > 8) {
        loadmorebtn = document.getElementsByClassName("loadmore")
        loadmorebtn[0].style.display = 'block'
    }
    
    const user_title = document.getElementsByClassName("user_title")
    user_title[0].innerText = user + "'s"+' GALLERY'

    const galleries = document.getElementsByClassName("gallery_list")
    
    for (let i = 0; i < paintings.length; i++){

        title = paintings[i].title
        artist = paintings[i].artist

        const new_gallery = document.createElement("a")
        new_gallery.setAttribute("class", "gallery")
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
        
        const new_title = document.createElement("p")
        new_title.innerText = title
        new_text.append(new_title)
        
        const new_artist = document.createElement("p")
        new_artist.innerText = '작가 : ' + artist
        new_text.append(new_artist)
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

userGalleryView()