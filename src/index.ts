import plotMaker from './plot'
import Model from './model'
import {
  xml,
  select,
  line
} from 'd3';

const model = new Model(0, 70)
//console.log(model.data)
const pMaker = new plotMaker(model.data)

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
  pMaker.plotGroup.select(".timeMarker")
    .datum([{time:time, fluorescence:0}, {time:time, fluorescence:1}])
    .attr("d", line()
      .x(d => pMaker.xScale( pMaker.timeValue(d)))
      .y(d => pMaker.yScale( pMaker.fluorescenceValue(d)))
    )
}
