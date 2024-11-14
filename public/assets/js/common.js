$(window).on("resize", function () {
    resizeTable();
    resizeThumbnail();
    resizeFullScreen();
});

function resizeTable(hasNext, setWindowWidth, targetList) {
    setWindowWidth && setWindowWidth(window.innerWidth);
    setTimeout(function () {
        var $table = $("table").not("table.has-not-header");

        $table.each(function () {
            var $this = $(this);
            const tableId = $this.attr("id");
            if (targetList && !targetList.includes(tableId)) {
                return;
            }
            var theadHeight = $this.find("thead").outerHeight();
            var thHeight = $this.find("th").outerHeight(); //보더선 2px 추가
            var tbodyHeight = $this.find("tbody").outerHeight();
            var tdHeigh = $this.find("tbody").find("tr").outerHeight();
            var totalRowHeight = 0;

            let rowCnt = 0;
            $this
                .find("tbody")
                .find("tr")
                .each(function () {
                    $thisRow = $(this);
                    totalRowHeight += $thisRow.outerHeight();
                    rowCnt++;
                });
            console.log("pre", totalRowHeight, tdHeigh, theadHeight, rowCnt);
            // 스크롤이 발생하지 않은 경우
            // 스크롤이 있는 경우(default) : width: calc(100% + 0.4rem), 스크롤이 없으면 width: 100%;
            if (totalRowHeight < tdHeigh * 11 && !hasNext) {
                $this.find("tbody").css({
                    width: "100%",
                    height: totalRowHeight + 1,
                });
                $this.outerHeight(totalRowHeight + (theadHeight || 0));
                $this.parents(".table-wrapper").addClass("no-scroll");
                if (totalRowHeight > $this.find("tbody").outerHeight()) {
                    $this.parents(".table-wrapper").removeClass("no-scroll");
                }
            } else {
                if (rowCnt <= 10 && hasNext) {
                    $this.find("tbody").css({
                        width: "100%",
                        height: tdHeigh * 9,
                    });
                    $this.outerHeight(tdHeigh * 9 + 1 + (theadHeight || 0));
                } else if (setWindowWidth) {
                    $this.find("tbody").css({ width: "100%", height: tdHeigh * 9 });
                    $this.outerHeight(tdHeigh * 9 + (theadHeight || 0));
                }
                $this.parents(".table-wrapper").removeClass("no-scroll");
            }

            if (totalRowHeight >= tbodyHeight) {
                $this.find("tbody").addClass("tbody-border-bottom");
                $this.find("tbody").removeClass("tbody-border-bottom-none");
                $this.addClass("table-border-bottom");
                $this.removeClass("table-border-bottom-none");
            } else {
                $this.find("tbody").removeClass("tbody-border-bottom");
                $this.find("tbody").addClass("tbody-border-bottom-none");
                $this.addClass("table-border-bottom-none");
                $this.removeClass("table-border-bottom");
            }
        });
    }, 100);
}

const reflowViewExpand = (e) => {
    var $this = $(e?.target);

    var $parent = $this.closest(".table-row");

    if ($parent.hasClass("expand")) {
        $parent.removeClass("expand");
        $this.attr("aria-expanded", "false");
    } else {
        $parent.addClass("expand");
        $this.attr("aria-expanded", "true");
    }
};

const isValidURL = (url) => {
    var RegExp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var RegExp2 = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    if (RegExp.test(url) || RegExp2.test(url)) {
        return true;
    } else {
        return false;
    }
};

const resizeThumbnail = (beforeWidth) => {
    var $thumbnailGroup = $(".element .image-box .dim.item-group");
    var $thumbnail = $(".element .image-box .dim .img-rotate");
    var $thumbnailRotate90 = $(".element .image-box .dim .img-rotate.rotate90");
    var $thumbnailRotate270 = $(".element .image-box .dim .img-rotate.rotate270");
    var thumbnailW = beforeWidth || $thumbnail.width();
    var thumbnailH = (thumbnailW * 9) / 16;
    var thumbnailElement = (thumbnailW * 9) / 16 + 135;

    $thumbnail.each(function () {
        var $thisThumbnail = $(this);
        var $thisThumbnailImg = $thisThumbnail.find("img");
        var thisThumbnailImgW = $thisThumbnailImg.width();

        if (thumbnailW > thisThumbnailImgW) {
            $thisThumbnail.addClass("small-img");
        }
        $thisThumbnailImg.css("width", "unset");
    });
    $thumbnail.css("height", thumbnailH);
    $thumbnailRotate90.find("img").css("width", thumbnailH);
    $thumbnailRotate270.find("img").css("width", thumbnailH);
    $thumbnailGroup.css("height", thumbnailElement);
    // return thumbnailW;
    $(".element").css("width", beforeWidth || $(".element").width());
    return beforeWidth || $(".element").width();
    // console.log(thumbnailElement);
    // console.log(thumbnailRotateW);
};

const resizeFullScreen = () => {
    var $fullScreenPortrait = $(".popup.popup-fulll-portrait");
    var $fullScreen = $(".popup.popup-fulll-portrait .popup-content .full-screen");
    var $fullScreenControlPortrait = $(".popup.popup-remote-control-portrait");
    var $fullScreenControl = $(".popup.popup-remote-control-portrait .popup-content .full-screen");
    var $fullScreenRotate = $(".popup .popup-content .full-screen .img-rotate");
    var fullScreenW = $fullScreenRotate.width();
    var fullScreenH = $fullScreenRotate.height();

    $fullScreenPortrait.css("width", fullScreenH + 48);
    $fullScreen.css("height", fullScreenW);

    $fullScreenControlPortrait.css("width", fullScreenH + 48 + 250);
    $fullScreenControl.css("height", fullScreenW);

    if (fullScreenH < 600) {
        $(".popup.popup-fulll").addClass("small-img");
        $(".popup.popup-remote-control").addClass("small-img");
    }

    console.log(fullScreenW);
    console.log(fullScreenH);
};

const resizeTableJS = (hasNext, setWindowWidth, targetList) => {
    const allTables = document.querySelectorAll("table");
    const tablesWithHeaders = Array.from(allTables).filter((table) => !table.classList.contains("has-not-header"));
    tablesWithHeaders.forEach((table) => {
        const tableId = table.getAttribute("id");
        if (targetList && !targetList.includes(tableId)) {
            return;
        }

        let theadHeight = 0;
        var tbodyHeight = 0;
        var tdHeigh = 0;
        var totalRowHeight = 0;
        let rowCnt = 0;

        const thead = table.querySelector("thead");
        const tbody = table.querySelector("tbody");
        const allTr = tbody.querySelectorAll("tr");

        if (thead) {
            theadHeight = thead.getBoundingClientRect().height;
        }
        if (tbody) {
            tbodyHeight = tbody.getBoundingClientRect().height;
        }
        if (allTr) {
            allTr.forEach((tr, i) => {
                totalRowHeight += tr.getBoundingClientRect().height;
                rowCnt++;
                if (allTr.length > 9 && i < 10) {
                    tdHeigh += tr.getBoundingClientRect().height;
                }
            });
            if (allTr.length < 10) {
                tdHeigh = tbody.querySelector("tr").getBoundingClientRect().height * 10;
            }
        }
        console.log("new", totalRowHeight, tdHeigh, theadHeight);
        if (totalRowHeight <= tdHeigh && !hasNext) {
            tbody.style.width = "100%";
            tbody.style.height = totalRowHeight + "px";

            table.style.height = totalRowHeight + (theadHeight || 0) + "px";
            // console.log("111", table.style.height);

            let currentElement = table;
            while (currentElement) {
                if (currentElement.matches(".table-wrapper")) {
                    if (totalRowHeight > table.querySelector("tbody").getBoundingClientRect().height) {
                        currentElement.classList.remove("no-scroll");
                    } else {
                        currentElement.classList.add("no-scroll");
                    }
                    break; // 원하는 첫 번째 부모를 찾으면 루프 종료
                }
                currentElement = currentElement.parentElement;
            }
        } else {
            if ((rowCnt <= 10 && hasNext) || setWindowWidth) {
                tbody.style.width = "100%";
                tbody.style.height = tbody.querySelector("tr").getBoundingClientRect().height * 9 + "px";

                table.style.height = table.querySelector("tbody").getBoundingClientRect().height + (theadHeight || 0) + "px";
                // console.log("222", table.style.height);
            }
            let currentElement = table;
            while (currentElement) {
                if (currentElement.matches(".table-wrapper")) {
                    currentElement.classList.remove("no-scroll");
                    break; // 원하는 첫 번째 부모를 찾으면 루프 종료
                }
                currentElement = currentElement.parentElement;
            }
        }

        if (totalRowHeight >= tbodyHeight) {
            tbody.classList.add("tbody-border-bottom");
            tbody.classList.remove("tbody-border-bottom-none");
            table.classList.add("table-border-bottom");
            table.classList.remove("table-border-bottom-none");
        } else {
            tbody.classList.remove("tbody-border-bottom");
            tbody.classList.add("tbody-border-bottom-none");
            table.classList.add("table-border-bottom-none");
            table.classList.remove("table-border-bottom");
        }
    });
};
