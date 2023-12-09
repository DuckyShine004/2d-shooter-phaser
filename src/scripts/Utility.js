// eslint-disable-next-line no-unused-vars
class Utility {
  static getBackground(scene) {
    const color1 = 0x05f29b;
    const color2 = 0x037f51;

    const size = 100;

    for (let y = 0; y < WINDOW_HEIGHT; y += size) {
      for (let x = 0; x < WINDOW_WIDTH; x += size) {
        const dx = x / size;
        const dy = y / size;

        console.log(x, y);

        if ((dx + dy) & 1) {
          scene.add.rectangle(x, y, size, size, color1).setOrigin(0, 0);
        } else {
          scene.add.rectangle(x, y, size, size, color2).setOrigin(0, 0);
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
}
