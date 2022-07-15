import countryList from "iso-3166-country-list";

export const itemState = [
  "Filled",
  "Vacant",
  "Process/Close",
  "Open",
  "Pending",
  "Remove",
];

export const statusDisplay = [
  "Permanent",
  "Provisional",
  "Temporary",
  "Substitute",
  "Co-terminous",
  "Casual",
  "Contractual",
  "Job Order",
];

export const svcStatusDisplay = [
  "In Service",
  "Transferred",
  "Retired",
  "Resigned",
  "Rationalized",
  "End of Contract",
  "Deceased",
  "Drop from Rolls",
  "Awol",
];

export const civilStatusDisplay = {
  SG: "Single",
  MR: "Married",
  WD: "Widowed",
  SP: "Separated",
  OT: "Others",
};

export const getCitizenDisplay = (isFilipino, isDual, iso) => {
  if (isFilipino === 0) return countryList.name(iso) ?? "";

  if (isDual === 0) return "Filipino";

  if (isDual === 1) return "Filipino by Birth / " + countryList.name(iso) ?? "";

  if (isDual === 2)
    return "Filipino by Neutralization / " + countryList.name(iso) ?? "";

  return null;
};
