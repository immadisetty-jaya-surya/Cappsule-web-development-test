import FormSelector from "../FormSelector";
import PackingSelector from "../PackingSelector";
import StrengthSelector from "../StrengthSelector";
import ResultsDisplay from "../ResultsDisplay";
import { useState,useEffect } from "react";

export const Result = ({ result }) => {
  const [form, setForm] = useState(() => result.most_common.Form);
  const [selectedStrength, setSelectedStrength] = useState(()=> result.most_common.Strength);
  const [selectedPackaging, setSelectedPackaging] = useState(()=> result.most_common.Packing);
  return (
    <>
      <div>
        <FormSelector
          result={result}
          selectForm={form}
          setSelectForm={setForm}
        />
        <StrengthSelector
          result={result}
          selectedForm={form}
          selectedStrength={selectedStrength}
          setSelectedStrength={setSelectedStrength}
        />
        <PackingSelector
          result={result}
          selectedForm={form}
          selectedStrength={selectedStrength}
          selectedPacking={selectedPackaging}
          setSelectedPacking={setSelectedPackaging}
        />
      </div>
      <div className="flex items-center ml-8">
        <ResultsDisplay
          result={result}
          selectedForm={form}
          selectedStrength={selectedStrength}
          selectedPacking={selectedPackaging}
          className="justify-between"
        />
      </div>
    </>
  );
};
