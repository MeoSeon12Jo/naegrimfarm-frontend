const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function getGalleryListData(){
    
    const response = await fetch(`${backend_base_url}/gallery`, {})
    
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
    
    const response = await fetch(`${backend_base_url}/gallery/${nickname}`, {})
    
    if (response.status == 200){
        response_json = await response.json()
        return response_json
    }
    else {
        alert(response.status)
    }
}