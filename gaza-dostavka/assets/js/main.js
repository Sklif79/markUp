'use strict';

ready(function () {
    //глобальная переменная для ширины экрана
    window.screenWidth = $(window).width();

    customPlaceholderInit();
    tooltipClick();
    asideNav();
    // eventsAsideNav();
    asideFidback();
    mainPage();
    radioBtn($('.shipment-form__city input[type="radio"]'));
    radioBtn($('.radio-inline input[type="radio"]'));
    tooltipPosition();
    checkedInput();
    jQueryTabs();
    countTabsContentList();
    shiftCenterPageDescription();
    faq();
    cropText($('.useful-information__item-txt'), 120);

    hoverImages('div.nav-index', 'div.nav-index__item');
    hoverImages('ul.aside-nav', '.aside-nav__link');

    preloadImg("data-src-hover");

    $('.three-columns__title').setMaxHeights();
    $('.four-columns__title').setMaxHeights();

    setTimeout(function () {
        $('.additional-equipment__name').setMaxHeights();
    }, 0);

    $(window).resize(function () {
        window.screenWidth = $(window).width();

        setTimeout(function () {
            $('.three-columns__title').css('height', 'auto').setMaxHeights();
            $('.four-columns__title').css('height', 'auto').setMaxHeights();
        }, 500);
    });
});

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

//смена изображений по ховеру
function hoverImages(parentEl, hoverEl) {
    var newSrc, src, oldSrc;

    //делегируем события для контейнера
    $(parentEl).on('mouseenter', hoverEl, function () {
        var image = $(this).find('img');
        newSrc = image.attr("data-src-hover");
        oldSrc = image.attr("src");
        src = image.attr("src", newSrc);
    });

    $(parentEl).on('mouseleave', hoverEl, function () {
        $(this).find('img').attr("src", oldSrc);
    });
}

//предзагрузка изображений по data-атрибуту
function preloadImg(dataAttr) {
    var arr = document.querySelectorAll('img[' + dataAttr + ']');

    for (var i = 0; i < arr.length; i++) {
        new Image().src = arr[i].getAttribute(dataAttr);
    }
}

//определение главной страницы
function isMainPage() {
    var path = location.pathname,
        result = path === '/' || ~path.indexOf('index-page.html') ? true : false;
    return result;
}

//изменение стилей для главной страницы
function mainPage() {
    if (isMainPage()) {
        $('html, body').addClass('main-page');
        $('.aside').removeClass('moved overlay-mask');
    }
}

//кастомный плейсхолдер
function customPlaceholderInit() {
    var els = $('.custom-placeholder-wrap');
    els.each(function () {
        $(this).on('click', clickHandler);
        $(this).find('input, textarea').on('focus', focusHandler);
    });

    textareaDetect();

    function textareaDetect() {
        els.each(function () {
            var textarea = $(this).find('textarea');
            if (textarea.length) {
                $(this).find('.custom-placeholder').addClass('textarea-custom-placeholder');
            }
        });
    }

    function clickHandler(e) {
        var el = findParent($(e.target), 'custom-placeholder-wrap'),
            input = el.find('input, textarea');
        el.addClass('custom-placeholder-active');
        input.focus().focusout(function () {
            var val = $(this).val().trim();
            if (!val) {
                el.removeClass('custom-placeholder-active');
            }
        });
    }

    function focusHandler(e) {
        var el = findParent($(e.target), 'custom-placeholder-wrap');
        el.addClass('custom-placeholder-active');
        $(e.target).focusout(function () {
            var val = $(this).val().trim();
            if (!val) {
                el.removeClass('custom-placeholder-active');
            }
        });
    }
}

function findParent(el, class_) {
    var parent = el.parent();
    if (parent.hasClass(class_)) {
        return parent;
    } else {
        return findParent(parent, class_);
    }
}

//появление после загрузки страницы
$(window).bind('load', function () {
    var hiddenBeforLoad = '.filter-section, ' + '.index-slider__item, ' + '.card-inner__pager__img, ' + '.shipment-gallery-slider__item, ' + '.article-slider, ' + '.card-inner__slider-img';

    $(hiddenBeforLoad).css({ 'opacity': '1' });
});

//tooltip-click
function tooltipClick() {
    var $tooltip = $('.tooltip-click');

    if ($tooltip.length) {

        $tooltip.on('click', function (e) {
            if ($(e.target).hasClass('tooltip-click__close')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    }

    $(document).on('click', function (e) {
        var $tooltipFooter = $('.tooltip-click');

        if ($tooltipFooter.hasClass('active') && !$(e.target).closest('.tooltip-click__inner-wrap').length && !$(e.target).hasClass('js-tooltip__footer')) {
            $tooltipFooter.removeClass('active');
        }
    });
}

window.asideNavCheck = {
    init: false, // первичная инициализация
    firstTitle: false, //
    lastSizeMobile: false
};

var asideNav = function asideNav() {
    var asideNav = {
        $ul: $('ul.aside-nav > li > ul'),
        $aside: $('div.aside'),
        $content: $('div.content'),
        width: 280,

        //вставка подзаголовка в меню
        appendFirstItemNav: function appendFirstItemNav() {
            var $asideNavUl = document.querySelectorAll('.aside-nav ul'),
                li,
                $asideNavLink,
                liInnerText;

            for (var i = 0; i < $asideNavUl.length; i++) {
                $asideNavLink = $asideNavUl[i].parentElement.getElementsByTagName('a')[0];
                $asideNavUl[i].parentElement.classList.add('js-aside-nav__dropdown');

                if ($asideNavLink.classList.contains('aside-nav__link')) {
                    liInnerText = $asideNavLink.getElementsByClassName('aside-nav__txt')[0].textContent;
                } else {
                    liInnerText = $asideNavLink.textContent;
                }

                li = document.createElement('li');
                li.innerHTML = liInnerText;
                $asideNavUl[i].insertBefore(li, $asideNavUl[i].firstChild);
            }
        },


        //рассчет левой позиции
        setLeftPositionNav: function setLeftPositionNav() {
            var asideNavEL = document.querySelectorAll('.aside-nav > li');

            for (var i = 0; i < asideNavEL.length; i++) {
                enumChildNodes(asideNavEL[i], 1);
            }
        },


        //логика работы выезжающего меню
        asideHover: function asideHover() {
            var self = this;

            this.$aside.hover(function () {
                if (!isMainPage() && screenWidth > 1024) {
                    self.$aside.removeClass('moved');

                    setTimeout(function () {
                        self.$aside.removeClass('overlay-mask');
                    }, 600);

                    self.$content.addClass('js-aside-hover');

                    $('body').addClass('blocked');
                } else {
                    self.$content.addClass('js-aside-hover');
                }
            }, function () {
                if (!$('.aside-feedback').hasClass('js-active')) {
                    self.$content.removeClass('js-aside-hover');
                }

                if (!isMainPage() && screenWidth > 1024) {
                    self.$aside.addClass('overlay-mask');
                    self.$aside.addClass('moved');

                    self.$aside.addClass('overlay-mask');

                    $('body').removeClass('blocked');
                }
            });
        },
        asideMobile: function asideMobile() {
            // $(document).on('click')
            // if (screenWidth < 1025) {
            //
            // }
        }
    };

    asideNav.setLeftPositionNav();
    asideNav.asideHover();
    asideNav.appendFirstItemNav();
    asideNav.asideMobile();
};

/**
 * Рекурсивное перечисление дочерних элементов
 *
 * @param DomNode node
 * Родительский элемент, чьи дочерние узлы нужно перечислять.
 * @count integer
 * @return void
 */
function enumChildNodes(node, count) {
    // если нам передали элемент

    if (node && 1 == node.nodeType) {
        // берем его первый дочерний узел
        var child = node.firstElementChild;

        // пока узлы не закончились
        while (child) {
            // если этот узел является элементом
            if (1 == child.nodeType) {
                // что-то делаем с найденным элементом
                if (child.tagName == "UL") {
                    child.style.left = count * 280 + "px";
                    count++;
                }
                // рекурсивно перечисляем дочерние узлы
                enumChildNodes(child, count);
            }
            // переходим к следующему узлу
            child = child.nextSibling;
        }
    }
}

function asideFidback() {
    var aside = document.querySelector('div.aside'),
        asideFeedback = document.querySelector('div.aside-feedback'),
        content = document.querySelector('div.content');

    document.documentElement.addEventListener('click', function (e) {
        if ($(e.target).closest('.aside-callback__link').length) {
            asideFeedback.classList.add('js-active');
            content.classList.add('js-aside-hover');
        }

        if (~e.target.className.indexOf('aside-feedback__close')) {

            asideFeedback.classList.remove('js-active');
            content.classList.remove('js-aside-hover');
        }
    });
}

//максимальная высота для блоков
$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};

//ввод в input только цифр
(function () {
    $('input.js-only-digits').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
})();

//ховер по карте изображений
(function () {
    var pointNumber;

    $('[data-point]').hover(function () {
        pointNumber = $(this).attr('data-point');
        $('[data-point="' + pointNumber + '"]').addClass('active');
    }, function () {
        $('[data-point="' + pointNumber + '"]').removeClass('active');
    });
})();

//input[type="radio"]
function radioBtn($input) {
    $input.on('change', function () {
        $input.parent('label').removeClass('js__selected');

        if ($(this).prop('checked')) {
            $(this).parent('label').addClass('js__selected');
        }
    });
}

//позиция окна tooltip
function tooltipPosition() {
    var width = document.documentElement.offsetWidth,
        fyi = document.querySelectorAll('.fyi'),
        container = void 0,
        tooltipLeft = void 0;

    for (var i = 0; i < fyi.length; i++) {
        container = fyi[i].querySelector('.fyi__tooltip');

        tooltipLeft = fyi[i].offsetLeft;

        if (tooltipLeft > width / 2) {
            container.style.left = 'auto';
            container.style.right = '-20px';
        }
    }
}

//кнопка наверх
(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('#toUp').show();
        } else {
            $('#toUp').hide();
        }
    });

    $(document).on('click', '#toUp', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
})();

//кастомные табы
function jQueryTabs() {
    $('.tab').on('click', function () {
        $(this).closest('.tabs-wrap').find('.tab, .panel').removeClass('active');
        $(this).addClass('active').closest('.tabs-wrap').find('div[data-id="' + $(this).attr('data-id') + '"]').addClass('active');
    });

    $('.tabs-wrap').each(function () {
        var tabCount = $('.tab', $(this)).length;
        if (tabCount === 1) {
            $('.tab', $(this)).addClass('js-single');
        } else if (tabCount > 1) {
            $('.tab', $(this)).css('width', 100 / tabCount + '%');
        }
    });
}

//кастомный input[type="checkbox"]
/**
 * custom input[type='chekbox']
 * toggle class active to parent element input (label) after click
 */
function checkedInput() {
    var reset = document.querySelectorAll('input[type="reset"]'),
        $target,
        $slider,
        $pointArr,
        width,
        index = -1;

    inspectionInputs(document.querySelectorAll('input[type="checkbox"], input[type="radio"]'));

    document.addEventListener('change', function (e) {
        $target = $(e.target);
        $slider = $target.closest('.radio-progress');
        $pointArr = $slider.find('.radio-btn-progress__point');

        if (e.target.closest('.checkbox') && !e.target.hasAttribute('disabled')) {
            e.target.closest('.checkbox').classList.toggle('active');
        }

        if (e.target.closest('.radio')) {
            inspectionInputs(document.querySelectorAll('input[type="radio"]'));

            if ($target.closest('.radio-btn-progress__point').length) {
                width = $target.closest('.radio-btn-progress__point').position().left;

                $slider.find('.radio-btn-progress__line').css({ 'width': width + 'px' });

                $pointArr.each(function (i, item) {

                    if (index === -1) {
                        $(item).hasClass('active') ? index = i : $(item).addClass('active');
                    }

                    if (i === $pointArr.length - 1) {
                        index = -1;
                    }
                });
            }
        }
    });

    document.addEventListener('click', function (e) {
        for (var i = 0; i < reset.length; i++) {
            if (e.target === reset[i]) {
                setTimeout(function () {
                    inspectionInputs(document.querySelectorAll('input[type="checkbox"], input[type="radio"]'));
                }, 0);
            }
        }
    });
}

function inspectionInputs(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            arr[i].parentElement.classList.add('active');
        } else {
            arr[i].parentElement.classList.remove('active');
        }

        if (arr[i].hasAttribute('disabled')) {
            arr[i].parentElement.classList.add('disabled');
        }
    }
}

// скрипт ползунка калькулятора
// работа со значениями описана в конце скрипта
// https://refreshless.com/nouislider/

var slider = document.getElementById('js-shipment-calc'),
    input = document.getElementById('js-shipment-value'),
    inputs = [input];

if (slider) {

    noUiSlider.create(slider, {
        range: {
            //второе число в массиве - это шаг
            min: [300, 100],
            '30%': [1500, 100],
            '65%': [2000, 100],
            max: [10000]
        },
        start: 300,
        pips: {
            mode: 'values',
            values: [300, 1500, 2000, 10000],
            density: 4
        },
        connect: [true, false]
    });

    slider.noUiSlider.on('update', function (values, handle) {
        input.value = parseInt(values[handle]);

        hideShipmentInfo(input.value);
    });

    // Listen to keydown events on the input field.
    inputs.forEach(function (input, handle) {

        input.addEventListener('change', function () {
            setSliderHandle(handle, this.value);
        });

        input.addEventListener('keydown', function (e) {

            var values = slider.noUiSlider.get();
            var value = Number(values[handle]);

            // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
            var steps = slider.noUiSlider.steps();

            // [down, up]
            var step = steps[handle];

            var position;

            // 13 is enter,
            // 38 is key up,
            // 40 is key down.
            switch (e.which) {

                case 13:
                    setSliderHandle(handle, this.value);
                    break;

                case 38:

                    // Get step to go increase slider value (up)
                    position = step[1];

                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }

                    // null = edge of slider
                    if (position !== null) {
                        setSliderHandle(handle, value + position);
                    }

                    break;

                case 40:

                    position = step[0];

                    if (position === false) {
                        position = 1;
                    }

                    if (position !== null) {
                        setSliderHandle(handle, value - position);
                    }

                    break;
            }
        });
    });
}

function setSliderHandle(i, value) {
    var r = [null, null];
    r[i] = value;
    slider.noUiSlider.set(r);
}

//прячем текст стоимости доставки, при количестве литров более 1000
function hideShipmentInfo(inputValue) {
    var liters = 1000,
        $textEl = $('.shipment-calculation__info');

    if (inputValue >= liters && $('.shipment-calculation__info:visible')) {
        $textEl.css({ 'visibility': 'hidden' });
    } else if (inputValue < liters && $('.shipment-calculation__info:hidden')) {
        $textEl.css({ 'visibility': '' });
    }
}

//https://refreshless.com/nouislider/slider-read-write/
//получение значения
//slider.noUiSlider.get();

//установка значения
//slider.noUiSlider.set(10);


//определение количества списков в блоке с табами
function countTabsContentList() {
    $('.tabs-list-wrap').each(function () {
        if ($('.tabs-list', $(this)).length === 1) {
            $(this).addClass('js-single');
        }
    });
}

//сдвиг центра при наличии слайдера в описании раздела
function shiftCenterPageDescription() {
    if ($('.page-description-slider').length) {
        $('.page-description__inner').css('padding-bottom', 120 + 'px');
    }
}

//часто задаваемые вопросы
function faq() {
    $(document).on('click', '.faq-question', function () {
        $(this).toggleClass('active').next('.faq-answer').slideToggle();
    });
}

//обрезка текста
function cropText(item, size) {

    item.each(function () {
        var newsText = $(this).text();
        if (newsText.length > size) {
            $(this).text(newsText.slice(0, size) + '...');
        }
    });
}