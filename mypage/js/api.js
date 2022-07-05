const backendBaseUrl = "http://3.39.193.83"
const frontendBaseUrl = "https://neon-queijadas-c23bce.netlify.app"
const token = localStorage.getItem("farm_access_token");

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');


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