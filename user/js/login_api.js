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

    const response = await fetch(`${backend_base_url}/user/api/farm/token/`, {
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
    console.log(response_json)

    if (response.status == 200){
        console.log(response_json)
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
        window.location.replace(`${frontend_base_url}/index/mainpage.html`);
    }else {
        //로그인 실패시
        alert(response_json["detail"])
        window.location.reload();
    }
}
// 페이지를 다시 로딩 하면 벌어지는 일들!
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