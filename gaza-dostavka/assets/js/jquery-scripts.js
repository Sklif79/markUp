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

    $('div.article-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: '<div class="article-slider__next"></div>',
        prevArrow: '<div class="article-slider__prev"></div>',
        arrows: true,
        fade: true,
        cssEase: 'linear'
    });

    //слайдер брендов в описании раздела
    $('div.page-description-slider').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false
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

    $('.tooltip-click__inner').jScrollPane();

    //mask showMaskOnHover
    $('.js-phone-mask').inputmask({
        "mask": "+7 (999) 999-99-99",
        "showMaskOnHover": false
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

    //табы
    $("#tabs-content div").hide(); // Скрытое содержимое
    $("#tabs-list li:first").attr("id", "current"); // Какой таб показать первым
    $("#tabs-content div:first").fadeIn(); // Показ первого контента таба

    $('#tabs-list a').click(function (e) {
        e.preventDefault();
        $("#tabs-content div").hide(); //Скрыть всё содержимое
        $("#tabs-list li").attr("id", ""); //Сброс идентификаторов
        $(this).parent().attr("id", "current"); // Активация идентификаторов
        $('#' + $(this).attr('data-title')).fadeIn(); // Показать содержимое текущей вкладки
    });


    if (window.ymaps && $('#map-station').length) {
        ymaps.ready(initMapStation);
    } else if (window.ymaps && $('#office-map').length) {
        ymaps.ready(initOfficeMap);
    }

    (function(){
        var $el = $('.person-type');

        personTypeHideLineOnLoad($el);

        $el.on('click', personTypeHideLineOnClick);
    })();

    $( '.tooltip-click__inner' ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
        e.preventDefault();
    });
});

function initMapStation() {
    var mapObj;
    mapObj = {
        center: [59.93424151987533, 30.334370355622525],
        zoom: 13,
        controls: []
    };

    var myMap = new ymaps.Map('map-station', mapObj, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set({
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/assets/images/map-marker.png',
        iconImageSize: [30, 36],
        iconImageOffset: [-16, -40],
        balloonShadow: false,
        balloonOffset: [-135, -10]
    });
    objectManager.clusters.options.set('preset', 'blue#redClusterIcons');
    myMap.geoObjects.add(objectManager);

    //чтобы иконка стала активной, добавить нужному <i> класс active
    $.ajax({
        url: "/assets/js/data.json"
    }).done(function (data) {
        objectManager.add(data);
    });

    document.addEventListener('click', showBal);


    //центрирование крты по клику
    function showBal(e) {
        var dataCoords,
            coords = [],
            scrollTop = $('#map-station').offset().top;

        if (e.target.classList.contains('map-filter__location')) {
            dataCoords = e.target.getAttribute('data-location').split(',');

            dataCoords.forEach(function (item) {
                coords.push(parseFloat(item));
            });

            myMap.setCenter(coords, 13, {
                checkZoomRange: true
            });

            $('body, html').animate({scrollTop: scrollTop}, 300);
        }
    }
}

function initOfficeMap() {
    var mapObj, dataObj;

    mapObj = {
        center: [59.93424151987533, 30.334370355622525],
        zoom: 13,
        controls: []
    };

    window.myMap = new ymaps.Map('office-map', mapObj, {
        searchControlProvider: 'yandex#search'
    }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set({
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/assets/images/map-office-marker.png',
        iconImageSize: [23, 34],
        iconImageOffset: [-16, -40]
    });
    objectManager.clusters.options.set('preset', 'blue#redClusterIcons');
    myMap.geoObjects.add(objectManager);
    myMap.behaviors.disable('scrollZoom');

    $.ajax({
        url: "/assets/js/data-offices.json"
    }).done(function (data) {

        // window.cityObjData = data;
        selectCityInit(data);


        $('.select-points__list').on('click', '.select-city', function (e) {

            $('.select-city').removeClass('active');
            $(this).addClass('active');
            selectCityInit(data);
        });

        objectManager.add(data);
    });
}

//инициализация выбора города из выпадающего списка
function selectCityInit(data) {
    var $targetCityName = $('.select-points__selected'),
        $footer = $('#office-map-footer'),
        $contacts = $('#contacts-data'),
        $el,
        id,
        self;

    $('.select-city').each(function () {
        self = $(this);

        if (self.hasClass('active')) {
            //вставляем название активного пункта
            $targetCityName.text(self.text());

            //id для поиска
            id = self.data('city-id');

            //поиск активного id в объекте json
            $el = findCityId(data["features"], id);
        }
    });

    setMapCenter($el["geometry"]["coordinates"]);

    $footer.text($el["footer"]);

    //вставляем данные в боковую панель контактов
    $contacts.html(buildAsideHTML($el["aside"]));

}

//формируем html контактных данных
function buildAsideHTML(data) {
    var $html = $("<div/>", {
            "class": "contacts-inner",
        }),
        i;

    for (i = 0; i < data.length; i++) {
        $html.append(
            $("<div/>", {
                "class": "contacts-row",
            }).append(
                $("<div/>", {
                    "class": "contacts__title",
                    html: data[i]["title"]
                }),
                $("<div/>", {
                    "class": "contacts__el",
                    html: data[i]["content"]
                })
            )
        );
    }

    return $html;
}

//центрирование по массиву координат
function setMapCenter(coords) {
    myMap.setCenter(coords, 13, {
        checkZoomRange: true
    });
}

//фильтрация городов по id
function findCityId(arr, id) {
    var cityObj = arr.filter(function (obj) {
        return obj["id"] === id;
    });

    return cityObj[0];
}

//удаление поля "название организации" для физ. лиц
function personTypeHideLineOnLoad($el) {
    var i,
        $target;

    $target = $el.closest('form').find('.js_person-hide');

    for (i = 0; i < $el.length; i++) {
        if ($($el[i]).hasClass('person') && $($el[i]).prop('checked')) {
            $target.hide();
        }
    }
}

function personTypeHideLineOnClick(e) {
    var $el = $(e.target),
        $target = $el.closest('form').find('.js_person-hide');

    if ($el.hasClass('person')) {
        $target.hide();
    } else if ($el.hasClass('organization')) {
        $target.show();
    }
}










