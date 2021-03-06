const backEndBaseUrl = "http://3.39.193.83"
const frontEndBaseUrl = "https://www.naegrimfarm.site"
const token = localStorage.getItem("farm_access_token");

async function auctionView() {

    const response = await fetch(`${backEndBaseUrl}/auction/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        }
    }
    )

    response_json = await response.json()

    if (response.status == 200) {
        auctions = response_json
        return auctions
    }

    else {
        return response.status
    }
}


// Query parameter로 카테고리별 경매정보 조회
async function categoryView(category) {

    const response = await fetch(`${backEndBaseUrl}/auction/?category=${category}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        }
    })

    response_json = await response.json()

    if (response.status == 200) {
        auctions = response_json
        return auctions
    }

    else {
        return response.status
    }
}