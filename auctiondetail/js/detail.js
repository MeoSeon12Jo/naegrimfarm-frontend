getDetail(1)


async function getDetail(id) {

    //api에서 return한 json데이터 가져옴
    const detail_info = await auctionDetailView(id);

    console.log(detail_info)
    //시간 계산해서 형식에 맞게 뿌려줘야함 (고민..)
    var auctionStartDate = detail_info['auction_start_date']
    var auctionEndDate = detail_info['auction_end_date']

    var category = detail_info['painting']['category_name']
    var title = detail_info['painting']['title']
    var artist = detail_info['painting']['artist_name']
    var startBid = detail_info['start_bid']
    var currentBid = detail_info['current_bid']
    var description = detail_info['painting']['description']
    var image = detail_info['painting']['image']

    //따로 for문 돌려서 빼야함.
    var artistPaintings = detail_info['painting']['artist_paintings']
    var comments = detail_info['comments']

    console.log(comments)
}