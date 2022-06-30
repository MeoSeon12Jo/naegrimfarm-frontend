const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function galleryView(){

    const response = await fetch(`${backend_base_url}/gallery`, {})

    if (response.status == 200){
        response_json = await response.json()
        users = response_json

        const galleries = document.getElementsByClassName("gallery_list")

        for (let i = 0; i < users.length; i++){
            var new_gallery = document.createElement("div")
            new_gallery.setAttribute("class", "gallery")
            galleries[0].append(new_gallery)

            var new_gallery_content = document.createElement("div")
            new_gallery_content.setAttribute("class", "content")
            new_gallery.append(new_gallery_content)
            
            var new_text = document.createElement("div")
            new_text.setAttribute("class", "text")
            new_gallery_content.append(new_text)
            
            var new_image = document.createElement("img")
            new_image.setAttribute("class", "image")
            new_image.setAttribute("src", "https://m.7art7.com/web/product/big/202012/4dc33b6141e960cb7f820ea58172f5d5.jpg")
            new_gallery_content.append(new_image)

            nickname = users[i].nickname

            const new_nickname = document.createElement("p")
            new_nickname.innerText = nickname
            new_text.append(new_nickname)

            const new_quantity = document.createElement("p")
            new_quantity.innerText = '전시된 작품 : ' + users[i].paintings_list.length
            new_text.append(new_quantity)
        }
    }
    else{
        console.log('GET 요청이 실패하였습니다')
    }
}