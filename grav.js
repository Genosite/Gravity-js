(function()
  {
    /*
 var loop = function() {
=======
    var g_expl = function() {

      this.x = 0;
      this.y = 0;
      this.r = 0;

      this.cycle = function() {
        this.r -= 0.1;
      }
    }

    var g_ball = function() {

      var obj = this;

      this.x = 0;
      this.y = 0;
      this.m = 0;
      this.vx = 0;
      this.vy = 0;
      this.cos = "undef";
      this.sin = "undef";

      this.attracG = function() {

        for (var i = 0; i < nb_bps; i++)
        {
        vdist = dist(obj, A_bps[i]); //hyp
        d_x = -obj.x + A_bps[i].x; //adj
        d_y = -obj.y + A_bps[i].y; //opp
        tan = d_x / d_y;
        cos = d_x / vdist;
        sin = d_y / vdist;

        force_grav = G * (obj.m * A_bps[i].m)/(Math.pow(vdist,2));

        force = force_grav;

        obj.vx += cos * force;
        obj.vy += sin * force;
      }
      if (obj)
      {
        //VX : ORIENTATION : DROITE (0 rad)
        //VY : ORIENTATION : BAS (-(PI/2) rad)

        d_x = -obj.x + (obj.x + obj.vx);
        d_y = -obj.y + (obj.y + obj.vy);

        vdist = Math.sqrt(Math.pow(d_x, 2) + Math.pow(d_y, 2));

        cos = d_x / vdist;
        sin = d_y / vdist;

        d_angle = 0;
        if (obj.cos != "undef")
          d_angle = Math.acos(cos) - Math.acos(obj.cos);

        obj.cos = cos;
        obj.sin = sin;

        force_cent = obj.m * (d_angle*d_angle) * obj.r;
        vf = Math.abs(Math.sin(-(Math.PI/2)) * obj.vy - Math.cos(0) * obj.vx);

        obj.x += obj.vx - force_cent ;
        obj.y += obj.vy - force_cent ;
      }
    }
  };

  var g_bps = function() {
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.m = 0;
  };

  var A_bps = Array();
  var A_ball = Array();
  var A_expl = Array();

  var FPSMAX = 30;
  var G = 9.8;

  var nb_bps = 3;
  var nb_ball = 100;

  var canvas = null;
  var context = null;

  var debug = false;

  dist = function(pl, dps) {
    return (Math.sqrt(Math.pow(pl.x - dps.x, 2) + Math.pow(pl.y - dps.y, 2)));
  };

  loop = function() {
>>>>>>> dc126ec55aec5ae52ab3ea09f108dd04ba873331

    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF";

    for (var i = 0; i < nb_ball; i++)
    {
      if (A_ball[i])
      {
<<<<<<< HEAD
=======
        A_ball[i].attracG();
        context.fillStyle = "#FF0000";
        context.beginPath();
        context.arc(A_ball[i].x, A_ball[i].y, A_ball[i].m/2, 0, 2*Math.PI, false);
        context.fill();
        context.closePath();

>>>>>>> dc126ec55aec5ae52ab3ea09f108dd04ba873331
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
<<<<<<< HEAD
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