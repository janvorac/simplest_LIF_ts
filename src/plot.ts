import {
  select,
  max,
  min,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  Axis
} from './d3.min.js'

export default class plotMaker{
  protected container: Selection<SVGGElement, null, null, null>;
  protected plotGroup: Selection<SVGGElement, null, SVGElement, null>;
  protected yAxis: Axis<number>;
  protected xAxis: Axis<number>;
  protected margin: object;
  protected width: number;
  protected height: number;

  public constructor(data: Array<object>){
    this.margin = {
      top: 10,
      right: 30,
      bottom: 40,
      left: 60
    };
    this.container = select("#plot-container")
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 200 - this.margin.top - this.margin.bottom;

    this.plotGroup = this.container.append("g")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)

    const timeValue = (d: number): number => d.time;
    const laserValue = (d: number): number => d.laserProf;
    const fluorescenceValue = (d: number): number => d.fluorescence;

    const xScale = scaleLinear()
      .domain([min(data, timeValue), max(data, timeValue)])
      .range([0, this.width]);

    const yScale = scaleLinear()
      .domain([min(data, laserValue), max(data, intensityValue)])
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
      .attr("stroke", "steelblue")
      .attr("d", line()
        .x(d => xScale(timeValue(d)))
        .y(d => yScale(laserValue(d)))
      )

    // Fluorescence line
    this.plotGroup.append("path")
      .classed("chartLine", true)
      .classed("fluo", true)
      .datum(fluoData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("d", line()
        .x(d => xScale(timeValue(d)))
        .y(d => yScale(fluorescenceValue(d)))
      )

  }


}
