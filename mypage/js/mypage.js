function goMyPage(){

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
}

function onLogout(){

    localStorage.removeItem("farm_access_token")
    localStorage.removeItem("farm_refresh_token")
    localStorage.removeItem("payload")
    window.location.reload()
}

function loadMoreBtn(auctions){
            
    if (auctions.length > 4) {
        const loadMoreBtn = document.getElementsByClassName("loadmore")
        loadMoreBtn[0].style.display = 'block'
    }
}

// 남은시간 계산
function timeToStr(auctionEndTime) {
    let today = new Date()
    
    let time = (auctionEndTime - today) / 1000 / 60  // 분
    if (time < 0) {
        return 'auction end'
    } 
    if (time < 60) {
        return parseInt(time) + "분 남음"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 남음"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 남음"
    }
    return `마감일 ${String(auctionEndTime.getFullYear()).substring(2, 4)}년 ${auctionEndTime.getMonth() + 1}월 ${auctionEndTime.getDate()}일`
}

function ExhibitionView(data, nickname){

    if (data.paintings_serializer.length != 0){
        paintings = data.paintings_serializer
        
        let haveIsNotAuction = false

        for (let i = 0; i < paintings.length; i++){
            
            if (paintings[i].is_auction == false){

                haveIsNotAuction = true

                image = paintings[i].image
                
                const myGalleryLink = document.getElementsByClassName("my-gallery-link")
                const myGalleryImage = document.getElementsByClassName("my-gallery-image")
                myGalleryLink[0].setAttribute('href', `../gallery/user_gallery.html?${nickname}`)
                myGalleryImage[0].setAttribute('src', image)

                break
            }
        }
        if (haveIsNotAuction == false) {
            const myGallery = document.getElementsByClassName("my-gallery")
            const myGalleryText = document.createElement("p")
            myGalleryText.setAttribute("class", "empty-text")
            myGalleryText.innerText = `소유하고 있는 작품이 없습니다 \n 경매에 참여해 나만의 전시회를 만들어보세요`
            myGallery[0].append(myGalleryText)
        }
    }

    else {
        const myGallery = document.getElementsByClassName("my-gallery")
        const myGalleryText = document.createElement("p")
        myGalleryText.setAttribute("class", "empty-text")
        myGalleryText.innerText = `소유하고 있는 작품이 없습니다 \n 경매에 참여해 나만의 전시회를 만들어보세요`
        myGallery[0].append(myGalleryText)
    }
}

function ProceedingAuctionView(data, nickname){
    if (data.auctions_serializer.length != 0){
        auctions = data.auctions_serializer

        const auctionsList = document.getElementsByClassName("auction-list")

        let haveIsAuction = false

        for (let i = 0; i < auctions.length; i++){            

            if (auctions[i].painting.is_auction == true){
                haveIsAuction = true

                let id = auctions[i].id
                let title = auctions[i].painting.title
                let currentBid = auctions[i].current_bid.toLocaleString('ko-KR')
                let auctionEndTime = new Date(auctions[i].auction_end_date)

                let image = auctions[i].painting.image
                
                const newAuction = document.createElement("a")
                newAuction.setAttribute("class", "auction")
                newAuction.addEventListener('click', () => {
                        location.href = `/auctiondetail/detail.html?${id}`
                    })
                auctionsList[0].append(newAuction)
    
                const newAuctionContent = document.createElement("div")
                newAuctionContent.setAttribute("class", "content")
                newAuction.append(newAuctionContent)
                
                const newText = document.createElement("div")
                newText.setAttribute("class", "text")
                newAuctionContent.append(newText)
                
                const newTitle = document.createElement("p")
                newTitle.innerText = title
                newText.append(newTitle)
                
                const newCurrentBid = document.createElement("p")
                newCurrentBid.innerText = '입찰가 ' + currentBid
                newText.append(newCurrentBid)

                const newEndDate = document.createElement("p")
                if (timeToStr(auctionEndTime) == 'auction end'){
                    newEndDate.innerText = `마감된 경매입니다`
                }
                else {
                    newEndDate.innerText = `${timeToStr(auctionEndTime)}`
                }
                newText.append(newEndDate)
    
                const newImage = document.createElement("img")
                newImage.setAttribute("class", "image")
                newImage.setAttribute("src", image)

                newAuctionContent.append(newImage)
    
                loadMoreBtn(auctions)
            }
        }

        if (haveIsAuction == false){
            const auctionList = document.getElementsByClassName("auction-list")
            const auctionText = document.createElement("p")
            auctionText.setAttribute("class", "empty-text")
            auctionText.innerText = `참여하고있는 경매가 없습니다`
            auctionList[0].append(auctionText)
        }
    }

    else {
        const auctionList = document.getElementsByClassName("auction-list")
        const auctionText = document.createElement("p")
        auctionText.setAttribute("class", "empty-text")
        auctionText.innerText = `참여하고있는 경매가 없습니다`
        auctionList[0].append(auctionText)
    }
}

function PostingAuctionView(data, nickname){

    paintings = data.paintings_serializer

    function getIsAuctions(element){
        IsAuction = element.is_auction
        return IsAuction == true
    }
    postPaintings = paintings.filter(getIsAuctions)

    if (postPaintings.length != 0){

        const auctionsList = document.getElementsByClassName("post-auction-list")

        for (let i = 0; i < postPaintings.length; i++){            

            let id = postPaintings[i].auction.id
            let title = postPaintings[i].title
            let currentBid = postPaintings[i].auction.current_bid
            if (currentBid != null){
                currentBid = currentBid.toLocaleString('ko-kr')
            }
            let auctionEndTime = new Date(postPaintings[i].auction.auction_end_date)
            let image = postPaintings[i].image
            
            const newAuction = document.createElement("a")
            newAuction.setAttribute("class", "auction")
            newAuction.addEventListener('click', () => {
                    location.href = `/auctiondetail/detail.html?${id}`
                })
            auctionsList[0].append(newAuction)

            const newAuctionContent = document.createElement("div")
            newAuctionContent.setAttribute("class", "content")
            newAuction.append(newAuctionContent)
            
            const newText = document.createElement("div")
            newText.setAttribute("class", "text")
            newAuctionContent.append(newText)
            
            const newTitle = document.createElement("p")
            newTitle.innerText = title
            newText.append(newTitle)
            
            const newCurrentBid = document.createElement("p")
            newCurrentBid.innerText = '최고 입찰가 ' + currentBid
            newText.append(newCurrentBid)

            const newEndDate = document.createElement("p")
            if (timeToStr(auctionEndTime) == 'auction end'){
                newEndDate.innerText = `마감된 경매입니다`
            }
            else {
                newEndDate.innerText = `${timeToStr(auctionEndTime)}`
            }
            newText.append(newEndDate)

            const newImage = document.createElement("img")
            newImage.setAttribute("class", "image")
            newImage.setAttribute("src", image)

            newAuctionContent.append(newImage)

            loadMoreBtn(postPaintings)
        }
    }

    else {
        const auctionList = document.getElementsByClassName("post-auction-list")
        const auctionText = document.createElement("p")
        auctionText.setAttribute("class", "empty-text")
        auctionText.innerText = `참여하고있는 경매가 없습니다`
        auctionList[0].append(auctionText)
    }
}

async function myPageView(){
    
    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    
    const data = await getMyPageData(nickname)
    
    ExhibitionView(data, nickname)
    ProceedingAuctionView(data, nickname)
    PostingAuctionView(data, nickname)
}


var auctionsCount = 4

function loadData(){
    
    var auctions = document.querySelectorAll('.auction')
    
    for (var i = auctionsCount; i < auctionsCount + 4; i++) {
        if (auctions[i]) {
            auctions[i].style.display = 'flex'
        }
    }

    auctionsCount += 4

    if (auctionsCount >= auctions.length) {
        event.target.style.display = 'none'
    }
}

myPageView()