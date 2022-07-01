async function userGalleryView(){

    const nickname = location.href.split('?')[1]
    
    painting_list = await getUserGalleryData(nickname)
    
    const user_title = document.getElementsByClassName("user_title")
    user_title[0].innerText = nickname + "'s"+' GALLERY'

    const galleries = document.getElementsByClassName("gallery_list")
    
    for (let i = 0; i < painting_list.length; i++){
        
        let painting = painting_list[i]
        let title = painting.title
        let artist = painting.artist.nickname

        const new_gallery = document.createElement("a")
        new_gallery.setAttribute("class", "gallery")
        new_gallery.addEventListener("click", () => {
            modalView(painting)})
        galleries[0].append(new_gallery)
        
        const new_gallery_content = document.createElement("div")
        new_gallery_content.setAttribute("class", "content")
        new_gallery.append(new_gallery_content)
        
        const new_text = document.createElement("div")
        new_text.setAttribute("class", "text")
        new_gallery_content.append(new_text)
        
        const new_image = document.createElement("img")
        new_image.setAttribute("class", "image")
        new_image.setAttribute("src", "https://m.7art7.com/web/product/big/202012/a6352d03c87af7166e62c854ebc3b092.jpg")
        new_gallery_content.append(new_image)
        
        const new_title = document.createElement("p")
        new_title.innerText = title
        new_text.append(new_title)
        
        const new_artist = document.createElement("p")
        new_artist.innerText = artist
        new_text.append(new_artist)
    }
}

async function loadmorebtn(){
    
    const nickname = location.href.split('?')[1]

    const users = await getUserGalleryData(nickname)

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

function modalView(painting){

    const body = document.getElementsByTagName('body')
    const modal = document.getElementsByClassName('modal_body')
    body[0].style.overflow = 'hidden'
    modal[0].style.display = 'flex'

    const image = document.getElementsByClassName('modal_image_box-image')
    image[0].setAttribute('src', 'https://m.7art7.com/web/product/big/202012/a6352d03c87af7166e62c854ebc3b092.jpg')

    const title = document.getElementsByClassName('modal_text_box-title')
    const artist = document.getElementsByClassName('modal_text_box-artist')
    const description = document.getElementsByClassName('modal_text_box-description')
    const winning_bid = document.getElementsByClassName('modal_text_box-winning_bid')
    title[0].innerText = painting.title
    artist[0].innerText = painting.artist.nickname
    winning_bid[0].innerText = `낙찰가 ${painting.auction[0].current_bid} point`
    description[0].innerText = painting.description
}

function modalUnView(){
    const body = document.getElementsByTagName('body')
    const modal = document.getElementsByClassName('modal_body')

    modal[0].addEventListener('click', () =>{
        console.log('click')
        modal[0].style.display = 'none'
        body[0].style.overflow = 'auto'
    })
}

userGalleryView()
loadmorebtn()