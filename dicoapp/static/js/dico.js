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
/*
    $('#contactModal button').click(function(){
        var url = URL_API + 'special_service_contact/';
        var form = $('#contactModal form');
        var jsonForm = $(form).serializeObject();
        console.log(jsonForm);
        $.post( url, jsonForm, function(data) {
            console.log(data);
        }, 'json' );
    });
*/
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

/*
    $('#contactModal button').click(function(){
        var url = URL_API + 'special_service_contact/';
        var form = $('#contactModal form');
        var jsonForm = $(form).serializeObject();
        console.log(jsonForm);
        $.post( url, jsonForm, function(data) {
            console.log(data);
        }, 'json' );
    });
*/

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

function getSubService(serviceName, srcImage){
  var ServicesDesc = "";
  switch (serviceName)
  {
		case 'Aseo':
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Aseo</h3>"
		        ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro Plomero DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table><tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Por horas aseadora</th></tr></table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 3 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
            break;

		case "Plomeria":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Plomeria</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro del Aseo DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalación de Lavaplatos/Lavadora /secadora</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalación de Grifería (duchas, cocina, lavamanos)</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalación de aparatos sanitarios (lavamanos, sanitarios, duchas)</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación de fugas de tuberías</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;

		case "Carpinteria":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Carpinteria</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro  Carpintero DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalación de muebles (puertas)</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;

		case "Cerrajeria":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Cerrajeria</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro Cerrajero DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Cambio de Guardas, cerrojo, chapas.</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;

		case "Electricista":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Electricista</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro Electricista DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalación de calentadores eléctricos</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Revisión y arreglo de aparatos eléctricos, tomacorrientes, interruptores, timbres</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalación estufas eléctricas</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Instalación de lámparas (elementos  iluminación)</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;

		case "Gas":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Gas</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro Gasodomestico DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Arreglo e instalación de calentadores</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Arreglo e instalación de estufas</th></tr>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Reparación e instalaciones de  tuberías  gas</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;
    case "Mudanza":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Mudanza</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro de la Mudanza DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Mudanzas</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $ 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;

		case "Pintor":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Pintor</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro Pintor DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Pintura</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $: 0 CONTACTENOS</strong></p>";
            ServicesDesc += "</div>";
		break;

		case "Jardineria":
            ServicesDesc = "<div style=\"text-align:justify;\">"
            ServicesDesc += "<h3 style=\"text-align:center;\">Servicio de Jardineria</h3>"
            ServicesDesc += "<p>Dinos que días y cuantas horas necesitas un Maestro Jardinero DICO.</p>";
            ServicesDesc += "Recuerda que  todos  nuestro equipo maestro está calificado y cuenta con experiencia y habilidades certificada  por nuestro equipo administrativo.</br>";
            ServicesDesc += "<h4>SUBSERVICIOS</h4>";
            ServicesDesc += "<table>";
            ServicesDesc += "<tr style=\"border: 1px solid black; margin-left: 20px;\"><th>Servicios generales de jardinería</th></tr>";
            ServicesDesc += "</table>";
            ServicesDesc += "<ul style=\"list-style-type: square; margin-left: 40px;\" >";
            ServicesDesc += "<li>Reserva pagando <strong style=\"font-size: large;\">$10000</strong> y cancela el saldo directamente a tu maestro DICO</li>"
            ServicesDesc += "<li>El servicio no incluye materiales</li>";
            ServicesDesc += "<li>Son 2 horas de servicio  asignadas que inician  a partir de la llegada de tu maestro DICO.</li>"
            ServicesDesc += "<li>El  tiempo  adicional  lo acuerdas directamente con tu maestro DICO.</li>"
            ServicesDesc += "</ul><br>";
            ServicesDesc += "Si el maestro DICO no cumple tus expectativas, te enviaremos  otro  hasta  completar el trabajo a satisfacción.<br>";
            ServicesDesc += "<strong style=\"font-size: large;\">VR TOTAL: $: 40.000</strong></p>";
            ServicesDesc += "</div>";
		break;

	}

  $("#serviceName").html(serviceName);
  $("#serviceImage").attr('src', srcImage);
  $("#serviceDesc").html(ServicesDesc);
}

function sendContactenos(){
  $("#titleAlertModal").html("Mensaje Enviado");
  $("#textAlertModal").html("Tu mensaje ha sido enviado, nos estaremos comunicando lo antes posible.");
}

function sendTrabajaCon(){
  $("#titleAlertModal").html("Mensaje Enviado");
  $("#textAlertModal").html("Tu mensaje ha sido enviado, gracias por querer trabajar con DICO.<br> protno recibiras noticias.");
}

function sendServicio(){
  $("#titleAlertModal").html("Mensaje Enviado");
  $("#textAlertModal").html("Tu mensaje ha sido enviado, gracias por querer trabajar con DICO.<br> protno recibiras noticias.");
}
