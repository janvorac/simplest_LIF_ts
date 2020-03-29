import plotMaker from './plot'
import Model from './model'
import {
  xml,
  select
} from 'd3';

const model = new Model(0, 200)

const pMaker = new plotMaker(model.data)

xml("data/LIF.svg")
  .then(data => {
    select("div#svg-container").node().append(data.documentElement)
    select("#laser-beam")
      .style("opacity", 1)
    select("#time-slider")
      .on("input", setTime)
  })

function setTime(): void {
  //const laserOpacity = Model.laserProfile(this.value)
  const laserOpacity = model.data[this.value]["laserProf"]
  select("#laser-beam")
    .style("opacity", +laserOpacity)
  const fluoOpacity = model.data[this.value]["fluorescence"]
  select("#fluorescence")
    .style("opacity", +fluoOpacity)
}
