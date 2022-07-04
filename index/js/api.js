const backendBaseUrl = "http://127.0.0.1:5501"
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
const csrftoken = getCookie('csrftoken')

async function styleTransform() {
    const originalImg = document.getElementById('image-upload').style.backgroundImage;
    console.log(originalImg);
}

// async function getCategoryList(){
//     const response = await fetch(`${backendBaseUrl}/`, {})
    
//     if (response.status == 200){
//         response_json = await response.json()
//         users = response_json
//         console.log(users)
//         return users
//     }

//     else{
//         alert(response.status)
//     }
// }
// getCategoryList();


async function uploadAuction() {
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startPrice = document.getElementById('start-price').value;
    const bidEndDate = document.getElementById('bid-end-date').value;
    const image = document.getElementById("result-img").files;
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
    
    if (title && description && startPrice && bidEndDate && image) {
        const token = localStorage.getItem('access')
        
        const response = await fetch(`${backendBaseUrl}/gallery`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: formDataPainting
        })

        response_json = await response.json()
        // console.log(response_json)
        if (response.status == 200){
            alert("그림 등록 완료")
            window.location.replace(`${frontEndBaseUrl}/index/mainpage.html`);
        }else {
            alert(response_json["error"])
        }
    }
}