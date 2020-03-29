import {
  xml,
  select
} from 'd3';

import Model from './model'

export default function addImage() {
  xml("data/LIF.svg")
    .then(data => {
      select("div#svg-container").node().append(data.documentElement)
      select("#laser-beam")
        .style("opacity", 1)
      select("#time-slider")
        .on("input", setOpacity)
    })

  function setOpacity() {
    console.log(this.value)
    console.log(Model.laserProfile(this.value))
    const opacity = Model.laserProfile(this.value)
    select("#laser-beam")
      .style("opacity", +opacity)
  }
}
