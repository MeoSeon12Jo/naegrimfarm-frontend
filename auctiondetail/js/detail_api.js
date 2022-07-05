const backEndBaseUrl = "http://3.39.193.83"
const frontEndBaseUrl = "https://neon-queijadas-c23bce.netlify.app"
const token = localStorage.getItem("farm_access_token");


async function auctionDetailView(id){

    const response = await fetch(`${backEndBaseUrl}/auction/detail/${id}`, {
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
        let detailInfo = response_json
        return detailInfo

    }else {
        alert(response_json["error"])
        window.location.replace("/auction/auction_list.html")
    }
}

async function bidView(bid_price, id){

    const bidInput = document.getElementById("current_bid");

    const bidPriceData = {
        "current_bid" : bid_price,
    }
    const response = await fetch(`${backEndBaseUrl}/auction/detail/${id}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        },
        body:JSON.stringify(bidPriceData)
    }
    )
    response_json = await response.json()
    
    if (response.status == 200) {
        alert("입찰에 성공했습니다. 포인트는 선차감 되며 낙찰실패시 반환됩니다.")
        bidInfo = response_json
        bidInput.value = null;
        return bidInfo

    }else {
        alert(response_json["error"])
        bidInput.value = null;
    }
}

async function commentView(content, id){

    const commentInput = document.getElementById("comment-content");

    const commentTextData = {
        "content" : content,
    }
    const response = await fetch(`${backEndBaseUrl}/auction/detail/comment/${id}/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        },
        body:JSON.stringify(commentTextData)
    }
    )
    response_json = await response.json()
    
    if (response.status == 200) {
        commentInput.value = null;
        return response_json

    }else {
        alert(response_json["error"])
        commentInput.value = null;
    }
}

async function deleteCommentView(id){

    const response = await fetch(`${backEndBaseUrl}/auction/detail/comment/${id}/`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        },
    }
    )
    response_json = await response.json()
    
    if (response.status == 200) {
        return response_json

    }else {
        alert(response_json["error"])
    }
}

async function bookMarkView(id){

    const response = await fetch(`${backEndBaseUrl}/auction/detail/bookmark/${id}/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        },
    }
    )
    response_json = await response.json()
    
    if (response.status == 200) {
        return
    }else {
        alert(response_json["msg"])
    }
}


