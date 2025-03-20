// import countriesData from "./allData.js"
// const saveData = async (req, res) => {
//   try {
//     await Country.deleteMany({});
//     const allCountryData = [];

//     for (const individualData of countriesData) {
//       try {
//         const newContry = new Country(individualData);
//         const savedCountry = await newContry.save();
//         allCountryData.push(savedCountry);
//       } catch (error) {
//         return console.log("Error in fecthing");
//       }
//     }
//     res.status(200).json({
//       msg: allCountryData,
//     });
//   } catch (error) {
//     return res.status(500).json("Unav=ble to fetch data");
//   }
// };

import Country from "../model/countrySchema.js";
import { Form } from "../model/formSchema.js";

const allData = async (req, res) => {
  try {
    const data = await Country.find({});
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeData = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age,
    } = req.body;

    const saveData= await Form.create(req.body);


  } catch (error) {
    console.log(error);
    
  }
};

export default { allData, storeData };
