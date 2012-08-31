(function()
  {
    /*
 var loop = function() {

    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF";

    for (var i = 0; i < nb_ball; i++)
    {
      if (A_ball[i])
      {
        if (debug)
        {
          context.strokeStyle = "#00FF00";
          context.beginPath();
          context.moveTo(A_ball[i].x,A_ball[i].y);
          context.lineTo(A_ball[i].cos * 30 + A_ball[i].x,
            A_ball[i].sin * 30 + A_ball[i].y);
          context.stroke();
        }

        for (var j = 0; j < nb_bps; j++)
        {
          if (A_ball[i])
          {
            if (dist(A_ball[i], A_bps[j]) <= A_bps[j].r)
            {
              tmp = new g_expl;
              tmp.x = A_ball[i].x;
              tmp.y = A_ball[i].y;
              tmp.r = A_ball[i].r * 3;
              A_expl.push(tmp);
              delete A_ball[i];
            }
          }
        }
      }
    }
}
canvas.addEventListener("mousemove", function(e) {
  if (e.which)
  {
    var tmp = new g_ball;
    tmp.m = Math.floor(Math.random() * 10) + 2;
    tmp.r = tmp.m / 2;
    tmp.x = e.clientX;
    tmp.y = e.clientY;
    tmp.vx = 0;
    tmp.vy = 0;
    A_ball.push(tmp);
    nb_ball++;
  }
});

document.addEventListener("keypress", function(e) {
  switch(e.which)
  {
    case 100:
      debug = !debug;
    break;

    case 112:
      pause = !pause;
    break;

    default:
      console.log(e.which);
  }
}); */
    test = new World;
    test.init();
  }
)();