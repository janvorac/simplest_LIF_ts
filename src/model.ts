import { conv } from "./conv.js"

export default class Model {
  protected b: number;
  protected c: number;
  public time: number[];

  public constructor(timeStart: number, timeEnd: number) {
    this.b = 12.6;
    this.c = 2.44;
    this.time = Model.linSpace(timeStart, timeEnd, 200)
  }

  /**
   * Calculate the laser-beam intensity from the time value
   * @param  timeValue time value in nanoseconds
   * @return           intensity value scaled between 0 and 1
   */
  public laserProfile(timeValue: number): number {
    return Math.pow(this.c / this.b * timeValue, this.b) * Math.exp(this.b - timeValue * this.c)
  }

  static calculateVector(x: number[], func: Function): number[] {
    const vector = [];

    for (let i = 0; i < x.length; i++) {
      let nextVal = func(x[i])
      if (nextVal <= 1e-3) {
        nextVal = 0;
      }
      vector.push(nextVal);
    }

    return vector
  }

  /**
   * Transform two equally long vectors `x` and `y` to an array of
   * objects {xName: xValue, yName: yValue} used for plotting with d3.js
   * @param  x     array of x values
   * @param  y     array of y values
   * @param  yName name describing the y-vector data
   * @param  xName name describing the x-vector data
   * @return       array of objects {xName: xValue, yName: yValue}
   */
  static vectorToDataObject(x: number[], y: number[], yName: string, xName: string = 'time'): Array<object> {
    if (x.length !== y.length) {
      throw "input lengths mismatch!"
    }
    let dataObject = []
    for (let i = 0; i < x.length; i++) {
      dataObject.push({
        xName: x[i],
        yName: y[i]
      })
    }
    return dataObject
  }

  /**
   * Calculate exponential decay with lifetime tau
   * @param  time time value in nanoseconds
   * @param  tau  lifetime in nanoseconds
   * @return      relative remaining population for given time value
   */
  protected expDecay(time: number, tau: number): number {
    return Math.exp(-time / tau);
  }

  static linSpace(start: number, stop: number, numpoints: number): number[] {
    const step = (stop - start) / (numpoints - 1)
    const arr = [];
    for (let i = 0; i < numpoints; i++) {
      arr.push(i * step + start)
    }
    return arr;
  }

}
