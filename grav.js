(function()
  {
    galaxy = new World;
    galaxy.init();
    galaxy.gui = new dat.GUI();
    galaxy.gui.add(galaxy, 'pause');
  }
)();