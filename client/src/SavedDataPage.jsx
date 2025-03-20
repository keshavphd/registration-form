import React from "react";

const SavedDataPage = ({ data }) => {
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
  } = data;
  console.log("dsf", data);

  const date = new Date(dateOfBirth);
  const newDateString = date.toLocaleDateString();

  return (
    <div className="fixed flex justify-center top-0 w-full bottom-0 left-0 right-0 bg-amber-200">
      <div className="bg-white w-full max-h-screen m-2 rounded-3xl max-w-md p-4">
        <h1 className="text-3xl text-center underline">Submitted Data is</h1>
        <div className="p-5 flex gap-3 text-xl flex-col">
          <p>Name : {`${firstname} ${lastname}`} </p>
          <p>Email : {email}</p>
          <p>Country : {country}</p>
          <p>State : {state}</p>
          <p>City : {city}</p>
          <p>Gender : {gender}</p>
          <p>Date : {newDateString}</p>
          <p>Age : {age}</p>
        </div>
      </div>
    </div>
  );
};

export default SavedDataPage;
