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
  public plotGroup: any;
  protected yAxis: Axis<number>;
  protected xAxis: Axis<number>;
  public xScale: any;
  public yScale: any;
  public timeValue: any;
  public fluorescenceValue: any;
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
      .classed("plotGroup", true)

    this.timeValue = (d: object): number => d["time"];
    const laserValue = (d: object): number => d["laserProf"];
    this.fluorescenceValue = (d: object): number => d["fluorescence"];

    this.xScale = scaleLinear()
      .domain([min(data, this.timeValue), max(data, this.timeValue)])
      .range([0, this.width]);

    this.yScale = scaleLinear()
      .domain([min(data, laserValue), max(data, laserValue)])
      .range([this.height, 0]);

    const xAxis = this.plotGroup.append("g")
      .call(axisBottom(this.xScale))
      .attr("transform", `translate(0,${this.height})`)

    const yAxis = this.plotGroup.append("g")
      .call(axisLeft(this.yScale))

    // Laser profile line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("laserProf", true)
      .datum(data)
      .attr("fill", "none")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(laserValue(d)))
      )

    this.plotGroup.append("text")
      .attr("text-anchor", "start")
      .classed("laserProfLabel", true)
      .attr("x", 55)
      .attr("y", this.height*0.9)
      .text("Laser pulse")

    // Fluorescence line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("fluo", true)
      .datum(data)
      .attr("fill", "none")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(this.fluorescenceValue(d)))
      )

    this.plotGroup.append("text")
      .attr("text-anchor", "start")
      .classed("fluoLabel", true)
      .attr("x", 80)
      .attr("y", this.height*0.25)
      .text("Fluorescence")

    //time marker
    this.plotGroup.append("path")
      .classed("timeMarker", true)
      .classed("chartLine", true)
      .datum([{time:3.52, fluorescence:0}, {time:3.52, fluorescence:1}])
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", line()
        .x(d => this.xScale(this.timeValue(d)))
        .y(d => this.yScale(this.fluorescenceValue(d)))
      )


  }


}
