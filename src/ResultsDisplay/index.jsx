/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const ResultDisplay = ({
  result,
  selectedForm,
  selectedStrength,
  selectedPacking,
}) => {
  console.log("result", result);

  if (!result) {
    return null;
  }

  const getPrice = (value) => {
    console.log(value);
    const validIds = Object.entries(value).filter(
      ([product_id, data]) => data !== null && Array.isArray(data)
    );
    if (validIds.length === 0 || validIds.every(([id, data]) => data === null)) {
      return <p className="border-2 border-green-100 rounded-md bg-white text-center text-lg align-middle font-medium">No stores selling this product near you</p>;
    }
    const allPrices = validIds.flatMap(([id, data]) => data.map((item) => item.selling_price));
    const lowestPrice = Math.min(...allPrices);
    return (
      <div className="flex font-extrabold text-3xl text-center align-middle">
        <p>From &#8377;</p>
        <p>{lowestPrice}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-between">
        <div key={result.id} className=" grid grid-rows-2 mx-10">
          <h3 className="text-center content-end text-sm">{result.salt}</h3>
          <p className=" text-center text-sm">
            {selectedForm} | {selectedStrength} | {selectedPacking}
          </p>
        </div>
      {
          <div className="mx-16 p-6">
            {result.salt_forms_json[selectedForm]?.[selectedStrength]?.[selectedPacking] ? 
              (getPrice(result.salt_forms_json[selectedForm]?.[selectedStrength]?.[selectedPacking])) : 
              (<p className="border-2 border-green-100 rounded-md bg-white text-center text-lg align-middle font-medium">No stores selling this product near you</p>)}
          </div>
        }
    </div>
  );
};

export default ResultDisplay;
