const backend_base_url = "http://127.0.0.1:8000"
// const frontend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5555"

auctionView()

async function auctionView(){

    const response = await fetch(`${backend_base_url}/auction/`, {})
    
    // 경매 조회하기 GET
    if (response.status == 200){
        response_json = await response.json()
        auctions = response_json
        var closingAuctions = auctions['closing_auctions']
        var hotAuctions = auctions['hot_auctions']
        var noBidAuctions = auctions['nobid_auctions']

        // console.log(hotAuctions.length)


        const hotAuctionsList = document.getElementById("hot-auction-container")

        for (let i=0; i<hotAuctions.length; i++){
            var newAuction = document.createElement("div")
            newAuction.setAttribute("class", "auction hot-auction")
            hotAuctionsList.append(newAuction)

            var newAnchor = document.createElement("a")
            newAnchor.setAttribute("href", "#")
            newAuction.append(newAnchor)
            

            var newImage = document.createElement("img")
            newImage.setAttribute("class", "image")
            newAnchor.append(newImage)

            var newOverlay = document.createElement("div")
            newOverlay.setAttribute("class", "overlay")
            newAnchor.append(newOverlay)

            var newText = document.createElement("div")
            var newLine = document.createElement("br")
            newText.setAttribute("class", "text")
            newText.innerHTML += '제목: ' + hotAuctions[i]['painting']['title']
            newText.append(newLine)
            newText.innerHTML += '원작자: ' + hotAuctions[i]['painting']['artist']['nickname']
            newText.append(newLine)
            newText.innerHTML += '현 소유자: ' + hotAuctions[i]['painting']['owner']
            newText.append(newLine)
            newText.innerHTML += 'Current Bid: ' + hotAuctions[i]['current_bid']
            newText.append(newLine)
            newText.innerHTML += 'Time Remaining: ' + hotAuctions[i]['auction_end_date']
            newText.append(newLine)
            newOverlay.append(newText)
        
        }

    }

    else{
        console.log('GET 요청이 실패하였습니다')
    }
}