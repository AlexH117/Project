var Balance = ["Activo_circulante", "Activo_no_circulante", "Capital_contribuido", "Capital_ganado", "Intangible", "Pasivo_a_corto_plazo", "Pasivo_a_largo_plazo"];

var BalanceJuego = [],
  indice, item, tiempo, Puntos = 0;
$(document).ready(function() {
  IniciarJuego();
});

function IniciarJuego() {
  Balance = ["Activo_circulante", "Activo_no_circulante", "Capital_contribuido", "Capital_ganado", "Intangible", "Pasivo_a_corto_plazo", "Pasivo_a_largo_plazo"];
  BalanceJuego = [];
  indice = 0;
  item = 0;

  for (i = 0; i < 3; i++) {
    indice = Math.floor(Math.random() * Balance.length);
    item = Balance[indice];
    BalanceJuego.push(item);
    Balance.splice(indice, 1);
  }
  indice = Math.floor(Math.random() * BalanceJuego.length);
  item = BalanceJuego[indice];

  $("#balance").empty();
  $("#DragBalance").empty();

  clearInterval(tiempo);

  $.each(BalanceJuego, function(i, val) {

    $("#balance").append('<div class="col-xs-4 col-md-4" ><a href="#" class="thumbnail"><img src="' + val + '.png" id=' + val + ' draggable="true" ondragstart="drag(event)" style="cursor:move" /></a></div>');

  });

  $("#DragBalance").append('<a href="#" class="thumbnail"   ></a><h3><span class="label label-danger">' + item.replace(/_/gi, ' ') + "</span></h3><br/>");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (data == item) {
    ev.target.appendChild(document.getElementById(data));
    Puntos++;
    $("#Puntaje").html('<span class="label label-default">Puntos: ' + Puntos + '</span>');
    tiempo = setInterval(function() {
      IniciarJuego();
    }, 800);
  } else {
    alert("Fallaste");
    Puntos = 0;
    $("#Puntaje").html('Puntos:' + Puntos + '');
    tiempo = setInterval(function() {
      IniciarJuego();
    }, 800);
  }
}
