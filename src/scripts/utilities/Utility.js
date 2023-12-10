// eslint-disable-next-line no-unused-vars
class Utility {
  /**
   * Creates a background for the game scene.
   *
   * @param {*} scene - The current scene.
   * @return {void} Nothing is being returned.
   */
  static getBackground(scene) {
    for (let y = 0; y < WINDOW_HEIGHT; y += GRID_SIZE) {
      for (let x = 0; x < WINDOW_WIDTH; x += GRID_SIZE) {
        const dx = x / GRID_SIZE;
        const dy = y / GRID_SIZE;

        if ((dx + dy) & 1) {
          scene.add.rectangle(x, y, GRID_SIZE, GRID_SIZE, GREEN).setOrigin(0, 0);
        } else {
          scene.add.rectangle(x, y, GRID_SIZE, GRID_SIZE, DARK_GREEN).setOrigin(0, 0);
        }
      }
    }
  }

  /**
   * Calculates the angle in radians between two points.
   *
   * @param {number} x1 - The x-coordinate of the first point.
   * @param {number} x2 - The x-coordinate of the second point.
   * @param {number} y1 - The y-coordinate of the first point.
   * @param {number} y2 - The y-coordinate of the second point.
   * @return {number} The angle in radians between the two points.
   */
  static getTheta(x1, x2, y1, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.atan2(dy, dx);
  }

  /**
   * Calculates the magnitude of the vector.
   *
   * @param {number} x - The horizontal component of the vector.
   * @param {number} y - The vertical component of the vector.
   * @return {number} The magnitude of the vector.
   */
  static getMagnitude(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  /**
   * Checks if any of the vector components are non-zero.
   *
   * @param {number} x - The horizontal component of the vector.
   * @param {number} y - The vertical component of the vector.
   * @return {boolean} The result of the check.
   */
  static checkNonZeroComponents(x, y) {
    return Math.abs(x) > 0 || Math.abs(y) > 0;
  }

  /**
   * Calculates the normalized velocity vector.
   *
   * @param {number} x - The horizontal component of the vector.
   * @param {number} y - The vertical component of the vector.
   * @return {number} The normalized velocity vector.
   */
  static getNormalization(x, y) {
    return this.checkNonZeroComponents(x, y) ? 1 / this.getMagnitude(x, y) : 0;
  }

  /**
   * Get the next time when the enemy should spawn again.
   *
   * @param {*} t - The total time elapsed.
   * @return {number} The time when the next enemy should spawn.
   */
  static getSpawnRate(t) {
    const rate = ENEMY_INITIAL_SPAWN_RATE * Math.exp(ENEMY_SPAWN_RATE_COEFFICENT * t);

    return Math.max(ENEMY_SPAWN_RATE_LIMIT, rate);
  }
}
