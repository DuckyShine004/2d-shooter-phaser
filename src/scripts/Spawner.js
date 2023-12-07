// eslint-disable-next-line no-unused-vars
class Spawner {
  constructor(scene) {
    this.enemies = [];
  }

  spawnEnemy() {
    this.enemies.push(new Enemy(this.scene, 0, 0, 60, 0x202020));
  }

  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
  }

  update(time) {
    this.spawnEnemy();

    for (const enemy of [...this.enemies]) {
      enemy.update();
    }
  }
}
