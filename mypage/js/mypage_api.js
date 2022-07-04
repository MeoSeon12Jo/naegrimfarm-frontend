const backendBaseUrl = "http://127.0.0.1:8000"
const frontendBaseUrl = "http://127.0.0.1:5500"

async function getUserGalleryData(){
    
    const response = await fetch(`${backendBaseUrl}/gallery/mypage/`, {})
    
    if (response.status == 200){
        responseJson = await response.json()
        return responseJson
    }
    else {
        console.log(response.status)
    }
}