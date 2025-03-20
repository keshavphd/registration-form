import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { allSchema, calculateAge, genderOptions } from "./ZodFile";
import SummaryAPI, { Axios } from "./util/Axios";
import SavedDataPage from "./SavedDataPage";
import Loader from "./util/Loader";

const App = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData,setFormData]= useState()
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedData,setSavedData] = useState(false); 


  const allData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.allData,
      });
      console.log("hikgkgv",res);
      setData(res.data.msg);
      console.log("hi", res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allData();
  }, []);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(allSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      country: "",
      state: "",
      city: "",
    },
  });

  useEffect(() => {
    setCountries(data);
  }, [data]);

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  useEffect(() => {
    if (selectedCountry) {
      const country = countries?.find((c) => c.country === selectedCountry);
      if (country) {
        setStates(country.states);
        setValue("state", "");
        setValue("city", "");
      } else {
        setStates([]);
      }
    } else {
      setStates([]);
      setValue("state", "");
      setValue("city", "");
    }
    setCities([]);
  }, [selectedCountry, countries, setValue]);

  useEffect(() => {
    if (selectedState) {
      const state = states.find((s) => s.name === selectedState);
      if (state) {
        setCities(state.cities);
        setValue("city", "");
      } else {
        setCities([]);
      }
    } else {
      setCities([]);
      setValue("city", "");
    }
  }, [selectedState, states, setValue]);

  const dOB = watch("dateOfBirth");
  const ageTillDate = calculateAge(dOB);

  const onSubmit = async (formData) => {
    const age = calculateAge(formData.dateOfBirth);
    setFormData({ ...formData, age })
    try {
      setShowData(true);

      /// line below this was not essential 
      const saveData = await Axios({
        ...SummaryAPI.storeData,
        data: { ...formData, age },
      });
 //   not essential
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center w-full h-full bg-amber-100">
      <div className="p-1 m-0.5 w-full bg-white lg:max-w-lg rounded-2xl">
        <div className="mt-8 text-3xl font-semibold text-center underline hover:decoration-blue-400">
          Registration form
        </div>
        {loading && (
          <Loader/>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="p-7">
          <label>
            <div className="mt-3"> First Name:</div>
            <input
              type="text"
              {...register("firstname", { required: "Enter a value" })}
              placeholder="Enter your first name"
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
            />
            {errors.firstname && (
              <div className="text-sm text-red-500">
                {errors.firstname.message}
              </div>
            )}
          </label>{" "}
          <label>
            <div className="mt-3">Last Name:</div>
            <input
              type="text"
              {...register("lastname")}
              placeholder="Enter your last name"
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
            />
            {errors.lastname && (
              <div className="text-sm text-red-500">
                {errors.lastname.message}
              </div>
            )}
          </label>{" "}
          <label>
            <div className="mt-3"> Email:</div>
            <input
              type="text"
              {...register("email")}
              placeholder="Enter your email id"
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
            />
            {errors.email && (
              <div className="text-sm text-red-500">{errors.email.message}</div>
            )}
          </label>{" "}
          <label>
            <div className="mt-3"> Country:</div>

            <select
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
              {...register("country")}
            >
              <option value="">Select Country</option>
              {countries?.map((country) => (
                <option key={country.id} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </label>
          <label>
            <div className="mt-3"> State:</div>
            <select
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
              {...register("state")}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </label>
          <label>
            <div className="mt-3"> City:</div>

            <select
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
              {...register("city")}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </label>
          <div className="mt-3"> Gender:</div>
          {genderOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="radio"
                value={option}
                {...register("gender")}
                className="h-8 pl-2 border rounded outline-none border-neutral-300 w-fit focus-within:border-amber-800 bg-blue-50"
              />
              {option}
            </label>
          ))}
          {errors.gender && (
            <div className="text-sm text-red-600">{errors.gender.message}</div>
          )}
          <label>
            <div className="mt-3"> Date of Birth:</div>
            <input
              type="date"
              {...register("dateOfBirth", { required: "DOB is required" })}
              placeholder=""
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
            />
            {errors.dateOfBirth && (
              <div className="text-sm text-red-600">
                {errors.dateOfBirth.message}
              </div>
            )}
          </label>
          <label>
            <div className="mt-3"> Age:</div>
            <input
              type="Number"
              {...register("age")}
              value={ageTillDate}
              readOnly
              className="w-full h-8 pl-2 border rounded outline-none border-neutral-300 focus-within:border-amber-800 bg-blue-50"
            />
          </label>
          <div className="flex gap-5">
            <button
              className={`${
                showData ? "bg-blue-300" : "bg-blue-700"
              }  text-xl px-5 py-2.5 mt-4 my-4 rounded-2xl cursor-pointer text-white`}
              type="submit"
              disabled={isSubmitting || showData}
            >
              Submit
            </button>
            <div>
              {showData && (
                <div onClick={()=>setSavedData(true)} className="bg-blue-700 text-xl px-5 py-2.5 cursor-pointer mt-4 my-4 rounded-2xl text-white">{`View submitted Data-->`}</div>
              )}
            </div>
          </div>
        </form>
      </div>
      {savedData && (<SavedDataPage data={formData}/>)}
    </div>
  );
};

export default App;
