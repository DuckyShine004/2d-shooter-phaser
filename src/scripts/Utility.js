class Utility {
  static getTheta(x1, x2, y1, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.atan2(dy, dx);
  }
}

