function createBarrier(physics, player, x, y, width, height, visible = false) {
  let barrier = physics.add.sprite(x, y, null).setImmovable(true);
  barrier.body.setSize(width, height);
  barrier.setVisible(visible);
  physics.add.collider(player, barrier);
}

function setUpInteractivity(physics, player, object, interact) {
  physics.add.overlap(player, object, interact, null, this);
}