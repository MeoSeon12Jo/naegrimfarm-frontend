const backendBaseUrl = "http://127.0.0.1:8000"
const frontendBaseUrl = "http://127.0.0.1:5500"


async function getGalleryListData(){
    
    const response = await fetch(`${backendBaseUrl}/gallery`, {})
    
    if (response.status == 200){
        response_json = await response.json()
        users = response_json
        return users
    }
    else{
        alert(response.status)
    }
}

async function getUserGalleryData(nickname){
    
    const response = await fetch(`${backendBaseUrl}/gallery/${nickname}`, {})
    
    if (response.status == 200){
        responseJson = await response.json()
        return responseJson
    }
    else {
        alert(response.status)
    }
}