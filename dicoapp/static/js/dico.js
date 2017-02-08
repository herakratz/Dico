var URL_API = "../api/";

$(document).ready(function(){

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > 300) {
            $('header').addClass('fixed');
            $('.hero-slider').css("padding-top","90px");
            if($(window).width() < 768){
              $('header .nav-work .btn-info').hide();
            }
            if($(window).width() >= 768){
              $('.header-container').addClass('fixed-container');
            }
        } else {
            $('header').removeClass('fixed');
            $('.hero-slider').css("padding-top","inherit");
            $('header .nav-work .btn-info').show();
            $('.header-container').removeClass('fixed-container');
        }
        var heighTop = $('.hero-slider').height() + $('header').height();
        if($(window).scrollTop() >= heighTop - 100){
          $('.beneficios .benefits-imgs').css("overflow-y","auto");
        }else{
          $('.beneficios .benefits-imgs').css("overflow-y","inherit");
        }
    });

    $('.menu-icon').on('click', function(){
        $('.nav-work .navbar ul.nav').slideToggle();
    });

    $('.my-slider').slick({
        dots: true,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.nav-work .navbar-nav a').click(function(){
    $('.nav-work .navbar ul.nav').slideUp();
        $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });

    $('.sandbox-container input').datepicker({
        todayBtn: "linked",
        language: "es"
    });

    $('.hora-inicio').timepicker({
        'minTime': '8:00am',
        'maxTime': '6:00pm'
    });

    $('.hora-final').timepicker({
        'minTime': '8:00am',
        'maxTime': '6:00pm'
    });

    $('.btn-append').click(function(){

        $('.services-days').append(
            '<div class="day-select append-container">'+
            '<div class="sandbox-container">'+
              '<input type="text" placeholder="Selecciona la fecha">'+
            ' </div><div class="inputs-time">'+
              '<input type="text" class="time hora-inicio" placeholder="hora"/>'+
            '</div>'+
            '<span>a</span>'+
            '<div class="inputs-time">'+
              '<input type="text" class="time hora-final" placeholder="hora"/>'+
            '</div><br>'+
            '<button type="button" class="delete-day"><span class="glyphicon glyphicon-trash"></span></button>'+
            '</div>'
        );

        $('.sandbox-container input').datepicker({
            todayBtn: "linked",
            language: "es"
        });

        $('.hora-inicio').timepicker({
          'minTime': '8:00am',
          'maxTime': '6:00pm'
        });

        $('.hora-final').timepicker({
          'minTime': '8:00am',
          'maxTime': '6:00pm'
        });

        $('.delete-day').click(function(){
          $(this).parents('.day-select').remove();
        });
    });

    $('.upload').change(function(){
        var inputValue = $('.fileUpload .upload').val();
        $('.value-file').text(inputValue);
    })



    $('#workModal button').click(function(){
        var url = URL_API + 'job_contacts/';
        var form = $('#workModal form');
        var jsonForm = $(form).serializeObject();
        $.post( url, jsonForm, function(data) {
            console.log(data);
        }, 'json' );
    });

    $('#contactModal button').click(function(){
        var url = URL_API + 'special_service_contact/';
        var form = $('#contactModal form');
        var jsonForm = $(form).serializeObject();
        console.log(jsonForm);
        $.post( url, jsonForm, function(data) {
            console.log(data);
        }, 'json' );
    });

    var contactTest = function () {
        var url = URL_API + 'special_service_contact/';
        var form = $('#contactModal form');
        var jsonForm = $(form).serializeObject();
        console.log(jsonForm);
        $.post(url, jsonForm, function (data) {
            console.log(data);
        }, 'json');
    }

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };


    $('#contactModal button').click(function(){
        var url = URL_API + 'special_service_contact/';
        var form = $('#contactModal form');
        var jsonForm = $(form).serializeObject();
        console.log(jsonForm);
        $.post( url, jsonForm, function(data) {
            console.log(data);
        }, 'json' );
    });


    $( "#serviceSubservices" ).change(function() {
        var val = $( "#serviceSubservices" ).find(":selected").attr('price');

        if(val){
            console.log(val);
            $( "#servicePrice" ).val(val);
        } else {
            $( "#servicePrice" ).val("");
        }
    });

    getServices();

});


$("button").on("click", function() { 
    var url = URL_API + 'special_service_contact/';
        var form = $('#contactModal form');
        var jsonForm = $(form).serializeObject();
        console.log(jsonForm);
        $.post( url, jsonForm, function(data) {
            console.log(data);
        }, 'json' );
});



function getServices(){
    var url = URL_API + 'services/';

    $.get( url, function(data) {
        console.log(data.results);
        var html = "";
        $.each(data.results, function(key, value){
            html +=
                '<div class="service-item">'+
                    '<a href="" data-toggle="modal" data-target="#serviceModal" onclick="getSubService('+value.id+')">'+
                          '<span class="title-service">'+value.name+'</span>'+
                          '<img src="'+value.image+'">'+
                          '<div class="more">+</div>'+
                    '</a>'+
                '</div>';
        });

        $(".services-grid").html(html);
    }, 'json' );

}

function getSubService(serviceId){
    $(".loading").show();
    $('#serviceSubservices').html('<option value="">Selecciona tu servicio</option>');
    $( "#servicePrice" ).val("");

    var url = URL_API + 'services/'+serviceId;
    $.get( url, function(data) {
        console.log(data);
        $("#serviceName").html(data.name);
        $("#serviceImage").attr('src', data.image);
        $("#serviceDesc").html(data.desc);

    }, 'json' );


    url = URL_API + 'sub_services/?service_id='+serviceId;
    $.get( url, function(data) {
        console.log(data.results);
        $.each(data.results, function (i, item) {
            $('#serviceSubservices').append($('<option>', {
                value: item.id,
                text : item.name,
                price : item.price
            }));
        });

        $(".loading").hide();
    }, 'json' );

}

