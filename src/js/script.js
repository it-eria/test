/* Import libraties */
//= vendors/jquery-3.3.1.js

$(function() {
    var screens = $('.screen[data-index]').length;
    var currentCoord = 0;
    var coords = [];
    var domain = 'https://promo.yarych.com/'
    var results = [
        "Дівчинко полегше, в повітрі пахне сексом. Ти, як Керрі Бредшоу, крутиш голови чоловікам. Ізі бейбі, тобі потрібен “Yarych з молоком” і затяжний серіальчик “Секс і місто”.  І не забудь поділись результатом з друзями.",

        "Оооо, жіночко, та ти вже геть загналася, як Еммі. Пора відірватись з акторками фільму “Погані матусі”  і “Yarych з молоком”. Ти заслужила на це.  І не забудь поділитись результатом з друзями.",
        
        "Ти супервумен, сильна і незламна. Ти можеш навіть лизнути лікоть і правильно качати тріцепс, як Діана. Пора розслабитись, задерти ніжки на дивані і похрумтіти “Yarych з молоком”, переглядаючи фільм “Диво жінка”.  І не забудь поділитись результатом з друзями.",

        "Ми бачимо, тут хтось бізнесвумен, як Джулс Остін. Кар’єра, бізнес, всі справи - сьогодні пошли подалі. Є тільки ти, “Yarych з молоком” і фільм “Стажер”.  І не забудь поділитись результатом з друзями.",

        "Ти справжнісінька авантюристка, як Голлі Голайтлі. Ми знаємо, що ти шукаєш собі багатого чоловіка, та не засуджуємо! Сьогодні подивись легендарний “Сніданок у Тіффані”, похрустуючи новеньким “Yarych з молоком”.  І не забудь поділись результатом з друзями.",

        "Ти така ж творча і мила натура, як Мія Доллан. Тебе обов’язково надихне музичний, романтичний, комедійно-драматичний фільм “Ла-Ла Ленд” та смак хрумкої новинки “Yarych з молоком”.  І не забудь поділись результатом з друзями.",
        
        "Збери слюні, мала! Маємо для тебе хороші новини. Змінювати своє життя - правильне рішення, а кепський настрій розчиняється при  перегляді фільму “Щоденник Бріджит Джонс” і хрумкотінні печивом  “Yarych з молоком”.  І не забудь поділитись результатом з друзями"
    ];
    var titles = [
        "Ти - приголомшлива Керрі Бредшоу!",
        "Ти - матуся Еммі у відриві!",
        "Ти - суперсила Діана!",
        "Ти - цілеспрямована Джулс Остін!",
        "Ти - кокеточка Голлі Голайтлі!",
        "Ти - творча натура Міа!",
        "Ти - прокачана Бріджит Джонс!"
    ];
    var images = [
        "assets/img/final-1.jpg",
        "assets/img/final-2.jpg",
        "assets/img/final-3.jpg",
        "assets/img/final-4.jpg",
        "assets/img/final-5.jpg",
        "assets/img/final-6.jpg",
        "assets/img/final-7.jpg"
    ];
    var imagesFb = [
        "assets/img/final-1-fb.jpg",
        "assets/img/final-2-fb.jpg",
        "assets/img/final-3-fb.jpg",
        "assets/img/final-4-fb.jpg",
        "assets/img/final-5-fb.jpg",
        "assets/img/final-6-fb.jpg",
        "assets/img/final-7-fb.jpg"
    ]
    var votes = [];

    var fullName = '';

    for(var v=0; v < results.length; v++) {
        votes.push(0);
    }
    
    function getCoords() {
        for(var i=0; i<screens; i++) {
            coords.push(
                {
                    offsetX: +$('.screen[data-index='+i+']').attr('data-x') * 100,
                    offsetY: +$('.screen[data-index='+i+']').attr('data-y') * 100,
                }
            );
        }
    }

    function setPosition(index) {
        $('.canvas').css({
            'transform': 'translate(-'+coords[index].offsetX+'vw, -'+coords[index].offsetY+'vh)'
        });
    }

    getCoords();

    function findResult() {
        var max = votes[0];
        var index = 0;
        for(var i=0; i < results.length; i++ ) {
            if(votes[i] > max) {
                max = votes[i];
                index = i;
            }
        }
        return index;
    }

    setPosition(currentCoord);

    $('.btn_next-page').on('click', function(e) {
        e.preventDefault();
        ++currentCoord;
        if(currentCoord > coords.length - 2) {
            $('p#result').text(results[findResult()]).removeClass('hidden');
            $('.final-img').attr('src', images[findResult()]);
            setTimeout(function() {
                $('.final-img-wraper').addClass('showen');
            }, 1500);
            try {
              fbq('track', 'CompleteRegistration');
            } catch(err) {
              console.log(err);
            }
        }
        setPosition(currentCoord);
    });

    $('.screen__question .btn_next-page').on('click', function(e) {
        var number = +$(this).parent().find('input[type="radio"]:checked').val();
        votes[number - 1] += 1;
    });

    $('input[type="radio"]').on('click', function() {
        $(this).parent().addClass('checked');
    });

    $('.fb-button').on('click', function(e) {
        e.preventDefault();
        shareOverrideOGMeta(titles[findResult()], "Дізнайся, яка ти героїня кіно. Захопливий сюжет твого життя наче кінострічка! Ти створена підкорювати сцени світового кіно! Шоубіз, натовпи фанів та нишпорки-фотографи - ось, твоя ціль! Пойди тест та розкажи усім навколо, яка твоя роль!", (domain+imagesFb[findResult()]));
        try {
          fbq('track', 'Lead');
        } catch(err) {
          console.log(err);
        }
    });

    

    $('.create-full-name').on('click', function() {
        fullName = $('#name-field').val();
        $('.final-img-wraper .text-left').text(fullName);
    });

    $('#name-field').on('keyup', function() {
        if($(this).val().length > 1) {
            $('.create-full-name').css({
                'visibility': 'visible'
            });
        } else {
            $('.create-full-name').removeAttr('style');
        }
    });

    function shareOverrideOGMeta(overrideTitle, overrideDescription, overrideImage) {
        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:title': overrideTitle,
                    'og:description': overrideDescription,
                    'og:image': overrideImage
                }
            })
        },
        function (response) {
        // Action after response
        });
    }
});