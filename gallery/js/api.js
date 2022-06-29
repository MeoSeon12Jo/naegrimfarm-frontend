const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function galleryView(){

    const response = await fetch(`${backend_base_url}/gallery`, {})

    if (response.status == 200){
        response_json = await response.json()
        users = response_json

        const galleries = document.getElementsByClassName("galleriesbox-galleries")

        for (let i = 0; i < users.length; i++){
            const new_gallery = document.createElement("div")
            new_gallery.setAttribute("class", "galleriesbox-galleries-gallery")
            galleries[0].append(new_gallery)

            nickname = users[i].nickname

            const new_nickname = document.createElement("p")
            new_nickname.innerText = nickname
            new_gallery.append(new_nickname)

            const new_quantity = document.createElement("p")
            new_quantity.innerText = '전시된 작품 : ' + users[i].paintings_list.length
            new_gallery.append(new_quantity)
        }
    }
    else{
        console.log('GET 요청이 실패하였습니다')
    }
}