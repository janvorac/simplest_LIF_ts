import plotMaker from './plot'
import Model from './model'

console.log('creating model...')

const model = new Model(0,200)

console.log('model created...')

const pMaker = new plotMaker(model.data)
