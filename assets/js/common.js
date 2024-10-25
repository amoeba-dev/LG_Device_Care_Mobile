$(document).ready(function () {
    var $tableWrapper = $(".table-wrapper");

    // $(window).on('load', function() {

    //========== Header ==========//

    $header = $(".header-container");

    $header
        .find(".btn-expand")
        .on("click", function (e) {})
        .on("focus", function (e) {
            $header.find(".notice-list-container").removeClass("expand");
        });

    // Account //
    $header
        .find(".btn-account")
        .on("click", function (e) {
            if (!$header.find(".user-menu").hasClass("expand")) {
                $(this).addClass("active");
                $header.find(".user-menu").addClass("expand");
            } else {
                $(this).removeClass("active");
                $header.find(".user-menu").removeClass("expand");
            }
        })
        .on("focus", function (e) {
            $header.find(".notice-list-container").removeClass("expand");
        });

    // Language //
    $header.find(".btn-language").on("click", function (e) {
        if (!$header.find(".language-menu").hasClass("expand")) {
            $(this).addClass("active");
            $header.find(".language-menu").addClass("expand");
        } else {
            $(this).removeClass("active");
            $header.find(".language-menu").removeClass("expand");
        }
    });

    $header.find(".user-menu a").on("blur", function (e) {
        console.log("blur breadcrumb");
    });

    $header.find();

    //========== Header ==========//

    $sideFooter = $(".side-footer");

    // Account //
    $sideFooter.find(".btn-account").on("click", function (e) {
        if (!$sideFooter.find(".user-menu").hasClass("expand")) {
            $(this).addClass("active");
            $sideFooter.find(".user-menu").addClass("expand");
        } else {
            $(this).removeClass("active");
            $sideFooter.find(".user-menu").removeClass("expand");
        }
    });

    //========== Side Bar ==========//

    var $mainMenu = $(".main-menu");
    var $parentMenu = $(".parent-menu");
    var $wrapper = $(".wrapper");
    var $contentContainer = $(".content-container");
    var $sideBar = $(".side-bar");
    var menuLength = $mainMenu.find(".btn-main-menu").length;

    var parentIndex = 0;

    // Hamburger Menu //

    $hamburgerButton = $(".btn-hamburger");
    $sideBottom = $(".side-bottom");

    $hamburgerButton
        .on("click keyup", function (e) {
            console.log("handle hamburder");
            if (!$sideBar.hasClass("expand")) {
                $sideBar.addClass("expand");
                // $header.addClass('expand');
                $contentContainer.addClass("expand");
            } else {
                $sideBar.removeClass("expand");
                // $header.removeClass('expand');
                $contentContainer.removeClass("expand");
            }
            // }).on('focus', function(e) {
            //   $header.find('.user-menu').removeClass('expand');
        })
        .on("mouseover", function (e) {
            if (!$sideBar.hasClass("expand")) {
                $sideBar.addClass("hover-child");
            }
        });
    $(".header-container .left-side").on("mouseover", function (e) {
        if ($sideBar.hasClass("hover-child")) {
            $sideBar.removeClass("hover-child");
        }
    });
    $sideBottom.on("mouseleave", function (e) {
        if ($sideBar.hasClass("hover-child")) {
            $sideBar.removeClass("hover-child");
        }
    });
    // $sideBottom.focusout(function(e) {
    //   if($sideBar.hasClass('expand')) {
    //     $sideBar.removeClass('expand');
    //     $contentContainer.removeClass('expand');
    //   }
    // });

    //================== PARENT MENU ==================//hmm

    // 메인메뉴 클릭 //
    $mainMenu
        .find(".btn-main-menu")
        .click(function (e) {
            var $this = $(this);
            var index = $mainMenu.find(".btn-main-menu").index(this);
            var $menu = $parentMenu.eq(index);

            if ($menu.hasClass("active")) {
                $menu.removeClass("active");
                if ($this.hasClass("has-child")) {
                    $sideBar.removeClass("show-child");
                    $wrapper.removeClass("show-child");
                }
            } else {
                $parentMenu.removeClass("active");
                $sideBar.removeClass("show-child");
                $menu.addClass("active");
                if ($this.hasClass("has-child")) {
                    $sideBar.addClass("show-child");
                    $wrapper.addClass("show-child");
                }
            }
        })
        // 메인메뉴 포커스 //
        .on("focus", function (e) {
            var $this = $(this);
            var index = $mainMenu.find(".btn-main-menu").index(this);
            var $menu = $parentMenu.eq(index);

            $parentMenu.removeClass("focus");
            $menu.addClass("focus");
        })
        .on("keydown", function (e) {
            var key = e.keyCode;
            var index = $mainMenu.find(".btn-main-menu").index(this);

            console.log(key);
            // Left //
            if (key == 37) {
                console.log("Left");
            }
            // Right //
            else if (key == 39) {
                console.log("Right");

                // Child menu가 있는지 확인 //
                if ($parentMenu.eq(index).hasClass("has-child")) {
                    // Child menu가 있으면
                    activeParentMenu(index);
                    $parentMenu.removeClass("focus");
                    $mainMenu.find(".btn-main-menu").blur();
                }
            }
            // Top //
            else if (key == 38) {
                console.log("Top");

                // 상단에 이동할 메뉴가 있으면 이동한다. //
                if (index > 0 && index < menuLength) {
                    focusParentMenu(index - 1);
                }
            }
            // Bottom //
            // 하단에 이동할 메뉴가 있으면 이동한다. //
            else if (key == 40) {
                console.log("Bottom");
                if (index >= 0 && index < menuLength) {
                    focusParentMenu(index + 1);
                }
            }

            // ESC //
            else if (key == 27) {
                console.log("Escape");
                var $this = $(this);
                var $parent = $this.closest(".parent-menu");

                $this.blur();
                $parent.blur();
            }
        });

    //================== Child Menu ==================//

    var $childMenu = $(".child-menu");

    $childMenu
        .find("a")
        .on("click", function (e) {
            var $this = $(this);
            var $parent = $this.closest("li");
            var $parents = $this.closest("ul").children("li");

            if (!$parent.hasClass("active")) {
                $parents.removeClass("active");
                $parent.addClass("active");
            } else {
                $parent.removeClass("active");
            }
        })
        .on("keydown", function (e) {
            var $this = $(this);
            var $parent = $this.closest("li");
            var $parents = $this.closest("ul").children("li");

            var key = e.keyCode;
            var length = $parents.length;
            var index = $parent.index();

            // Left //
            if (key == 37) {
                console.log("Left");

                // 맨 좌측 메뉴일 경우 parent menu로 focus 이동 //
                $parentMenu.eq(parentIndex).find(".btn-main-menu").focus();
            }
            // Right //
            else if (key == 39) {
                console.log("Right");
            }
            // Top //
            else if (key == 38) {
                console.log("Top");
                if ($parent.hasClass(".child-menu") && index == 0) {
                    var $tabGroup = $parent.closest(".child-menu-container").children(".tab-group");
                    // 상위에 버튼 그룹이 있다면 위로 이동 //
                    if ($tabGroup.length > 0) {
                        e.preventDefault();
                        $tabGroup.children(".active").focus();
                    }
                }
                moveUpChildMenu(index, length, $parents);
            }
            // Bottom //
            else if (key == 40) {
                console.log("Bottom");
                moveDownChildMenu(index, length, $parents);
            }
        });

    // Focus Parent Menu //
    function focusParentMenu(index) {
        $parentMenu.eq(index).find(".btn-main-menu").focus();
    }

    // Active Parent Menu //
    function activeParentMenu(index) {
        parentIndex = index; // 현재 parent index를 저장
        $parentMenu.removeClass("active");
        $parentMenu.eq(index).addClass("active");

        // button group 이 있을경우 button group의 첫 번째 버튼에 포커스 //
        if ($parentMenu.eq(index).find(".tab-group").length > 0) {
            var $tabGroup = $parentMenu.eq(index).find(".tab-group");
            $tabGroup.children("button").eq(0).focus();
        }
        // button group이 없을 경우 첫 번째 child-menu에 포커스 //
        else {
            $parentMenu.eq(index).find(".child-menu").eq(0).children("a").focus();
        }
    }

    // 하위 메뉴 위로 이동 함수 //
    function moveUpChildMenu(index, length, $menu) {
        $parent = $menu.closest("ul").closest("li");
        if ($menu.eq(index - 1).hasClass("has-child") && $menu.eq(index - 1).hasClass("active")) {
            $menu
                .eq(index - 1)
                .children("ul")
                .children("li")
                .last()
                .children("a")
                .focus();
        } else {
            if (index == 0) {
                if ($parent.length > 0 && $parent.hasClass("active")) {
                    $parent.children("a").focus();
                } else {
                    $menu.last().children("a").focus();
                }
            } else {
                $menu
                    .eq(index - 1)
                    .children("a")
                    .focus();
            }
        }
    }

    // 하위 메뉴 아래로 이동 함수 //
    function moveDownChildMenu(index, length, $menu) {
        console.log("index = " + index);
        console.log("length = " + length);

        $parent = $menu.closest("ul").closest("li");

        if (index < length - 1) {
            if ($menu.eq(index).hasClass("active") && $menu.eq(index).hasClass("has-child")) {
                $menu.eq(index).children("ul").children("li").eq(0).children("a").focus();
            } else {
                $menu
                    .eq(index + 1)
                    .children("a")
                    .focus();
            }
        }
        // 더 이상 아래로 이동할 메뉴가 없을 경우 //
        else if (index == length - 1) {
            console.log("last");
            if ($parent.hasClass("active")) {
                console.log($parent.next());
                $parent.next().children("a").focus();
            } else {
                $menu.first().children("a").focus();
            }
        }
    }

    //===================== Tab ========================//

    // $('.tab-group').children('.tab').find('a').on('click', function(e) {
    //   var $this = $(this);
    //   var $tab = $this.closest('.tab');
    //   var $tabGroup = $this.closest('.tab-group');
    //   var $currentTabMenu = $tabGroup.prev('.current-tab-menu');
    //   var tabId = $this.attr('id');
    //   var tabTitle = $tab.text();

    //   $currentTabMenu.find('a').text(tabTitle);

    //   $tabGroup.children('.tab').removeClass('active');
    //   $tab.addClass('active');

    //   $('.tab-title').addClass('hide');
    //   $('.title-' + tabId).removeClass('hide');

    //   $('.tab-panel').addClass('hide');
    //   $('.panel-' + tabId).removeClass('hide');

    //   $tabGroup.removeClass('expand');
    //   resizeTable();

    //   return false;
    // });

    /*
  Device management - 상세페이지 좌측에 있는 탭을 제어합니다.
  ex)device_manage_overview_media.html 카테고리 tab 일경우
*/

    // 해당 셀렉터는 Reflow 400%에 대응하는 셀렉터 입니다. //
    var $categoryMenu = $(".category-menu");
    var $currentTabMenu = $(".current-tab-menu");

    $currentTabMenu.each(function () {
        var $thisTabMenu = $(this);

        $thisTabMenu
            .next(".tabs")
            .find(".tab")
            .each(function () {
                var $this = $(this);
                var $parent = $this.closest(".tabs, .tab-group");
                var thisTitle = $this.find("a, label").text();

                if ($this.hasClass("active")) {
                    $parent.prev(".current-tab-menu").find("a").text(thisTitle);
                    return false;
                }
            });

        $thisTabMenu.find("a").on("click", function (e) {
            var $this = $(this);
            var $parent = $this.closest(".current-tab-menu");

            if ($parent.next(".tabs, .tab-group").hasClass("expand")) {
                $parent.next(".tabs, .tab-group").removeClass("expand");
            } else {
                $parent.next(".tabs, .tab-group").addClass("expand");
            }
        });
    });

    // $('.tabs').children('.tab').find('a').on('click', function(e) {
    //   var $this = $(this);
    //   var $tab = $this.closest('.tab');
    //   var $tabs = $this.closest('.tabs');
    //   var $tabContent = $('.tablist-content');
    //   var $currentTabMenu = $tabs.prev('.current-tab-menu');
    //   var tabId = $tab.attr('id');
    //   var tabTitle = $tab.text();

    //   $currentTabMenu.find('a').text(tabTitle);

    //   $tabs.children('.tab').removeClass('active');
    //   $tab.addClass('active');
    //   $tabContent.addClass('hide');

    //   $('.panel-' + tabId).removeClass('hide');

    //   if($('.panel-' + tabId).find('.table-wrapper').length > 0) {
    //     $('.panel-' + tabId).find('.table-wrapper').each(function() {
    //       // resizeTableHead($(this));
    //     });
    //   }

    //   $tabs.removeClass('expand');

    //   return false;
    // });

    $(document).on("click", ".btn-dropdown", function (e) {
        var $this = $(this);
        var $parent = $this.closest(".dropdown");
        var $parentTable = $this.closest("table").not(".no-scroll, has-not-header");

        $(".btn-dropdown").not($this).attr("aria-selected", "false");
        console.log($this.attr("aria-selected"));
        if ($this.attr("aria-selected") === "true") {
            $this.attr("aria-selected", "false");
        } else {
            // preventScroll();
            if ($parentTable.length > 0) {
                var scrollTop = $(document).scrollTop();
                var offsetTop = $parent.offset().top;
                var offsetLeft = $parent.offset().left;
                var parentWidth = $parent.outerWidth();
                var parentHeight = $parent.outerHeight();

                $this.next(".dropdown-menu").css({
                    top: offsetTop + parentHeight - scrollTop,
                    left: offsetLeft,
                    width: parentWidth,
                });
            }
            $this.attr("aria-selected", true);
        }
    });

    $(window).on("scroll", function () {
        $(".btn-dropdown").attr("aria-selected", "false");
    });

    $("tbody").on("scroll", function () {
        $(".btn-dropdown").attr("aria-selected", "false");
    });

    $(document).on("mouseup", function (e) {
        $(".btn-dropdown").attr("aria-selected", "false");
        // enableScroll();
    });

    $(document).keypress(function (e) {
        if (e.which == 27) {
            $(".btn-dropdown").attr("aria-selected", "false");
            // enableScroll();
        }
    });

    $(".btn-detail").on("click", function () {
        var $this = $(this);

        if ($this.attr("aria-expanded") === "false") {
            $this.attr("aria-expanded", "true");
            $this.addClass("active");
            $this.next(".connected-displays-container").removeClass("hide");
        } else {
            $this.attr("aria-expanded", "false");
            $this.removeClass("active");
            $this.next(".connected-displays-container").addClass("hide");
        }
    });

    // $('.btn-account').on('click', function(){
    //   var $this = $(this);
    //   $(this).toggleClass('active');
    // });

    // });
    $(".features > li > .btn-Business").on("click", function () {
        $(this).next(".site-menu").addClass("expand");
    });
    $(".features .features-pannel-wrap .btn-icon").on("click", function () {
        $(this).next(".pannel").addClass("expand");
    });
    $(".features .pannel .btn-close").on("click", function () {
        $(this).parents(".pannel").removeClass("expand");
    });
});

function preventScroll(element) {
    $(window).on("scroll touchmove mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $("tbody").on("scroll touchmove mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
}

function enableScroll() {
    $("html, body").off("scroll touchmove mousewheel");
    $("tbody").off("scroll touchmove mousewheel");
}

// ================== Radio Tab ======================//

var $radioTab = $(".radio-tab");

$radioTab.find('input[type="radio"]').on("input", function (e) {
    var $this = $(this);
    var $tabGroup = $this.closest(".tab-group");
    var $currentTabMenu = $tabGroup.prev(".current-tab-menu");
    var $parent = $radioTab.closest(".tab-container");
    var index = $radioTab.find('input[type="radio"]').index(this);
    var thisTitle = $this.next("label").text();
    $currentTabMenu.find("a").text(thisTitle);

    if ($this.val() == "on") {
        $parent.find(".tab-panel").addClass("hide");
        $parent.find(".tab-panel").eq(index).removeClass("hide");

        var $tableWrapper = $(".table-wrapper");
        $tableWrapper.each(function () {
            $thisTable = $(this);
            resizeTableHead($thisTable);
        });
    }
});

//===================== Table ========================//

$(window)
    .on("resize", function () {
        resizeTable();
    })
    .resize();

function resizeTable() {
    setTimeout(function () {
        var $table = $("table").not("table.has-not-header");

        $table.each(function () {
            var $this = $(this);
            var theadHeight = $this.find("thead").outerHeight();
            var thHeight = $this.find("th").outerHeight(); //보더선 2px 추가
            var tbodyHeight = $this.find("tbody").outerHeight();
            var tdHeigh = $this.find("tbody").find("tr").outerHeight();
            var totalRowHeight = 0;

            $this
                .find("tbody")
                .find("tr")
                .each(function () {
                    $thisRow = $(this);
                    totalRowHeight += $thisRow.outerHeight();
                });

            // 스크롤이 발생하지 않은 경우
            // 스크롤이 있는 경우(default) : width: calc(100% + 0.4rem), 스크롤이 없으면 width: 100%;

            if (totalRowHeight < tdHeigh * 11) {
                console.log("totalRowHeight = " + totalRowHeight);
                $this.find("tbody").css({
                    width: "100%",
                    height: totalRowHeight + 1,
                });

                $this.outerHeight(totalRowHeight + theadHeight);

                $this.parents(".table-wrapper").addClass("no-scroll");
            } else {
                $this.parents(".table-wrapper").removeClass("no-scroll");
            }
        });
    }, 100);
}

//===================== Convert table to lsit ========================//

// var $convertList = $('.convert-table-to-list');

// $convertList.each(function() {
//   var $list = $(this);
//   var $tableRow = $list.find('.table-row');
//   var $btnExpand = $tableRow.find('.btn-expand');

//   $btnExpand.on('click', function(e) {
//     console.log('expand');

//     var $this = $(this);
//     var $parent = $this.closest('.table-row');

//     if($parent.hasClass('expand')) {
//       $parent.removeClass('expand');
//     }
//     else {
//       $parent.addClass('expand');
//     }
//   });
// });

//===================== Field Slide bar ========================//

var $fieldSlideBar = $(".field-slide-bar");

$fieldSlideBar.each(function () {
    var $slideBar = $(this);
    var $inputRange = $slideBar.find('input[type="range"]');
    var $inputNumber = $slideBar.find('input[type="number"], input[type="text"]');
    var value = $slideBar.find('input[type="range"]').val();

    // Tint 값 보정 //
    if ($slideBar.hasClass("field-set-tint")) {
        $inputNumber.val(converTintValue(value));
    }

    // 슬라이드 바의 값 변경 이벤트 //
    $inputRange.on("input", function (e) {
        var $this = $(this);

        // 색조 변경 필드일 경우 값을 해당 필드에 맞게 보정해준다. //
        if ($slideBar.hasClass("field-set-tint")) {
            $inputNumber.val(converTintValue($this.val()));
        } else {
            $inputNumber.val($this.val());
        }
    });

    // 슬라이드 바 왼쪽에 있는 수 입력 핕드 값 변경 이벤트 //
    $inputNumber.on("change", function (e) {
        var $this = $(this);

        // 색조 변경 필드일 경우 값을 해당 필드에 맞게 보정해준다. //
        if ($slideBar.hasClass("field-set-tint")) {
            $inputRange.val(convertNormalValue($this.val()));
        } else {
            $inputRange.val($this.val());
        }
    });

    // - 버튼 클릭 이벤트 //
    $slideBar.find(".btn-minus").on("click", function (e) {
        var value = Number($inputRange.val());

        if (value > 0) {
            // 색조 변경 필드일 경우 값을 해당 필드에 맞게 보정해준다. //
            if ($slideBar.hasClass("field-set-tint")) {
                $inputNumber.val(converTintValue(value - 5));
            } else {
                $inputNumber.val(value - 5);
            }
            $inputRange.val(value - 5);
        }
    });

    // + 버튼 클릭 이벤트 //
    $slideBar.find(".btn-plus").on("click", function (e) {
        var value = Number($inputRange.val());

        if (value < 100) {
            if ($slideBar.hasClass("field-set-tint")) {
                $inputNumber.val(converTintValue(value + 5));
            } else {
                $inputNumber.val(value + 5);
            }
            $inputRange.val(value + 5);
        }
    });
});

// ==================== Handle the select mode ====================//

var $btnSelectMode = $(".btn-select-mode");
var $selectModeOption = $(".select-mode-options");

$btnSelectMode.on("click", function (e) {
    if ($selectModeOption.hasClass("expand")) {
        $selectModeOption.removeClass("expand");
    } else {
        $selectModeOption.addClass("expand");
    }
});

function converTintValue(value) {
    if (value >= 50) {
        var textValue = "G" + String(value - 50);
    } else {
        var textValue = "R" + String(50 - value);
    }

    return textValue;
}

function convertNormalValue(tintValue) {
    var tintColor = tintValue.substring(0, 1);
    var tintNumber = tintValue.substring(1, tintValue.length);

    console.log("tintColor = " + tintColor);
    console.log("tintNumber = " + tintNumber);

    if (tintColor == "R") {
        var normalValue = 50 - tintNumber;
    } else {
        var normalValue = tintNumber + 50;
    }

    return normalValue;
}

function togglePopup(toggler, id) {
    var $this = $("#" + toggler);
    var $popup = $("#" + id);
    var $tabbable = $popup.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
    // $tabbable.hide();
    var firstTab = $tabbable.first();
    var lastTab = $tabbable.last();

    if ($popup.hasClass("show")) {
        $("body").css("overflow", "visible");
        $this.focus();
        $popup.removeClass("expand");
        setTimeout(function () {
            $popup.removeClass("show");
        }, 250);
    } else {
        $popup.addClass("show");
        $("body").css("overflow", "hidden");
        // 팝업 안에 테이블이 있을 경우 resizeTableHead 함수를 실행합니다. //
        if ($popup.find(".table-wrapper").length > 0) {
            // resizeTableHead($popup.find('.table-wrapper'));
        }
        $popup.addClass("expand");

        if ($tabbable.length > 0) {
            if (firstTab.prop("nodeName") != "BUTTON") {
                // firstTab.focus();
            }

            firstTab.focus();

            firstTab.on("keydown", function (e) {
                if (e.shiftKey && (e.keyCode || e.which) === 9) {
                    console.log("go last");
                    e.preventDefault();
                    console.log("go last??");
                    lastTab.focus();
                }
            });

            lastTab.on("keydown", function (e) {
                var $this = $(this);
                if (!e.shiftKey && (e.keyCode || e.which) === 9) {
                    console.log("go first");
                    e.preventDefault();
                    console.log("go first??");
                    firstTab.focus();
                }
            });
        }
    }

    return false;
}

// ==================== input text remove button toggle ====================//

var $input = $("input");

$input.on("keyup", function (e) {
    2;
    var $this = $(this);
    var val = $this.val();

    if (val.length > 0) {
        $this.next(".btn-input-remove").removeClass("hide");
    } else {
        $this.next(".btn-input-remove").addClass("hide");
    }
});
