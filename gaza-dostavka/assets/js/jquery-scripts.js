$(document).ready(function () {
    $('div.partners-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: '<div class="partners-slider__next"></div>',
        prevArrow: '<div class="partners-slider__prev"></div>',
        arrows: true
    });

    //слайдер на главной
    $('div.index-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: '<div class="index-slider__next"></div>',
        prevArrow: '<div class="index-slider__prev"></div>',
        arrows: true
    });

    //слайдер карточки товара
    $('div.card-inner__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: false,
        asNavFor: '.card-inner__pager',
        focusOnSelect: true
    });

    $('div.card-inner__pager').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true,
        dots: false,
        arrows: false,
        infinite: false,
        asNavFor: '.card-inner__slider',
        focusOnSelect: true
    });

    //слайдер на фотогалереи
    $('div.shipment-gallery-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: '<div class="shipment-slider__next"></div>',
        prevArrow: '<div class="shipment-slider__prev"></div>',
        arrows: true
    });

    //слайдер отзывов
    $('div.review-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: '<div class="review-slider__next"></div>',
        prevArrow: '<div class="review-slider__prev"></div>',
        arrows: true
    });

    //fancybox-popup
    $('.js_fancybox-img').fancybox({
        closeBtn: true,
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0,0,0,0.65)'
                }
            }
        }
    });

    //fancybox-popup
    $('.js-modal').fancybox({
        closeBtn: true,
        minWidth: 385,
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0,0,0,0.65)'
                }
            }
        }
    });

    //слайдер с миниатюрами для главной
    $(".fancybox-thumb").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        padding: 43,
        helpers: {
            thumbs: {
                width: 75,
                height: 60
            }
        }
    });

    //custom scroll
    $('div.aside-feedback__top, ul.aside-nav, ul.aside-nav ul').jScrollPane({
        autoReinitialise: true
    });

    //mask showMaskOnHover
    $('.js-phone-mask').inputmask({
        "mask":"+7 (999) 999-99-99",
        "showMaskOnHover":false
    });

    //custom select for filter
    $('.js-example-basic-multiple').select2({
        placeholder: 'Выберите параметры',
        width: "100%",
        allowClear: true,
        theme: 'classic'
    });

    //custom select for calculator
    $('.js_distance').select2({
        width: "100%",
        theme: 'classic',
        minimumResultsForSearch: Infinity
    });

    //custom select for additional-equipment
    $('.js_additional-equipment').select2({
        placeholder: 'Вид оборудования',
        width: 254,
        theme: 'classic',
        minimumResultsForSearch: Infinity
    });

    //Обрезка длины текста
    $('.useful-information__item-txt').liTextLength({
        length: 110,         //Видимое кол-во символов
        afterLength: '...',  //Текст после видимого содержания
        fullText: false       //Добавить ссылку для отображения скрытого текста
    });

    //табы
    $("#tabs-content div").hide(); // Скрытое содержимое
    $("#tabs-list li:first").attr("id", "current"); // Какой таб показать первым
    $("#tabs-content div:first").fadeIn(); // Показ первого контента таба

    $('#tabs-list a').click(function (e) {
        e.preventDefault();
        $("#tabs-content div").hide(); //Скрыть всё содержимое
        $("#tabs-list li").attr("id", ""); //Сброс идентификаторов
        $(this).parent().attr("id", "current"); // Активация идентификаторов
        $('#' + $(this).attr('title')).fadeIn(); // Показать содержимое текущей вкладки
    });


});





