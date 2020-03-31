import PlotMaker from './plot'
import {
  scaleBand,
  scaleLinear
} from 'd3'

export default class BarPlot extends PlotMaker {
  public data: object[];

  public constructor(data: Array<object>) {
    super(data, "#bar-plot-container", 500, 100) //tune the totalHeight
    this.data = [{state:"excited", pop:0.2}, {state:"ground", pop:0.8}]
    this.createScales()
    this.drawBars();
    this.drawAxes();
    this.axLabels("relative concentration", "");
  }

  protected createScales(){
  this.yScale = scaleBand()
          .range([this.height, 0])
          .padding(0.1)
          .domain(this.data.map(function(d) { return d['state']; }));
  this.xScale = scaleLinear()
          .range([0, this.width])

  }

  protected drawBars(){
    this.plotGroup.selectAll("bar")
      .data(this.data)
    .enter().append("rect")
      .style("fill", "hsl(73, 98%, 37%)")
      .attr("x", 0)
      .attr("width", (d: object) => this.xScale(d["pop"]))
      .attr("y", (d: object) => this.yScale(d["state"]))
      .attr("height", this.yScale.bandwidth())
  }

}
