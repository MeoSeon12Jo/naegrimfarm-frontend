// Load More Button
var closingAuctions = document.querySelectorAll('#closing-auction');
var loadMoreClosingBtn = document.querySelector('#load-more-closing');
var closingAuctionsCount = 4;
loadMoreClosingBtn.addEventListener('click',
    function () {
        for (var i = closingAuctionsCount; i < closingAuctionsCount + 4; i++) {
            if (closingAuctions[i]) {
                closingAuctions[i].style.display = 'block';
            }
        }
        closingAuctionsCount += 4;
        if (closingAuctionsCount >= closingAuctions.length) {
            event.target.style.display = 'none';
        }
    }
)

var hotAuctions = document.querySelectorAll('#hot-auction');
var loadMoreHotBtn = document.querySelector('#load-more-hot');
var hotAuctionsCount = 4;
loadMoreHotBtn.addEventListener('click',
    function () {
        for (var i = hotAuctionsCount; i < hotAuctionsCount + 4; i++) {
            if (hotAuctions[i]) {
                hotAuctions[i].style.display = 'block';
            }
        }
        hotAuctionsCount += 4;
        if (hotAuctionsCount >= hotAuctions.length) {
            event.target.style.display = 'none';
        }
    }
)

var noBidAuctions = document.querySelectorAll('#nobid-auction');
var loadMoreNoBidBtn = document.querySelector('#load-more-nobid');
var noBidAuctionsCount = 4;
loadMoreNoBidBtn.addEventListener('click',
    function () {
        for (var i = noBidAuctionsCount; i < noBidAuctionsCount + 4; i++) {
            if (noBidAuctions[i]) {
                noBidAuctions[i].style.display = 'block';
            }
        }
        noBidAuctionsCount += 4;
        if (noBidAuctionsCount >= noBidAuctions.length) {
            event.target.style.display = 'none';
        }
    }
)
