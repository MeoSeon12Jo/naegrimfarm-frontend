
function goMyPage(){

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
}

// 경매 아이템 모두 보여주기
async function getAllAuctionView() {
    
    // Load More Btn 초기화
    closingAuctionsCount = 4;
    hotAuctionsCount = 4;
    noBidAuctionsCount = 4;

    // api.js에서 경매 데이터 조회
    const auctions = await auctionView();

    // 경매 data를 html에 append
    let closingAuctions = auctions['closing_auctions']
    let hotAuctions = auctions['hot_auctions']
    let noBidAuctions = auctions['nobid_auctions']
    let userPoint = auctions['user_point']
    const closingAuctionsList = document.getElementById("closing-auction-container")
    const hotAuctionsList = document.getElementById("hot-auction-container")
    const noBidAuctionsList = document.getElementById("nobid-auction-container")
    const userCurrentPoint = document.getElementsByClassName("user-point")[0]

    btnView(closingAuctions, hotAuctions, noBidAuctions)

    // 함수 실행시 기존 각 auction-container의 child node 모두 삭제
    closingAuctionsList.replaceChildren()
    hotAuctionsList.replaceChildren()
    noBidAuctionsList.replaceChildren()
    userCurrentPoint.replaceChildren()

    //네비바 유저 포인트
    const newUserPoint = document.createElement("div")
    newUserPoint.setAttribute("class", "point-int")
    newUserPoint.innerText = "POINT " + userPoint.toLocaleString()
    userCurrentPoint.append(newUserPoint)
    
    for (let i = 0; i < closingAuctions.length; i++) {
        let auctionId = closingAuctions[i].id

        const newAuction = document.createElement("div")
        newAuction.setAttribute("class", "auction closing-auction")
        closingAuctionsList.append(newAuction)

        const newAnchor = document.createElement("a")
        newAnchor.setAttribute("href", "#")
        newAnchor.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${auctionId}`
        })
        newAuction.append(newAnchor)
        
        
        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", closingAuctions[i]['painting']['image'])
        newAnchor.append(newImage)

        const newOverlay = document.createElement("div")
        newOverlay.setAttribute("class", "overlay")
        newAnchor.append(newOverlay)
        
        const newText = document.createElement("div")
        const newLine = document.createElement("br")
        const newSpan = document.createElement("span")
        newSpan.setAttribute("class", "time-remaining")

        newText.setAttribute("class", "text")
        newText.innerHTML += '제목: ' + closingAuctions[i]['painting']['title']
        newText.append(newLine)
        newText.innerHTML += '원작자: ' + closingAuctions[i]['painting']['artist']['nickname']
        newText.append(newLine)
        newText.innerHTML += '현 소유자: ' + closingAuctions[i]['painting']['owner']
        newText.append(newLine)
        newText.innerHTML += '입찰가: ' + closingAuctions[i]['current_bid']
        newText.append(newLine)
        newSpan.innerHTML += '남은 시간: ' + closingAuctions[i]['auction_end_date']
        newText.append(newSpan)
        newOverlay.append(newText)
    }
    
    for (let i = 0; i < hotAuctions.length; i++) {
        let auctionId = hotAuctions[i].id
        
        const newAuction = document.createElement("div")
        newAuction.setAttribute("class", "auction hot-auction")
        hotAuctionsList.append(newAuction)
        
        const newAnchor = document.createElement("a")
        newAnchor.setAttribute("href", "#")
        newAnchor.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${auctionId}`
        })
        newAuction.append(newAnchor)
        
        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", hotAuctions[i]['painting']['image'])
        newAnchor.append(newImage)
        
        const newOverlay = document.createElement("div")
        newOverlay.setAttribute("class", "overlay")
        newAnchor.append(newOverlay)
        
        const newText = document.createElement("div")
        const newLine = document.createElement("br")
        newText.setAttribute("class", "text")
        newText.innerHTML += '제목: ' + hotAuctions[i]['painting']['title']
        newText.append(newLine)
        newText.innerHTML += '원작자: ' + hotAuctions[i]['painting']['artist']['nickname']
        newText.append(newLine)
        newText.innerHTML += '현 소유자: ' + hotAuctions[i]['painting']['owner']
        newText.append(newLine)
        newText.innerHTML += '입찰가: ' + hotAuctions[i]['current_bid']
        newText.append(newLine)
        newOverlay.append(newText)
    }
    
    for (let i = 0; i < noBidAuctions.length; i++) {
        let auctionId = noBidAuctions[i].id
        
        const newAuction = document.createElement("div")
        newAuction.setAttribute("class", "auction nobid-auction")
        noBidAuctionsList.append(newAuction)
        
        const newAnchor = document.createElement("a")
        newAnchor.setAttribute("href", "#")
        newAnchor.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${auctionId}`
        })
        newAuction.append(newAnchor)
        
        
        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", noBidAuctions[i]['painting']['image'])
        newAnchor.append(newImage)
        
        const newOverlay = document.createElement("div")
        newOverlay.setAttribute("class", "overlay")
        newAnchor.append(newOverlay)
        
        const newText = document.createElement("div")
        const newLine = document.createElement("br")
        newText.setAttribute("class", "text")
        newText.innerHTML += '제목: ' + noBidAuctions[i]['painting']['title']
        newText.append(newLine)
        newText.innerHTML += '원작자: ' + noBidAuctions[i]['painting']['artist']['nickname']
        newText.append(newLine)
        newText.innerHTML += '현 소유자: ' + noBidAuctions[i]['painting']['owner']
        newText.append(newLine)
        newText.innerHTML += '입찰가: ' + noBidAuctions[i]['current_bid']
        newText.append(newLine)
        newOverlay.append(newText)
    }
    
}

// 카테고리별 경매 아이템 보여주기
async function getCategoryAuctionView(category) {
    
    // Load More Btn 초기화
    closingAuctionsCount = 4;
    hotAuctionsCount = 4;
    noBidAuctionsCount = 4;

    // api.js에서 카테고리별 경매 데이터 조회
    const auctions = await categoryView(category);

    // 경매 data를 html에 append
    let closingAuctions = auctions['closing_auctions']
    let hotAuctions = auctions['hot_auctions']
    let noBidAuctions = auctions['nobid_auctions']
    const closingAuctionsList = document.getElementById("closing-auction-container")
    const hotAuctionsList = document.getElementById("hot-auction-container")
    const noBidAuctionsList = document.getElementById("nobid-auction-container")

    btnView(closingAuctions, hotAuctions, noBidAuctions)

    // 함수 실행시 기존 각 auction-container의 child node 모두 삭제
    closingAuctionsList.replaceChildren()
    hotAuctionsList.replaceChildren()
    noBidAuctionsList.replaceChildren()


    for (let i = 0; i < closingAuctions.length; i++) {
        let auctionId = closingAuctions[i].id

        const newAuction = document.createElement("div")
        newAuction.setAttribute("class", "auction closing-auction")
        closingAuctionsList.append(newAuction)

        const newAnchor = document.createElement("a")
        newAnchor.setAttribute("href", "#")
        newAnchor.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${auctionId}`
        })
        newAuction.append(newAnchor)


        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", closingAuctions[i]['painting']['image'])
        newAnchor.append(newImage)

        const newOverlay = document.createElement("div")
        newOverlay.setAttribute("class", "overlay")
        newAnchor.append(newOverlay)

        const newText = document.createElement("div")
        const newLine = document.createElement("br")
        const newSpan = document.createElement("span")
        newSpan.setAttribute("class", "time-remaining")

        newText.setAttribute("class", "text")
        newText.innerHTML += '제목: ' + closingAuctions[i]['painting']['title']
        newText.append(newLine)
        newText.innerHTML += '원작자: ' + closingAuctions[i]['painting']['artist']['nickname']
        newText.append(newLine)
        newText.innerHTML += '현 소유자: ' + closingAuctions[i]['painting']['owner']
        newText.append(newLine)
        newText.innerHTML += '입찰가: ' + closingAuctions[i]['current_bid']
        newText.append(newLine)
        newSpan.innerHTML += '남은 시간: ' + closingAuctions[i]['auction_end_date']
        newText.append(newSpan)
        newOverlay.append(newText)
    }

    for (let i = 0; i < hotAuctions.length; i++) {
        let auctionId = hotAuctions[i].id

        const newAuction = document.createElement("div")
        newAuction.setAttribute("class", "auction hot-auction")
        hotAuctionsList.append(newAuction)

        const newAnchor = document.createElement("a")
        newAnchor.setAttribute("href", "#")
        newAnchor.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${auctionId}`
        })
        newAuction.append(newAnchor)

        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", hotAuctions[i]['painting']['image'])
        newAnchor.append(newImage)

        const newOverlay = document.createElement("div")
        newOverlay.setAttribute("class", "overlay")
        newAnchor.append(newOverlay)

        const newText = document.createElement("div")
        const newLine = document.createElement("br")
        newText.setAttribute("class", "text")
        newText.innerHTML += '제목: ' + hotAuctions[i]['painting']['title']
        newText.append(newLine)
        newText.innerHTML += '원작자: ' + hotAuctions[i]['painting']['artist']['nickname']
        newText.append(newLine)
        newText.innerHTML += '현 소유자: ' + hotAuctions[i]['painting']['owner']
        newText.append(newLine)
        newText.innerHTML += '입찰가: ' + hotAuctions[i]['current_bid']
        newText.append(newLine)
        newOverlay.append(newText)
    }

    for (let i = 0; i < noBidAuctions.length; i++) {
        let auctionId = noBidAuctions[i].id

        const newAuction = document.createElement("div")
        newAuction.setAttribute("class", "auction nobid-auction")
        noBidAuctionsList.append(newAuction)

        const newAnchor = document.createElement("a")
        newAnchor.setAttribute("href", "#")
        newAnchor.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${auctionId}`
        })
        newAuction.append(newAnchor)


        const newImage = document.createElement("img")
        newImage.setAttribute("class", "image")
        newImage.setAttribute("src", hotAuctions[i]['painting']['image'])
        newAnchor.append(newImage)

        const newOverlay = document.createElement("div")
        newOverlay.setAttribute("class", "overlay")
        newAnchor.append(newOverlay)

        const newText = document.createElement("div")
        const newLine = document.createElement("br")
        newText.setAttribute("class", "text")
        newText.innerHTML += '제목: ' + noBidAuctions[i]['painting']['title']
        newText.append(newLine)
        newText.innerHTML += '원작자: ' + noBidAuctions[i]['painting']['artist']['nickname']
        newText.append(newLine)
        newText.innerHTML += '현 소유자: ' + noBidAuctions[i]['painting']['owner']
        newText.append(newLine)
        newText.innerHTML += '입찰가: ' + noBidAuctions[i]['current_bid']
        newText.append(newLine)
        newOverlay.append(newText)
    }

}


// Load More Button - 누를시 보여주는 경매 아이템을 4개씩 증가
let closingAuction = document.getElementsByClassName('closing-auction');
const loadMoreClosingBtn = document.querySelector('#load-more-closing');
let closingAuctionsCount = 4;
loadMoreClosingBtn.addEventListener('click',
    function () {
        for (let i = closingAuctionsCount; i < closingAuctionsCount + 4; i++) {
            if (closingAuction[i]) {
                closingAuction[i].style.display = 'block';
            }
        }
        closingAuctionsCount += 4;
        if (closingAuctionsCount >= closingAuction.length) {
            event.target.style.display = 'none';
        }
    }
)

let hotAuction = document.getElementsByClassName('hot-auction');
const loadMoreHotBtn = document.querySelector('#load-more-hot');
let hotAuctionsCount = 4;
loadMoreHotBtn.addEventListener('click',
    function () {
        for (let i = hotAuctionsCount; i < hotAuctionsCount + 4; i++) {
            if (hotAuction[i]) {
                hotAuction[i].style.display = 'block';
            }
        }
        hotAuctionsCount += 4;
        if (hotAuctionsCount >= hotAuction.length) {
            event.target.style.display = 'none';
        }
    }
)

let noBidAuction = document.getElementsByClassName('nobid-auction');
const loadMoreNoBidBtn = document.querySelector('#load-more-nobid');
let noBidAuctionsCount = 4;
loadMoreNoBidBtn.addEventListener('click',
    function () {
        for (let i = noBidAuctionsCount; i < noBidAuctionsCount + 4; i++) {
            if (noBidAuction[i]) {
                noBidAuction[i].style.display = 'block';
            }
        }
        noBidAuctionsCount += 4;
        if (noBidAuctionsCount >= noBidAuction.length) {
            event.target.style.display = 'none';
        }
    }
)

// 경매가 4개 이상일 경우에만 Load More Button 보여주기
// 비동기 페이지에서는 버튼을 숨겨주는 함수를 추가적으로 만들어야함
function btnView(closingAuctions, hotAuctions, noBidAuctions){

    if (closingAuctions.length > 4) {
        loadMoreClosingBtn.style.display = 'block';
    }
    else {
        loadMoreClosingBtn.style.display = 'none';
    }
    if (hotAuctions.length > 4) {
        loadMoreHotBtn.style.display = 'block';
    }
    else {
        loadMoreHotBtn.style.display = 'none';
    }
    if (noBidAuctions.length > 4) {
        loadMoreNoBidBtn.style.display = 'block';   
    }
    else {
        loadMoreNoBidBtn.style.display = 'none';
    }
}

// 페이지 로딩이 완료되면 실행
$('document').ready(getAllAuctionView());