const backEndBaseUrl = "http://3.39.193.83"
const frontEndBaseUrl = "https://www.naegrimfarm.site"

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

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


async function onLogin() {

    const loginData = {
        email : document.getElementById("inputEmail").value,
        password : document.getElementById("inputPassword").value
    }

    const response = await fetch(`${backEndBaseUrl}/user/api/farm/token/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(loginData)
    }
    )
    response_json = await response.json()

    if (response.status == 200){
        localStorage.setItem("farm_access_token", response_json.access)
        localStorage.setItem("farm_refresh_token", response_json.refresh)

        // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        // accessToken 에서 payload를 가져오는 코드-
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        alert("로그인 성공!")
        window.location.replace(`${frontEndBaseUrl}/index/mainpage.html`);
    }else {
        //로그인 실패시
        alert(response_json["detail"])
        window.location.reload();
    }
}

