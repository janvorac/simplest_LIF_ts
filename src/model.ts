import { conv } from "./conv.js"

export default class Model {
  protected b: number;
  protected c: number;
  public time: number[];
  protected laserProfVector: number[];
  protected fluoVector: number[];
  public data: Array<object>;

  public constructor(timeStart: number, timeEnd: number) {
    this.b = 12.6;
    this.c = 2.44;
    this.time = Model.linSpace(timeStart, timeEnd, 200)

    this.laserProfVector = Model.calculateVector(this.time, this.laserProfile)

    //TO BE REPLACED!!
    this.fluoVector = Model.calculateVector(this.time, this.expDecay)
    //###########

    this.data = Model.vectorsToDataObject([
      this.time,
      this.laserProfVector,
      this.fluoVector
    ], [
      "time",
      "laserProf",
      "fluorescence"
    ])
  }

  /**
   * Calculate the laser-beam intensity from the time value
   * @param  timeValue time value in nanoseconds
   * @return           intensity value scaled between 0 and 1
   */
  public laserProfile(timeValue: number): number {
    console.log(Model.c)
    return Math.pow(Model.c / Model.b * timeValue, Model.b) * Math.exp(Model.b - timeValue * Model.c)
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
   * @param  xName name describing the x-vector data, defaults to "time"
   * @return       array of objects {xName: xValue, yName: yValue}
   */
  static vectorsToDataObject(vectors: number[][], names: string[]): Array<object> {
    if (vectors.length !== names.length){
      throw "vectors and names length mismatch!"
    }

    for (let vectorIndex = 0; vectorIndex < vectors.length; vectorIndex++){
      if (vectors[vectorIndex].length !== vectors[0].length){
        throw "vectors are not equally long!"
      }
    }

    ////PREPSAT!!!!
    let objectArray = []
    for (let pointIndex = 0; pointIndex < vectors[0].length; pointIndex++) {
      let dataObject = {};
      for (let vectorIndex = 0; vectorIndex < vectors.length; vectorIndex++){
        dataObject[names[vectorIndex]] = vectors[vectorIndex][pointIndex]
      }
      objectArray.push(dataObject)
    }
    return objectArray
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
