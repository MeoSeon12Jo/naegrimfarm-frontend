const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


// // 로그인함수
// async function onLogin(){
//     console.log("handle login")

//     const loginData = {
//         email : document.getElementById("email").value,
//         password : document.getElementById("password").value
//     }
    
//     const response = await fetch(`${backend_base_url}/user/login/`,{
//         method:'POST',
//         body:JSON.stringify(loginData)
//     }
//     )
//     response_json = await response.json()
    
//     localStorage.setItem("token", response_json.token)

//     if (response.status == 200){
//         window.location.replace(`${frontend_base_url}/user/signup.html`);
//     }else {
//         alert(response.status)
//     }
// }

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

async function login() {
    // const email = document.getElementById('inputEmail').value;
    // const password = document.getElementById('inputPassword').value;
    const loginData = {
        email : document.getElementById("inputEmail").value,
        password : document.getElementById("inputPassword").value
    }

    const response = await fetch(`${backend_base_url}/user/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
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
        alert(response_json["msg"])
        
    }else if (response.status == 400){
        alert("이메일 또는 비밀번호가 일치하지 않습니다.")
        console.log(response_json)
        window.location.reload();
    }else {
        alert("이메일/비밀번호를 입력해주세요.")
    }
}


const onLogin = (e)=>{
    const requestAccessToken = async (url, sendData)=>{
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            method: "POST",
            body: JSON.stringify(sendData)
        });

        return response.json();
    };

    const data = new FormData(e);
    const loginInfo = {
        "email": data.get("email"),
        "password": data.get("password")
    };

    requestAccessToken(`${backend_base_url}/user/api/farm/token/`, loginInfo).then((data=>{

        const accessToken = data.access;
        const refreshToken = data.refresh;
        document.querySelector("#access-token").value = accessToken;
        document.querySelector("#refresh-token").value = refreshToken;
                
                // 서버로 부터 응답받은 accessToken과 refreshToken, payload 저장

        localStorage.setItem("farm_access_token", accessToken);
        localStorage.setItem("farm_refresh_token", refreshToken);

        // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        // accessToken 에서 payload를 가져오는 코드
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        document.querySelector("#payload").value = jsonPayload;

        localStorage.setItem("payload", jsonPayload);
    }));
    return alert("이거되니?");
};
    // 페이지를 다시 로딩 하면 벌어지는 일들!
    window.onload = ()=>{
        const payload = JSON.parse(localStorage.getItem("payload"));

        // 아직 access 토큰의 인가 유효시간이 남은 경우
        if (payload.exp > (Date.now() / 1000)){
            document.querySelector("#loginForm").setAttribute("style", "display:none");

            document.querySelector("#access-token").value = localStorage.getItem("farm_access_token");
            document.querySelector("#refresh-token").value = localStorage.getItem("farm_refresh_token");
            document.querySelector("#payload").value = JSON.stringify(localStorage.getItem("payload"));

        } else {
            // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
            const requestRefreshToken = async (url) => {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "refresh": localStorage.getItem("farm_refresh_token")
                    })}
                );
                return response.json();
            };

            // 다시 인증 받은 accessToken을 localStorage에 저장하자.
            requestRefreshToken("/user/api/token/refresh/").then((data)=>{
                // 새롭게 발급 받은 accessToken을 localStorage에 저장
                const accessToken = data.access;
                document.querySelector("#access-token").value = accessToken;

                localStorage.setItem("farm_access_token", accessToken);
            });
        }
    };
    
    // const onRequestButtonClick = () => {
    //     const requestAuthData = async () => {
    //         const response = await fetch("/user/api/authonly/", {
    //             method:"GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Authorization": "Bearer " +localStorage.getItem("sparta_access_token")
    //             },
    //         });
      
    //         return response.json();
    //     }
    //     requestAuthData().then((data)=>{
    //           document.querySelector("#auth-only").value = data.message;
    //     })
    //   };