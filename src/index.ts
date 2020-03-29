import plotMaker from './plot'
import Model from './model'
import addImage from './add_image'

const model = new Model(0, 200)

const pMaker = new plotMaker(model.data)

addImage();
