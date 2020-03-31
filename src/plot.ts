import {
  select,
  axisBottom,
  axisLeft,
  Axis
} from 'd3'

export default abstract class plotMaker {
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
  protected laserValue: any;
  protected margin: object;
  protected width: number;
  protected height: number;
  public data: Array<object>;

  public constructor(data: Array<object>, containerID: string,
    totalWidth: number, totalHeight: number) {
    this.margin = {
      top: 10,
      right: 30,
      bottom: 45,
      left: 60
    };
    this.data = data;
    this.container = select(containerID)
    this.width = totalWidth - this.margin["left"] - this.margin["right"];
    this.height = totalHeight - this.margin["top"] - this.margin["bottom"];

    this.plotGroup = this.container.append("g")
      .attr(
        "transform",
        `translate(${this.margin["left"]}, ${this.margin["top"]})`
      )
      .classed("plotGroup", true)
  }



  protected drawAxes(): void {
    this.xAxis = this.plotGroup.append("g")
      .call(axisBottom(this.xScale))
      .attr("transform", `translate(0,${this.height})`)

    this.yAxis = this.plotGroup.append("g")
      .call(axisLeft(this.yScale))
  }

  protected axLabels(xLabel: string, yLabel: string): void {
    // y-axis label
    this.plotGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin["left"])
      .attr("x", 0 - (this.height / 2))
      .attr("dy", "0.8em")
      .style("text-anchor", "middle")
      .text(yLabel);

    // x-axis label
    this.plotGroup.append("text")
      .attr("transform",
        "translate(" + (this.width / 2) + " ," +
        (this.height + this.margin["top"] + 30) + ")")
      .style("text-anchor", "middle")
      .text(xLabel);
  }
}
