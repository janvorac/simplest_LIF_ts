import PlotMaker from './plot'
import {
  max,
  min
} from 'd3'

export default class BarPlot extends PlotMaker {
  public constructor(data: Array<object>) {
    super(data, "#bar-plot-container", 500, 200) //tune the totalHeight
    this.drawAxes(0, 1, 0, 1)
    this.axLabels("relative concentration", "");
  }

}
