const backendBaseUrl = "http://3.39.193.83"
const frontendBaseUrl = "http://127.0.0.1:5500"
const token = localStorage.getItem("farm_access_token");

async function getGalleryListData(){
    
    const response = await fetch(`${backendBaseUrl}/gallery`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        }
    })

    users = await response.json()
    
    if (response.status == 200){
        return users
    }
    else{
        alert('작품을 소유하고 있는 유저가 없습니다')
        console.log(response.status)
    }
}

async function getUserGalleryData(nickname){
    
    const response = await fetch(`${backendBaseUrl}/gallery/${nickname}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        }
    })

    paintings = await response.json()
    
    if (response.status == 200){
        return paintings
    }
    else {
        console.log(response.status)
    }
}