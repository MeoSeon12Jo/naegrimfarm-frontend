const auctionId = location.href.split('?')[1]


// 댓글시간 나타내기
function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분
    console.log(time)

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
};


async function getDetail() {

    //api에서 return한 json데이터
    const detailInfo = await auctionDetailView(auctionId);

    //백엔드에서 가져온 데이터들 변수지정
    let auctionEndTime = detailInfo['time_left']
    let auctionEndDate = detailInfo['end_date']
    
    let category = detailInfo['painting']['category_name']
    let title = detailInfo['painting']['title']
    let artist = detailInfo['painting']['artist_name']
    
    let startBid = detailInfo['start_bid']
    let currentBid = detailInfo['current_bid']
    let description = detailInfo['painting']['description']
    let userComments = detailInfo['comments']
    let isBookMarked = detailInfo['is_bookmark']
    
    //나중에 여기에 이미지 url 저장해서 가져와야함.
    let image = detailInfo['painting']['image']
    let artistPaintings = detailInfo['painting']['artist_paintings']

    //데이터 붙어야하는 부모class
    const mainAuctionImage = document.getElementsByClassName("detail-image-place")[0]
    const differentAuctionImage = document.getElementsByClassName("artist-different-painting")[0]
    
    const auctionDescription = document.getElementsByClassName("painting-description-body")[0]
    const auctionCategory = document.getElementsByClassName("category-name-body")[0]
    const auctionTitle = document.getElementsByClassName("title-body")[0]
    const auctionArtist = document.getElementsByClassName("title-author")[0]
    const auctionComments = document.getElementsByClassName("one-comment")[0]
    const auctionBookMark = document.getElementsByClassName("bookmark-btn")[0]
    
    const auctionStartBid = document.getElementsByClassName("start-price")[0]
    const auctionCurrentBid = document.getElementsByClassName("now-price-innercolor")[0]
    
    const auctionTimeLeft = document.getElementsByClassName("timeleft")[0]
    const auctionEndingDate = document.getElementsByClassName("end-auction-box")[0]


    //데이터 태그만들어서 부모class에 붙여주는 부분//

    //작품 이미지
    const newPaintingImage = document.createElement("img")
    newPaintingImage.setAttribute("class", "detail-image")
    newPaintingImage.setAttribute("src", image)
    mainAuctionImage.append(newPaintingImage)

    //작품설명
    const newDescription = document.createElement("p")
    newDescription.setAttribute("class", "painting-description-text")
    newDescription.innerText = description
    auctionDescription.append(newDescription)
    
    //카테고리
    const newCategory = document.createElement("p")
    newCategory.setAttribute("class", "category")
    newCategory.innerText = category
    auctionCategory.append(newCategory)

    //남은 시간
    const newTimeLeft = document.createElement("p")
    newTimeLeft.setAttribute("class", "timeleft-time")
    newTimeLeft.innerText = auctionEndTime
    auctionTimeLeft.append(newTimeLeft)

    //제목
    const newTitle = document.createElement("p")
    newTitle.setAttribute("class", "title-text")
    newTitle.innerText = title
    auctionTitle.append(newTitle)

    //작가
    const newArtist = document.createElement("p")
    newArtist.setAttribute("class", "author-text")
    newArtist.innerText = artist
    auctionArtist.append(newArtist)

    //시작가
    const newStartBid = document.createElement("p")
    newStartBid.setAttribute("class", "price")
    newStartBid.innerText = startBid
    auctionStartBid.append(newStartBid)

    //현재가
    const newCurrentBid = document.createElement("p")
    newCurrentBid.setAttribute("class", "price")
    newCurrentBid.setAttribute("id", "nowPrice")
    newCurrentBid.innerText = currentBid
    auctionCurrentBid.append(newCurrentBid)

    //마감날짜
    const newEndDate = document.createElement("p")
    newEndDate.setAttribute("class", "end-auction-time")
    newEndDate.innerText = auctionEndDate
    auctionEndingDate.append(newEndDate)

    //북마크 아이콘
    if (isBookMarked == true) {
        auctionBookMark.innerHTML = `<i class="fa fa-bookmark" id="bookmark-icon" aria-hidden="true"></i>`
    }else{
        auctionBookMark.innerHTML = `<i class="fa fa-bookmark-o" id="bookmark-icon" aria-hidden="true"></i>`
    }
    
    //댓글 붙이는 부분
    for (let i = 0; i < userComments.length; i++) {
        const newCommentLayout = document.createElement("div")
        newCommentLayout.setAttribute("class", "bg-white p-2")
        auctionComments.prepend(newCommentLayout)

        const newCommentUser = document.createElement("div")
        newCommentUser.setAttribute("class", "d-flex flex-row user-info")
        newCommentLayout.append(newCommentUser)

        const newCommentUserInfo = document.createElement("div")
        newCommentUserInfo.setAttribute("class", "d-flex flex-column justify-content-start ml-2")
        newCommentUser.append(newCommentUserInfo)
        
        //유저닉네임
        const newCommentUserName = document.createElement("span")
        newCommentUserName.setAttribute("class", "d-block font-weight-bold name")
        newCommentUserName.innerText = userComments[i]['username']
        newCommentUserInfo.append(newCommentUserName)
        
        //댓글단 시간
        const newCommentTime = document.createElement("span")
        newCommentTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(detailInfo['comments'][i]['create_time'])
        let time_before = time2str(time_post)
        time2str(time_post)

        newCommentTime.innerText = time_before
        newCommentUserInfo.append(newCommentTime)

        const newCommentArea = document.createElement("div")
        newCommentArea.setAttribute("class", "mt-2")
        newCommentLayout.append(newCommentArea)

        //댓글내용
        const newCommentText = document.createElement("p")
        newCommentText.setAttribute("class", "comment-text")
        newCommentText.innerText = userComments[i]['content']
        newCommentArea.append(newCommentText)

        //삭제버튼
        if (detailInfo['comments'][i]['username'] == detailInfo['request_username']){
            const newDeleteBtn = document.createElement("button")
            newDeleteBtn.setAttribute("class", "comment-delete")
            newDeleteBtn.setAttribute("id", detailInfo['comments'][i]['id'])
            newDeleteBtn.setAttribute("onclick", "deleteComment(this)")
            newDeleteBtn.innerText = "삭제"
            newCommentUser.append(newDeleteBtn)
        }
    }

    //작가의 작품 이미지 붙이는 부분
    for (let i = 0; i < artistPaintings.length; i++) {
        const artistAuctionId = artistPaintings[i]['auction_id']
        const newArtistDifferentImage = document.createElement("img")
        newArtistDifferentImage.setAttribute("class", "artist-different-image")
        newArtistDifferentImage.setAttribute("type", "button")
        newArtistDifferentImage.setAttribute("src", artistPaintings[i]['painting_image'])
        newArtistDifferentImage.setAttribute("href", "#")
        newArtistDifferentImage.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/auctiondetail/detail.html?${artistAuctionId}`
        })
        differentAuctionImage.append(newArtistDifferentImage)

    }

}

getDetail()

async function handleBid(){

    const bid_price = document.getElementById("current_bid").value
    
    const currentBid = await bidView(bid_price, auctionId)

    if (currentBid != null) {
        const loadCurrentBid = document.getElementById("nowPrice")
        loadCurrentBid.innerText = currentBid
    }
}


async function handleComment(){

    const content = document.getElementById("comment-content").value

    if (content.Length == 0) {
        alert("댓글을 입력해주세요.")
    }else{

        const commentInfo = await commentView(content, auctionId)

        const loadComments = document.getElementsByClassName("one-comment")[0]

        const newCommentLayout = document.createElement("div")
        newCommentLayout.setAttribute("class", "bg-white p-2")
        loadComments.prepend(newCommentLayout)

        const newCommentUser = document.createElement("div")
        newCommentUser.setAttribute("class", "d-flex flex-row user-info")
        newCommentLayout.append(newCommentUser)

        const newCommentUserInfo = document.createElement("div")
        newCommentUserInfo.setAttribute("class", "d-flex flex-column justify-content-start ml-2")
        newCommentUser.append(newCommentUserInfo)
        
        //유저닉네임
        const newCommentUserName = document.createElement("span")
        newCommentUserName.setAttribute("class", "d-block font-weight-bold name")
        newCommentUserName.innerText = commentInfo['username']
        newCommentUserInfo.append(newCommentUserName)
        
        //댓글단 시간
        const newCommentTime = document.createElement("span")
        newCommentTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(commentInfo['create_time'])
        let time_before = time2str(time_post)

        newCommentTime.innerText = time_before
        newCommentUserInfo.append(newCommentTime)

        //삭제 버튼
        const newDeleteBtn = document.createElement("button")
        newDeleteBtn.setAttribute("class", "comment-delete")
        newDeleteBtn.setAttribute("id", commentInfo['id'])
        newDeleteBtn.setAttribute("onclick", "deleteComment(this)")
        newDeleteBtn.innerText = "삭제"
        newCommentUser.append(newDeleteBtn)

        const newCommentArea = document.createElement("div")
        newCommentArea.setAttribute("class", "mt-2")
        newCommentLayout.append(newCommentArea)

        //댓글내용
        const newCommentText = document.createElement("p")
        newCommentText.setAttribute("class", "comment-text")
        newCommentText.innerText = commentInfo['content']
        newCommentArea.append(newCommentText)

    }

}

async function deleteComment(comment) {
    const commentId = comment.id

    await deleteCommentView(commentId)

    const commentArea = comment.parentNode.parentNode
    commentArea.remove();

}


async function handleBookMark() {

    await bookMarkView(auctionId)

    const bookMarkBtn = document.getElementById("bookmark-button")
    const bookMarkIcon = document.getElementById("bookmark-icon")

    if (bookMarkIcon.classList.contains("fa-bookmark-o")) {
        bookMarkBtn.innerHTML = `<i class="fa fa-bookmark" id="bookmark-icon" aria-hidden="true"></i>`
        
    }else{
        bookMarkBtn.innerHTML = `<i class="fa fa-bookmark-o" id="bookmark-icon" aria-hidden="true"></i>`
        
    }
}