var sketchy = new Sketch();

$(document).ready(function () {
  // selecting the colour of the foreground (line colour)
  $('#FGColourSelect').change(function () {
    var red = $(this).find(':selected').data('red');
    var green = $(this).find(':selected').data('green');
    var blue = $(this).find(':selected').data('blue');

    sketchy.SetForeground(color(red, green, blue));
  });

  // selecting the colour of the background (canvas colour)
  $('#BGColourSelect').change(function () {
    var red = $(this).find(':selected').data('red');
    var green = $(this).find(':selected').data('green');
    var blue = $(this).find(':selected').data('blue');

    sketchy.SetBackground(color(red, green, blue));
  });

  // selecting the thickness of the line
  $('#LineThickness').change(function () {
    var thickness = $(this).find(':selected').data('thickness');

    strokeWeight(thickness);
  });

  // selecting the speed of the line being drawn
  $('#DrawingSpeed').change(function () {
    var speed = $(this).find(':selected').data('speed');

    sketchy.SetDelay(speed);
  });

  // selecting the number of sides that are drawn
  $('#NumberOfSides').change(function () {
    var edges = $(this).find(':selected').data('edges');

    sketchy.SetSides(edges);
  });
});

function setup () {
  sketchy.setup()
  sketchy.SetChangeCanvasWidth(1000);
  sketchy.SetChangeCanvasHeight(1000);
}

function draw () {
  sketchy.draw()
}
