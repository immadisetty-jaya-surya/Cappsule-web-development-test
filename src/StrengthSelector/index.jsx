/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from "react";
import clsx from "clsx";

// eslint-disable-next-line react/prop-types
const visibleCount = 4;
const StrengthSelector = ({
  result,
  selectedForm,
  selectedStrength,
  setSelectedStrength,
}) => {
  const [filteredStrengths, setFilteredStrengths] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (result && result.salt_forms_json && selectedForm) {
      const formStrengths = result.salt_forms_json[selectedForm];
      if (formStrengths) {
        const strengths = Object.keys(formStrengths);
        setFilteredStrengths(strengths);
      } else {
        setFilteredStrengths([]);
      }
    }
  }, [result, selectedForm]);

  const handleStrengthSelect = (strength) => {
    setSelectedStrength(strength);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const calculateStrengthAvailability = useCallback(
    (strength) => {
      if (!result || !selectedForm || !strength) {
        return false;
      }
      const formStrengths = result.salt_forms_json[selectedForm];
      if (!formStrengths) {
        return false;
      }
      const availabilityObject = formStrengths[strength];

      const availablePackings = Object.entries(availabilityObject ?? {});

      // eslint-disable-next-line no-unused-vars
      for (const [_pack, availability] of availablePackings) {
        // eslint-disable-next-line no-unused-vars
        for (const [_, seller] of Object.entries(availability)) {
          if (seller) {
            return true;
          }
        }
      }
    },
    [result, selectedForm]
  );

  const strengthsToShow = useMemo(() => {
    if (!isExpanded) {
      return filteredStrengths.slice(0, visibleCount);
    }
    return filteredStrengths;
  }, [filteredStrengths, isExpanded]);

  if (!result || !selectedForm) {
    return null;
  }

  return (
    <div className="flex mb-1">
      <h4 className="mb-2 w-32 px-1 mr-1 ">Strength:</h4>
      <div className="grid grid-cols-2 gap-2">
        {strengthsToShow.map((strength, index) => {
          const isAvailable = calculateStrengthAvailability(strength);
          return (
            <button
              key={index}
              onClick={() => handleStrengthSelect(strength)}
              disabled={selectedStrength === strength}

              className={clsx(`border-2 rounded-lg px-5 py-2 text-sm`, {
                "font-bold bg-white text-green-800 border-green-900 shadow-2xl shadow-green-900":
                  selectedStrength === strength,
                "bg-white text-gray-500 font-medium":
                  selectedStrength !== strength,
                "border-solid": isAvailable,
                "border-dashed": !isAvailable,
              })}
            
            >
              {strength}
            </button>
          );
        })}
      </div>
      {!isExpanded && filteredStrengths.length > visibleCount && (
        <button
          onClick={toggleExpanded}
          className="mt-12 px-2 text-blue-900 text-sm font-semibold"
        >
          more..
        </button>
      )}
      {isExpanded && (
        <button
          onClick={toggleExpanded}
          className="mt-24 px-2 text-blue-900 text-sm font-semibold"
        >
          hide..
        </button>
      )}
    </div>
  );
};

export default StrengthSelector;
