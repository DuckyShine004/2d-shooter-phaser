// eslint-disable-next-line no-unused-vars
class Utility {
  static getBackground(scene, window) {
    const color1 = 0x05f29b;
    const color2 = 0x037f51;

    const size = 150;

    let x;
    let y;

    let dx;
    let dy;

    for (y = 0; y < window.innerHeight; y += size) {
      for (x = 0; x < window.innerWidth; x += size) {
        dx = x / size;
        dy = y / size;

        if ((dx + dy) & 1) {
          scene.add.rectangle(x, y, size, size, color1);
        } else {
          scene.add.rectangle(x, y, size, size, color2);
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
   * Calculates the noramlized velocity vector of the object.
   *
   * @param {number} x - The x coordinate of the object.
   * @param {number} y - The y coordinate of the object.
   * @return {number} The normalized velocity vector.
   */
  static getNormalization(x, y) {
    const z = Math.pow(x, 2) + Math.pow(y, 2);

    return 1 / Math.sqrt(z);
  }
}
