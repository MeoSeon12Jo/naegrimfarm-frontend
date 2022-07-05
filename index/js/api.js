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

// function styleTransform() {
//     const originalImg = document.getElementById('image-upload').style.backgroundImage;
//     $.ajax({
//         type: 'POST',
//         url: `${backend_base_url}/main`,
//         data: {originalImg},
//         headers: { 'Authorization': localStorage.getItem("token") }, 
//         success: function (response) {
//             let image = response['image']
//             console.log(image)

//             $('#result-img').style.backgroundImage=img
//         }
//     })
//     console.log(formData);
//     console.log("로딩 시작");
//     const response_json = await response.json();
//     console.log("로딩 끝");
//     console.log(originalImg);
// }

async function uploadAuction() {
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startPrice = document.getElementById('start-price').value;
    const bidEndDate = document.getElementById('bid-end-date').value;
    const image = document.getElementById("result-img").style.backgroundImage;

    formDataPainting = new FormData();
    formDataAuction = new FormData();

    formDataPainting.append('category', category);
    formDataPainting.append('title', title);
    formDataPainting.append('description', description);
    formDataPainting.append('image', image);
    
    formDataAuction.append('painting', formDataPainting)
    formDataAuction.append('start_bid', startPrice);
    formDataAuction.append('auction_end_date', bidEndDate);

    if (title && description && image && bidEndDate &&image) {
        const response = await fetch(`${backendBaseUrl}/make-painting/`, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': "Bearer " + localStorage.getItem("farm_access_token"),
                'X-CSRFToken': csrftoken,
            },
            body: formDataPainting,
        });

        const response_json = await response.json();
        
        const response2 = await fetch(`${backendBaseUrl}/upload/`, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': "Bearer " + localStorage.getItem("farm_access_token"),
                'X-CSRFToken': csrftoken,
            },
            body: formDataAuction,
        });
        const response2_json = await response2.json();

        if (response.status === 200 && response2.status === 200) {
            alert("업로드 성공");
            window.location.reload();
        } else if (response.status === 400) {
            alert("업로드 실패");
            // window.location.reload();
        }
    }
    else {
        alert("모든 빈칸을 채워주세요");
    }
}



// async function uploadAuction() {
//     const category = document.getElementById('category').value;
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const startPrice = document.getElementById('start-price').value;
//     const bidEndDate = document.getElementById('bid-end-date').value;
//     let formDataPainting = new FormData();

//     // Auction: id, start_bid, current_bid, auction_start_date, auction_end_date, painting, bidder
//     // Painting: id, artist, owner, title, description, category, image, is_auction

//     formDataPainting.append('category', category);
//     formDataPainting.append('title', title);
//     formDataPainting.append('description', description);
//     //formDataPainting.append('artist', )
//     //formDataPainting.append('owner', )
//     formDataPainting.append('image', image);
//     formDataPainting.append('is_auction', true);

//     if (title && description && startPrice && bidEndDate && image) {
//         const token = localStorage.getItem('access')

//         const response = await fetch(`${backendBaseUrl}/auction`, {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 Accept: "application/json",
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrftoken,
//             },
//             body: formDataPainting
//         })

//         response_json = await response.json()
//         // console.log(response_json)
//         if (response.status == 200) {
//             alert("경매 등록 완료")
//             window.location.replace(`${frontEndBaseUrl}/index/mainpage.html`);
//         } else {
//             alert(response_json["error"])
//         }
//     }
// }