import plotMaker from './plot'
import Model from './model'

const model = new Model(0,200)

console.log(model.data)

const pMaker = new plotMaker(model.data)
