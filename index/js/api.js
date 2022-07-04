const backendBaseUrl = "http://127.0.0.1:5501"
const frontendBaseUrl = "http://127.0.0.1:5500"

window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)) {

    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
            const response = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    "refresh": localStorage.getItem("farm_refresh_token")
                })
            }
            );
            return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken(`${backend_base_url}/user/api/token/refresh/`).then((data) => {
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;

            localStorage.setItem("farm_access_token", accessToken);
        });
    }
};

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


async function saveImg() {
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startPrice = document.getElementById('start-price').value;
    const bidEndDate = document.getElementById('bid-end-date').value;
    const image = document.getElementById("result-img").style.backgroundImage;
    let formDataPainting = new FormData();
    
    // Auction: id, start_bid, current_bid, auction_start_date, auction_end_date, painting, bidder
    // Painting: id, artist, owner, title, description, category, image, is_auction
    formDataPainting.append('category', category);
    formDataPainting.append('title', title);
    formDataPainting.append('description', description);
    //formDataPainting.append('artist', )
    //formDataPainting.append('owner', )
    formDataPainting.append('image', image);
    formDataPainting.append('is_auction', false);
    
    if (title && description && image) {
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


async function uploadAuction() {
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startPrice = document.getElementById('start-price').value;
    const bidEndDate = document.getElementById('bid-end-date').value;
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
        
        const response = await fetch(`${backendBaseUrl}/auction`, {
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
            alert("경매 등록 완료")
            window.location.replace(`${frontEndBaseUrl}/index/mainpage.html`);
        }else {
            alert(response_json["error"])
        }
    }
}