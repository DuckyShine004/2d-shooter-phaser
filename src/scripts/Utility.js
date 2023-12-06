class Utility {
  static getTheta(x1, x2, y1, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.atan2(dy, dx);
  }

  static getNormalization(x, y) {
    const z = Math.pow(x, 2) + Math.pow(y, 2);

    return 1 / Math.sqrt(z);
  }
}

