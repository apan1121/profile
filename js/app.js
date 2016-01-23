require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'Bootstrap'
        }
    },
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore',
        bootstrap: 'lib/bootstrap',
        backbone: 'lib/backbone',
        i18n: 'lib/require/i18n',
        text: 'lib/require/text',
        async: 'lib/require/async',
        less:'lib/less.min',
        qrcode:'lib/qrcode.min',
    }
});

require([
    'jquery',
    'backbone',
    'underscore',
    'bootstrap',
    'text!template/NavButton.html',
    'text!template/InfoForm.html',
    'qrcode',
    'less'

], function( $,Backbone,_,bootstrap, NavButtonTmp, InfoFormTmp ) {
    var autoClickNavID = null;

    var age =(new Date().getFullYear()-1985);
    var NavButtonView = _.template( NavButtonTmp);
    var InfoFormView = _.template( InfoFormTmp);
    var autobiographyText = "";
    var getAutobiography = function(){
        $.get("data/autobiography.data?"+new Date().getTime(),{},function(data){
            var autobiographyText = data;
            autobiographyText = autobiographyText.replace(/\n\n/ig,"\n");
            autobiographyText = autobiographyText.replace(/\n/ig,"[EnterTag]");
            autobiographyText = "<p>" + autobiographyText.replace(/\[EnterTag\]/ig,"</p>\n<p>") + "</p>";

            autobiographyText = autobiographyText.replace(/\[b\]/ig,"<span class='hightlight'>");
            autobiographyText = autobiographyText.replace(/\[\/b\]/ig,"</span>");
            // console.log(autobiographyText.match(/\[b\](.){1,20}\[\/b\]/g));

            getValue(autobiographyText);
        });
    }


    var getValue = function(autobiographyText){
        $.get("data/data.json?"+new Date().getTime(),{},function(data){

            data = data.replace("[Age]",age);
            var data = $.parseJSON(data);

            data['autobiography']['data'] = autobiographyText;
            for ( var key in data) {
                $(".nav .navBox").append( NavButtonView({"key":key,"data":data[key]}));
                // console.log(InfoFormView({"key":key,"data":data[key]}));
                $(".mainPage").append(InfoFormView({"key":key,"data":data[key]}));
            }

            int();
        },'text');
    }

    var scrollTop = function(target){
        var targetTop = target.offset().top - $(".nav").outerHeight();
        var wscrollTop = $(window).scrollTop();

        if (wscrollTop > targetTop) {
            $("body").animate({
                scrollTop: targetTop
            }, 600);
        }
    }

    var int = function() {
        $(".needTransition").addClass("transition");

        // $(".nav,.avatar,.mainPage").addClass("bind");

        $(".navButton").bind('click',function(){
            if(!$(this).hasClass("selected")){
                $('.navButton').not($(this)).removeClass("selected");
                $(this).addClass("selected");
                $(".toolBar,.mainPage,.footer").addClass("bind");
                var rel = $(this).attr("ref");
                $(".boxer").addClass("hide");

                $(".boxer[rel='"+rel+"']").removeClass("hide");

                scrollTop( $(".boxer[rel='"+rel+"']") );
                app_router.navigate(rel, false);

            } else {
                $(".navButton").removeClass("selected");
                $(".toolBar,.mainPage,.footer").removeClass("bind");
                location.hash = "";
                app_router.navigate("", false);
            }
        });


        $(".printBT").click(function(){
            window.print();
        });

        $(".qrcodeBT").click(function(){
            if( $("#qrcodeBox").length ==0){
                var qrcodeBox = $("<div id='qrcodeBox'><div id='qrcode'></div></div>");
                qrcodeBox.addClass("qrcodeBox");
                $("body").append(qrcodeBox);

                var qrcode = new QRCode("qrcode",{
                    width: 150,
                    height: 150,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
                qrcode.makeCode( location.href);

                var top =$(this).offset().top;
                var left = $(this).offset().left - qrcodeBox.outerWidth() + $(this).outerWidth();
                qrcodeBox.css({"left":left});

                setTimeout(function(){
                    $("body").bind("click",function(){
                        qrcodeBox.remove();
                        $("body").unbind('click');
                    });
                },100);

            } else {
                $("#qrcodeBox").remove();
                $("body").unbind('click');
            }
        });


        $(".allContent").animate({opacity:1});
        $(".loading").animate({opacity:0});

        setTimeout(function(){
            $(".navButton[ref='"+autoClickNavID+"']").trigger("click");
        },100);

    }

   var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            ':id': 'autoClickNavButton',
            '*actions': 'defaultAction'
        },
        autoClickNavButton: function(id){
            autoClickNavID = id;
            getAutobiography();
        },
        defaultAction: function(){
            getAutobiography();
        }
    });

    var app_router = new AppRouter;
    Backbone.history.start();
});
