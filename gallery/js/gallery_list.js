galleryView()

var galleriesCount = 8
function loadData(){
    var galleries = document.querySelectorAll('.gallery')
    for (var i = galleriesCount; i < galleriesCount + 4; i++) {
        if (galleries[i]) {
            galleries[i].style.display = 'flex'
        }
    }
    galleriesCount += 4
    if (galleriesCount >= galleries.length) {
        event.target.style.display = 'none'
    }
}