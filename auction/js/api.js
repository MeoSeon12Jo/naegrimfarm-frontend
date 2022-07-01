const backend_base_url = "http://127.0.0.1:8000"
// const frontend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5555"

async function auctionView() {

    const response = await fetch(`${backend_base_url}/auction/`, {})

    // 경매 data 조회하기
    if (response.status == 200) {
        response_json = await response.json()
        auctions = response_json

        return auctions
    }

    else {
        return response.status
    }
}

// Query parameter로 카테고리별 경매정보 조회
async function categoryView(category) {

    const response = await fetch(`${backend_base_url}/auction/?category=${category}`, {})

    if (response.status == 200) {
        response_json = await response.json()
        auctions = response_json

        return auctions
    }

    else {
        return response.status
    }
}