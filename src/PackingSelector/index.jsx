/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useState, useEffect, useCallback } from "react";

// eslint-disable-next-line react/prop-types
const PackingSelector = ({
  result,
  selectedForm,
  selectedStrength,
  selectedPacking,
  setSelectedPacking,
}) => {
  const [filteredPackings, setFilteredPackings] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCount = 4;

  useEffect(() => {
    if (result && result.salt_forms_json && selectedForm && selectedStrength) {
      const packings = result.salt_forms_json[selectedForm]?.[selectedStrength];
      if (packings) {
        const packingsList = Object.keys(packings);
        setFilteredPackings(packingsList);
      } else {
        setFilteredPackings([]);
      }
    }
  }, [result, selectedForm, selectedStrength]);

  const handlePackingSelect = (packing) => {
    setSelectedPacking(packing);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const isPackingAvailable = useCallback(
    (packing) => {
      const packings = result.salt_forms_json[selectedForm]?.[selectedStrength];
      const sellers = Object.entries(packings?.[packing] ?? {});
      // eslint-disable-next-line no-unused-vars
      for (const [_, sellerPacking] of sellers) {
        if (sellerPacking) {
          return true;
        }
      }
      return false;
    },
    [result.salt_forms_json, selectedForm, selectedStrength]
  );

  if (!result || !selectedForm || !selectedStrength) {
    return null;
  }

  let packingsToShow = filteredPackings;
  if (!isExpanded) {
    packingsToShow = filteredPackings.slice(0, visibleCount);
  }

  return (
    <div className="flex">
      <h4 className="mb-2 w-32 px-1 mr-1">Packaging:</h4>
      <div className="grid grid-cols-2 gap-2">
        {packingsToShow.map((packing, index) => {
          const isAvailable = isPackingAvailable(packing);
          return (
            <button
              key={index}
              onClick={() => handlePackingSelect(packing)}
              disabled={selectedPacking === packing}
              className={clsx(`border-2 rounded-lg px-5 py-2 text-sm`, {
                "font-bold bg-white text-green-800 border-green-900 shadow-2xl shadow-green-900":
                  selectedPacking === packing,
                "bg-white text-gray-500 font-medium":
                  selectedPacking !== packing,
                "border-solid": isAvailable,
                "border-dashed": !isAvailable,
              })}
            >
              {packing}
            </button>
          );
        })}
      </div>
      {!isExpanded && filteredPackings.length > visibleCount && (
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

export default PackingSelector;
