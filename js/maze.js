"use strict";

$(document).ready(function () {
  var start = $("#start");
  var end = $("#end");
  var maze = $("#maze");
  var boundary = $(".boundary");
  var gameStart = false;
  maze.mouseleave(function () {
    loss();
  });

  start.click(function () {
    gameStart = true;
    if (boundary.hasClass("youlose")) {
      boundary.removeClass("youlose");
      $("#status").text('Click the "S" to begin.');
    }
    boundary.mousemove(function () {
      loss();
    });
  });

  end.mousemove(function () {
    if (gameStart == true) won();
    else if (gameStart && boundary.hasClass("youlose")) loss();
  });

  function won() {
    $("#status").text("You win!. 😊");

    gameStart = false;
  }

  function loss() {
    if (gameStart) {
      gameStart = false;
      boundary.addClass("youlose");
      $("#status").text("Sorry, you lost. 😔");
    }
  }
});
