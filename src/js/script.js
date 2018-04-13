/* Import libraties */
//= vendors/jquery-3.3.1.js
//= vendors/slick.js
//= vendors/parallax.js

$(function() {
    var screens = $('.screen[data-index]').length;
    var currentCoord = 0;
    var coords = [];
    var results = [
        "Дівчинко полегше, в повітрі пахне сексом. Ти, як Керрі Бредшоу, крутиш голови чоловікам. Ізі бейбі, тобі потрібен “Yarych з молоком” і затяжний серіальчик “Секс і місто”.  І не забудь поділись результатом з друзями.",

        "Оооо, жіночко, та ти вже геть загналася, як Еммі. Пора відірватись з акторками фільму “Погані матусі”  і “Yarych з молоком”. Ти заслужила на це.  І не забудь поділитись результатом з друзями.",
        
        "Ти супервумен, сильна і незламна. Ти можеш навіть лизнути лікоть і правильно качати тріцепс, як Джейн. Пора розслабитись, задерти ніжки на дивані і похрумтіти “Yarych з молоком”, переглядаючи фільм “Солдат Джейн”.  І не забудь поділитись результатом з друзями.",

        "Ми бачимо, тут хтось бізнесвумен, як Джулс Остін. Кар’єра, бізнес, всі справи - сьогодні пошли подалі. Є тільки ти, “Yarych з молоком” і фільм “Стажер”.  І не забудь поділитись результатом з друзями.",

        "Ти справжнісінька авантюристка, як Голлі Голайтлі. Ми знаємо, що ти шукаєш собі багатого чоловіка, та не засуджуємо! Сьогодні подивись легендарний “Сніданок у Тіффані”, похрустуючи новеньким “Yarych з молоком”.  І не забудь поділись результатом з друзями.",

        "Ти така ж творча і мила натура, як Мія Доллан. Тебе обов’язково надихне музичний, романтичний, комедійно-драматичний фільм “Ла-Ла Ленд” та смак хрумкої новинки “Yarych з молоком”.  І не забудь поділись результатом з друзями.",
        
        "Збери слюні, мала! Маємо для тебе дві новини. Погана - ти Бріджит Джонс, хороша - все може виправити хрумке печиво “Yarych з молоком” і перегляд фільму “Щоденник Бріджит Джонс”.  І не забудь поділитись результатом з друзями."
    ];
    var votes = [];

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
            $('p#result').text(results[findResult()]);
            $('meta[property="og:description"]').attr('content', results[findResult()]);
            $('body').prepend('<div id="fb-root"></div>');
            
            // $.ajaxSetup({ cache: true });
            // $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
            //     FB.init({
            //         appId: '460473194405508',
            //         version: 'v2.7'
            //     });     
            //     $('#loginbutton,#feedbutton').removeAttr('disabled');
            //     FB.getLoginStatus(updateStatusCallback);
            // });
            // Facebook sdk
            // (function(d, s, id) {
            //     var js, fjs = d.getElementsByTagName(s)[0];
            //     if (d.getElementById(id)) return;
            //     js = d.createElement(s); js.id = id;
            //     js.src = 'https://connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v2.12&appId=460473194405508&autoLogAppEvents=1';
            //     fjs.parentNode.insertBefore(js, fjs);
            // }(document, 'script', 'facebook-jssdk'));

            shareOverrideOGMeta("Title overrided", results[findResult()], "https://iteria.com.ua/yarych/build/assets/img/3.jpg");

            $('.fb-button').html('<div class="fb-share-button" data-href="https://iteria.com.ua/yarych/build/index.html" data-layout="button" data-size="large" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fiteria.com.ua%2Fyarych%2Fbuild%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Поширити</a></div>');
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