var galleries = document.querySelectorAll('.galleriesbox-galleries');
var loadMoreBtn = document.querySelector('.loadmore');
var galleriesCount = 4;
loadMoreBtn.addEventListener('click',
    function () {
        for (var i = galleriesCount; i < galleriesCount + 4; i++) {
            if (galleries[i]) {
                galleries[i].style.display = 'block';
            }
        }
        galleriesCount += 4;
        if (galleriesCount >= galleries.length) {
            event.target.style.display = 'none';
        }
    }
)

galleryView()