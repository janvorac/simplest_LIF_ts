import LinePlot from './line_plot'
import BarPlot from './bar_plot'
import Model from './model'
import {
  xml,
  select,
  line
} from 'd3';

const model = new Model(0, 70)
//console.log(model.data)
const linePlotMaker = new LinePlot(model.data)

const barPlotMaker = new BarPlot(model.data)

xml("data/LIF.svg")
  .then(data => {
    select("div#svg-container").node().append(data.documentElement)
    select("#laser-beam")
      .style("opacity", 1)
    select("#time-slider")
      .on("input", setTime)
  })

function setTime(value?: number): void {
  //const laserOpacity = Model.laserProfile(this.value)
  const laserOpacity = model.data[this.value]["laserProf"]
  select("#laser-beam")
    .style("opacity", +laserOpacity)
  const fluoOpacity = model.data[this.value]["fluorescence"]
  select("#fluorescence")
    .style("opacity", +fluoOpacity)

  const time = model.data[this.value]["time"]
  linePlotMaker.plotGroup.select(".timeMarker")
    .datum([{time:time, fluorescence:0}, {time:time, fluorescence:1}])
    .attr("d", line()
      .x(d => linePlotMaker.xScale( linePlotMaker.timeValue(d)))
      .y(d => linePlotMaker.yScale( linePlotMaker.fluorescenceValue(d)))
    )
}
