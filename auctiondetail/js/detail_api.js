const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

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

function onLogout(){
    localStorage.removeItem("farm_access_token")
    localStorage.removeItem("farm_refresh_token")
    localStorage.removeItem("payload")
    // window.location.replace(`${frontend_base_url}/`);
    window.location.reload();
}

async function auctionDetailView(id){
    const token = localStorage.getItem("farm_access_token");
    const response = await fetch(`${backend_base_url}/auction/detail/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token,
        }
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        detail_info = response_json

        return detail_info
    }else {
        alert(response["error"])
    }
}