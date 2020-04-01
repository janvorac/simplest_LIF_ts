import {
  max,
  min,
  scaleLinear,
  line
} from 'd3'
import PlotMaker from './plot_abstract'

export default class LinePlot extends PlotMaker {
  public constructor(data: Array<object>) {
    super(data, "#line-plot-container", 500, 200)
    this.timeValue = (d: object): number => d["time"];
    this.laserValue = (d: object): number => d["laserProf"];
    this.fluorescenceValue = (d: object): number => d["fluorescence"];
    this.createScales(
      min(this.data, this.timeValue), max(this.data, this.timeValue),
      min(this.data, this.laserValue), max(this.data, this.laserValue)
    );
    this.drawAxes();
    this.drawLines();
    this.axLabels("time [ns]", "relative # of photons");
  }

  protected createScales(
    xDomainStart: number,
    xDomainEnd: number,
    yDomainStart: number,
    yDomainEnd: number
  ): void {
    this.xScale = scaleLinear()
      .domain([xDomainStart, xDomainEnd])
      .range([0, this.width]);

    this.yScale = scaleLinear()
      .domain([yDomainStart, yDomainEnd])
      .range([this.height, 0]);
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


  }

  public addTimeMarker(time: number = 3.52) {
    //time marker
    this.plotGroup.append("path")
      .classed("timeMarker", true)
      .classed("chartLine", true)
      .datum([{ time: 3.52, fluorescence: 0 }, { time: time, fluorescence: 1 }])
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(this.fluorescenceValue(d)))
      )
  }


}
