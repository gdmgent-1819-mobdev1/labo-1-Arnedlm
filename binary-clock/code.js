var c = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

function binViewUnit(x, y, radius, start, a, f) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';

  ctx.arc(x, y, radius, start, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = '#f00';
  if (f) {
    ctx.fill();
  }

}

function isTime(a) {
  var toBinAndPad = function(d) {
      d = parseInt(d, 10).toString(2);

      while (d.length < 4) {
        d = "0" + d;
      }

      return d;
    },

    padT = function(t) {
      t = t.toString();
      return (t.length == 1) ? "0" + t : t;
    },

    D = new Date()
  hr = padT(D.getHours()),
    mn = padT(D.getMinutes()),
    se = padT(D.getSeconds()),
    tot = toBinAndPad(hr[0]) + toBinAndPad(hr[1]) +
    toBinAndPad(mn[0]) + toBinAndPad(mn[1]) +
    toBinAndPad(se[0]) + toBinAndPad(se[1]);

  return (tot[a] == "1");
}
function drawClock() {
  var map = {
    0: 1,
    1: 1,
    8: 1,
    16: 1
  };

  var initialX = 22;
  var initialY = 25;
  var horizontalInterval = 20;
  var verticalInteval = 20;

  var mapIndex = 0;
  for (var i = initialX; i <= horizontalInterval * 5 + initialX; i += horizontalInterval) {
    for (var j = initialY; j <= verticalInteval * 3 + initialY; j += verticalInteval) {
      if (!map[mapIndex]) {
        binViewUnit(i, j, 8, 0, mapIndex, isTime(mapIndex));
      }

      mapIndex++;
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawClock();
  setTimeout(loop, 100);
}

loop();