const backendBaseUrl = "http://127.0.0.1:8000"
const frontendBaseUrl = "http://127.0.0.1:5500"


async function getGalleryListData(){
    
    const response = await fetch(`${backendBaseUrl}/gallery`, {})
    
    if (response.status == 200){
        users = await response.json()
        return users
    }
    else{
        alert('작품을 소유하고 있는 유저가 없습니다')
        console.log(response.status)
    }
}

async function getUserGalleryData(nickname){
    
    const response = await fetch(`${backendBaseUrl}/gallery/${nickname}`, {})
    
    if (response.status == 200){
        responseJson = await response.json()
        return responseJson
    }
    else {
        console.log(response.status)
    }
}