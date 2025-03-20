import { model, Schema } from "mongoose";

const citySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false, 
    default: null   
  }
});

const stateSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cities: [citySchema] //it contains array of cities
});

const countrySchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true // id should be unique
  },
  country: {
    type: String,
    required: true
  },
  states: [stateSchema] //array of state objects
})


const Country = new model("Country", countrySchema);
export default Country;
