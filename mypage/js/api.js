const backendBaseUrl = "http://3.39.193.83"
const frontendBaseUrl = "https://www.naegrimfarm.site"
const token = localStorage.getItem("farm_access_token");



async function getMyPageData(nickname){
    
    const response = await fetch(`${backendBaseUrl}/mypage/${nickname}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        }
    })
    
    if (response.status == 200){
        data = await response.json()
        return data
    }
    else {
        console.log(response.status, "유저 활동 데이터가 없습니다")
        return response.status
    }
}