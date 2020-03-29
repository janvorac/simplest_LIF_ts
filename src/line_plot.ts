import {
  max,
  min,
  line
} from 'd3'
import PlotMaker from './plot'

export default class LinePlot extends PlotMaker{
  public constructor(data: Array<object>){
    super(data, "#line-plot-container", 500, 200)
    this.timeValue = (d: object): number => d["time"];
    this.laserValue = (d: object): number => d["laserProf"];
    this.fluorescenceValue = (d: object): number => d["fluorescence"];
    this.drawAxes(
      min(this.data, this.timeValue), max(this.data, this.timeValue),
      min(this.data, this.laserValue), max(this.data, this.laserValue)
    );
    this.drawLines();
    this.axLabels("time [ns]", "relative # of photons");
  }

  protected drawLines(): void {
    // Laser profile line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("laserProf", true)
      .datum(this.data)
      .attr("fill", "none")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(this.laserValue(d)))
      )

    this.plotGroup.append("text")
      .attr("text-anchor", "start")
      .classed("laserProfLabel", true)
      .attr("x", 55)
      .attr("y", this.height * 0.9)
      .text("Laser pulse")

    // Fluorescence line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("fluo", true)
      .datum(this.data)
      .attr("fill", "none")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(this.fluorescenceValue(d)))
      )

    this.plotGroup.append("text")
      .attr("text-anchor", "start")
      .classed("fluoLabel", true)
      .attr("x", 80)
      .attr("y", this.height * 0.25)
      .text("Fluorescence")

    //time marker
    this.plotGroup.append("path")
      .classed("timeMarker", true)
      .classed("chartLine", true)
      .datum([{ time: 3.52, fluorescence: 0 }, { time: 3.52, fluorescence: 1 }])
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(this.fluorescenceValue(d)))
      )
  }


}
