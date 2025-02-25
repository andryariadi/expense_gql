import React from "react";

interface GenderRadioProps {
  onRadioChange: (gender: "male" | "female") => void;
  selectedGender: "male" | "female";
  errors?: {
    gender?: {
      message: string;
    };
  };
}

const GENDER_OPTIONS: Array<"male" | "female"> = ["male", "female"];

const GenderRadio: React.FC<GenderRadioProps> = ({ onRadioChange, selectedGender, errors }) => {
  return (
    <>
      <div className="b-sky-400 flex items-center lg:gap-2 xl:gap-5">
        {GENDER_OPTIONS.map((gender) => (
          <div key={gender} className="bg-dark-400 rounded-lg py-3 px-5 lg:px-2 2xl:px-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" className={`accent-logo cursor-pointer ${errors?.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === gender} onChange={() => onRadioChange(gender)} />

              <span className="label-text text-sm text-gray-500">{gender}</span>
            </label>
          </div>
        ))}
      </div>

      {errors?.gender && <span className="text-rose-500 text-xs block mt-2 text-center">Gender {errors.gender.message}</span>}
    </>
  );
};

export default GenderRadio;
