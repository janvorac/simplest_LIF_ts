import PlotMaker from './plot_abstract'
import {
  scaleBand,
  scaleLinear
} from 'd3'

const data_default = [{ state: "excited", pop: 0 }, { state: "ground", pop: 0 }]

export default class BarPlot extends PlotMaker {
  public data: object[];

  public constructor(data: Array<object> = data_default) {
    super(data, "#bar-plot-container", 480, 100) //tune the totalHeight
    this.createScales()
    this.drawBars();
    this.drawAxes();
    this.axLabels("relative concentration", "");
  }

  protected createScales() {
    this.yScale = scaleBand()
      .range([this.height, 0])
      .padding(0.1)
      .domain(this.data.map(function(d) { return d['state']; }));
    this.xScale = scaleLinear()
      .range([0, this.width])

  }

  protected drawBars() {
    this.plotGroup.selectAll("bar")
      .data(this.data)
      .enter().append("rect")
      .classed("bar", true)
      .style("fill", "hsl(73, 98%, 37%)")
      .attr("x", 0)
      .attr("width", (d: object) => this.xScale(d["pop"]))
      .attr("y", (d: object) => this.yScale(d["state"]))
      .attr("height", this.yScale.bandwidth())
  }

  public updateData(fluorescenceValue: number, redraw: boolean = true): void {
    const maxExc = 0.2;
    this.data[0]["pop"] = maxExc * fluorescenceValue;
    this.data[1]["pop"] = 1 - this.data[0]["pop"]
    if (redraw) {
      this.redrawBars()
    }
  }

  protected redrawBars() {
    // update the bars
    this.plotGroup.selectAll(".bar")
      .data(this.data)
      //.attr("x", 0 )
      .attr("y", (d: object) => this.yScale(d["state"]))
      .attr("width", (d: object) => this.xScale(d["pop"]))
  }

}
