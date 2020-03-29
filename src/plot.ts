import {
  select,
  max,
  min,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  Axis
} from 'd3'

export default class plotMaker{
  //protected container: Selection<SVGGElement, null, null, null>;
  //protected plotGroup: Selection<SVGGElement, null, SVGElement, null>;
  protected container: any;
  protected plotGroup: any;
  protected yAxis: Axis<number>;
  protected xAxis: Axis<number>;
  protected margin: object;
  protected width: number;
  protected height: number;
  public data: Array<object>;

  public constructor(data: Array<object>){
    this.margin = {
      top: 10,
      right: 30,
      bottom: 40,
      left: 60
    };
    this.data = data;
    this.container = select("#plot-container")
    this.width = 500 - this.margin["left"]- this.margin["right"];
    this.height = 200 - this.margin["top"] - this.margin["bottom"];

    this.plotGroup = this.container.append("g")
      .attr("transform", `translate(${this.margin["left"]}, ${this.margin["top"]})`)

    const timeValue = (d: object): number => d["time"];
    const laserValue = (d: object): number => d["laserProf"];
    const fluorescenceValue = (d: object): number => d["fluorescence"];

    const xScale = scaleLinear()
      .domain([min(data, timeValue), max(data, timeValue)])
      .range([0, this.width]);

    const yScale = scaleLinear()
      .domain([min(data, laserValue), max(data, laserValue)])
      .range([this.height, 0]);

    const xAxis = this.plotGroup.append("g")
      .call(axisBottom(xScale))
      .attr("transform", `translate(0,${this.height})`)

    const yAxis = this.plotGroup.append("g")
      .call(axisLeft(yScale))

    // Laser profile line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("laserProf", true)
      .datum(data)
      .attr("fill", "none")
      .attr("d", line()
        .x(d => xScale(timeValue(d)))
        .y(d => yScale(laserValue(d)))
      )

    this.plotGroup.append("text")
      .attr("text-anchor", "start")
      .classed("laserProfLabel", true)
      .attr("x", 20)
      .attr("y", this.height*0.8)
      .text("Laser pulse")

    // Fluorescence line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("fluo", true)
      .datum(data)
      .attr("fill", "none")
      .attr("d", line()
        .x(d => xScale(timeValue(d)))
        .y(d => yScale(fluorescenceValue(d)))
      )

    this.plotGroup.append("text")
      .attr("text-anchor", "start")
      .classed("fluoLabel", true)
      .attr("x", 50)
      .attr("y", this.height*0.25)
      .text("Fluorescence")



  }


}
