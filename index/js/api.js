const backendBaseUrl = "http://127.0.0.1:8000"
const frontendBaseUrl = "http://127.0.0.1:5500"

function getCookie(name) {
    let cookie_value = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        console.log(cookies)
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookie_value = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookie_value;
}
const csrftoken = get_cookie('csrftoken')


async function uploadAuction() {
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startPrice = document.getElementById('start-price').value;
    const bidEndDate = document.getElementById('bid-end-date').value;
    const image = document.getElementById("result-img").files[0];
    let formDataAuction = new FormData();
    let formDataPainting = new FormData();
    
    // Auction: id, start_bid, current_bid, auction_start_date, auction_end_date, painting, bidder
    // Painting: id, artist, owner, title, description, category, image, is_auction
    
    formDataPainting.append('category', category);
    formDataPainting.append('title', title);
    formDataPainting.append('description', description);
    //formDataPainting.append('artist', )
    //formDataPainting.append('owner', )
    formDataPainting.append('image', image);
    formDataPainting.append('is_auction', true);

    
    formDataAuction.append('start_bid', startPrice);
    formDataAuction.append('current_bid', startPrice);
    formDataAuction.append('auction_end_date', bidEndDate);
    formDataAuction.append('painting', formDataPainting)
    //formData.append('bidder', );

    if (title && description && startPrice && bidEndDate && image) {
        const token = localStorage.getItem('access')
        
        const response = await fetch(`${backendBaseUrl}/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: formData
        })

        response_json = await response.json()
        // console.log(response_json)
        if (response.status == 200){
            alert("경매 등록 완료")
            window.location.replace(`${frontEndBaseUrl}/index/mainpage.html`);
        }else {
            alert(response_json["error"])
        }
    }
}