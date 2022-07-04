async function userGalleryView(){

    const nickname = location.href.split('?')[1]
    
    paintingList = await getUserGalleryData(nickname)
    
    const userTitle = document.getElementsByClassName("user_title")
    userTitle[0].innerText = nickname + "'s"+' GALLERY'

    const galleries = document.getElementsByClassName("gallery_list")
    
    for (let i = 0; i < paintingList.length; i++){
        
        let painting = paintingList[i]
        let title = painting.title
        let artist = painting.artist.nickname

        const newGallery = document.createElement("a")
        newGallery.setAttribute("class", "gallery")
        newGallery.addEventListener("click", () => {
            modalView(painting)})
        galleries[0].append(newGallery)
        
        const newGalleryContent = document.createElement("div")
        newGalleryContent.setAttribute("class", "content")
        newGallery.append(newGalleryContent)
        
        const newText = document.createElement("div")
        newText.setAttribute("class", "text")
        newGalleryContent.append(newText)
        
        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", "https://m.7art7.com/web/product/big/202012/a6352d03c87af7166e62c854ebc3b092.jpg")
        newGalleryContent.append(newImage)
        
        const newTitle = document.createElement("p")
        newTitle.innerText = title
        newText.append(newTitle)
        
        const newArtist = document.createElement("p")
        newArtist.innerText = artist
        newText.append(newArtist)
    }
}

async function loadMoreBtn(){
    
    const nickname = location.href.split('?')[1]

    const users = await getUserGalleryData(nickname)

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
    const winningBid = document.getElementsByClassName('modal_text_box-winning_bid')
    title[0].innerText = painting.title
    artist[0].innerText = painting.artist.nickname
    winningBid[0].innerText = `낙찰가 ${(painting.auction[0].current_bid).toLocaleString()} point`
    description[0].innerText = painting.description
}

function modalUnView(){
    const body = document.getElementsByTagName('body')
    const modal = document.getElementsByClassName('modal_body')
    
    modal[0].style.display = 'none'
    body[0].style.overflow = 'auto'
}

const modalBody = document.querySelector('.modal_body')
const modalBtn = document.querySelector('.modal_btn')
modalBody.addEventListener('click', (e) => {
    if (e.target == modalBody) {
        modalUnView()
    }
})

userGalleryView()
loadMoreBtn()