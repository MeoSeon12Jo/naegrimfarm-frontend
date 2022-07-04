function goMyPage(){

    const nickname = JSON.parse(localStorage.getItem("payload"))['nickname']
    const myPage = document.getElementsByClassName("my-page")
    myPage[0].setAttribute("href", `/mypage/mypage.html?${nickname}`)
    
$('.content')
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.type == "dragover") {
        $(e.target).css({
            "background-color": "black",
            "outline-offset": "-20px"
        });
    } else {
        $(e.target).css({
            "background-color": "gray",
            "outline-offset": "-10px"
        });
    }
}


function uploadFiles(e) {
    e.stopPropagation();
    e.preventDefault();
    dragOver(e); //1

    e.dataTransfer = e.originalEvent.dataTransfer; //2
    var files = e.target.files || e.dataTransfer.files;

    if (files.length > 1) {
        alert('사진은 한 장만 올려주세요.');
        return;
    }

    if (files[0].type.match(/image.*/)) {
        $(e.target).css({
            "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
            "outline": "none",
            "background-size": "100% 100%"
        });
        $('.drag-drop-msg').css({'color': 'transparent'});
    } else {
        alert('이미지 파일이 아닙니다.');
        return;
    }
}