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

function biddingLoadMoreBtn(list){
            
    if (list.length > 4) {
        const loadMoreBtn = document.getElementsByClassName("bidding-loadmore")
        loadMoreBtn[0].style.display = 'block'
    }
}

function postingLoadMoreBtn(list){
            
    if (list.length > 4) {
        const loadMoreBtn = document.getElementsByClassName("posting-loadmore")
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
        
        function getIsNotAuctions(element){
            IsNotAuction = element.is_auction
            return IsNotAuction == false
        }
        myBestPainting = paintings.filter(getIsNotAuctions)[0]

        if (myBestPainting != undefined){
            
            image = myBestPainting.image
            
            const myGalleryLink = document.getElementsByClassName("my-gallery-link")
            const myGalleryImage = document.getElementsByClassName("my-gallery-image")
            myGalleryLink[0].setAttribute('href', `../gallery/user_gallery.html?${nickname}`)
            myGalleryImage[0].setAttribute('src', image)
        }
        else {
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
    auctions = data.auctions_serializer

    proceedingAuctions = auctions.filter(function(element){
        IsAuction = element.painting.is_auction
        return IsAuction == true
    })

    if (proceedingAuctions.length != 0){

        const auctionsList = document.getElementsByClassName("auction-list")

        for (let i = 0; i < proceedingAuctions.length; i++){            

            let id = proceedingAuctions[i].id
            let title = proceedingAuctions[i].painting.title
            let currentBid = proceedingAuctions[i].current_bid.toLocaleString('ko-KR')
            let auctionEndTime = new Date(proceedingAuctions[i].auction_end_date)

            let image = proceedingAuctions[i].painting.image
            
            const newAuction = document.createElement("a")
            newAuction.setAttribute("class", "bidding-auction auction")
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
            newEndDate.style.color = 'red'
            newText.append(newEndDate)

            const newImage = document.createElement("img")
            newImage.setAttribute("class", "image")
            newImage.setAttribute("src", image)

            newAuctionContent.append(newImage)

            biddingLoadMoreBtn(proceedingAuctions)
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
            let auctionEndTime = new Date(postPaintings[i].auction.auction_end_date)
            let image = postPaintings[i].image
            
            const newAuction = document.createElement("a")
            newAuction.setAttribute("class", "posting-auction auction")
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
            let currentBid = postPaintings[i].auction.current_bid
            if (currentBid != null){
                currentBid = currentBid.toLocaleString('ko-kr')
                newCurrentBid.innerText = '최고 입찰가 ' + currentBid
            }
            else {
                newCurrentBid.innerText = '입찰자가 없습니다'
            }
            newText.append(newCurrentBid)
            

            const newEndDate = document.createElement("p")
            if (timeToStr(auctionEndTime) == 'auction end'){
                newEndDate.innerText = `마감된 경매입니다`
            }
            else {
                newEndDate.innerText = `${timeToStr(auctionEndTime)}`
            }
            newEndDate.style.color = 'red'
            newText.append(newEndDate)

            const newImage = document.createElement("img")
            newImage.setAttribute("class", "image")
            newImage.setAttribute("src", image)

            newAuctionContent.append(newImage)

            postingLoadMoreBtn(postPaintings)
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

    userPoint = data.my_point
    
    const userCurrentPoint = document.getElementsByClassName("user-point")[0]
    userCurrentPoint.replaceChildren()

    //네비바 유저 포인트
    const newUserPoint = document.createElement("div")
    newUserPoint.setAttribute("class", "point-int")
    newUserPoint.innerText = "POINT " + userPoint.toLocaleString()
    userCurrentPoint.append(newUserPoint)
    
    ExhibitionView(data, nickname)
    ProceedingAuctionView(data, nickname)
    PostingAuctionView(data, nickname)
}


var biddingsCount = 4

function loadBiddingData(){
    
    var biddings = document.querySelectorAll('.bidding-auction')
    
    for (var i = biddingsCount; i < biddingsCount + 4; i++) {
        if (biddings[i]) {
            biddings[i].style.display = 'flex'
        }
    }
    
    biddingsCount += 4
    
    if (biddingsCount >= biddings.length) {
        event.target.style.display = 'none'
    }
}

var postingsCount = 4

function loadPostingData(){

    var postings = document.querySelectorAll('.posting-auction')

    for (var i = postingsCount; i < postingsCount + 4; i++) {
        if (postings[i]) {
            postings[i].style.display = 'flex'
        }
    }

    postingsCount += 4

    if (postingsCount >= postings.length) {
        event.target.style.display = 'none'
    }
}

myPageView()