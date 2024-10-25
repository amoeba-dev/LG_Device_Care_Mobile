$(document).ready(function () {

    setTimeout(function () {
        if ($(document).find(".detail-content")) {

            var $detailContent = $(".detail-content");
            var $detailInfoContentCon = $detailContent.find(".content-info-box .right-side .view-history-con");
            var $detailInfoContentConTbody = $detailInfoContentCon.find("table tbody");
            var detailHeight = $detailContent.outerHeight();
            var detailInfoTop = $detailContent.find(".top-info-box").outerHeight() + 80;

            $detailInfoContentCon.css("height", detailHeight - detailInfoTop);
            $detailInfoContentConTbody.css("height", detailHeight - detailInfoTop - 200);
    
            console.log("detailHeight:", detailHeight);
            console.log("detailInfoTop:", detailInfoTop);
            console.log(detailHeight - detailInfoTop - 160);
        }
    }, 100);


});

$(window)
    .on("resize", function () {
        resizeAutoTable();
    })

    function resizeAutoTable() {
        setTimeout(function () {
            if ($(document).find(".detail-content")) {
    
                var $detailContent = $(".detail-content");
                var $detailInfoContentCon = $detailContent.find(".content-info-box .right-side .view-history-con");
                var $detailInfoContentConTbody = $detailInfoContentCon.find("table tbody");
                var detailHeight = $detailContent.outerHeight();
                var detailInfoTop = $detailContent.find(".top-info-box").outerHeight() + 80;

                $detailInfoContentCon.css("height", detailHeight - detailInfoTop);
                $detailInfoContentConTbody.css("height", detailHeight - detailInfoTop - 200);
            }
        }, 100);
    }