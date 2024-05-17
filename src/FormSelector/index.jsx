/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css"
// eslint-disable-next-line react/prop-types

const FormSelector = ({ result,selectForm,setSelectForm }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCount = 4;

  const handleFormSelect = (form) => {
    setSelectForm(form);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!result) {
    return null;
  }
  let formsToShow = result.available_forms;
  if (!isExpanded) {
    formsToShow = formsToShow.slice(0, visibleCount);
  }
  return (
    <div className="flex mb-1">
      <h4 className="mb-2 w-32 px-1 mr-1 ">Form:</h4>
      <div className="grid grid-cols-2 gap-2">
        {formsToShow.map((form, index) => (
          
          <button
            key={index}
            onClick={() => handleFormSelect(form)}
            disabled={!result.salt_forms_json[form]}
            className={`border-2 rounded-lg px-3 py-2 text-sm  
            ${selectForm === form ? 
              ' font-bold bg-white text-green-800 border-green-900 shadow-2xl shadow-green-900' : 'bg-white text-gray-500 font-medium '} 
              ${result.salt_forms_json[form] ? 'border-solid' : ''}`}>
            {form}
          </button>
        ))}
        
      </div>
      {!isExpanded && result.available_forms.length > visibleCount && (
          <button
            onClick={toggleExpanded}
            className=" mt-12 px-2 text-blue-900 text-sm font-semibold"
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

export default FormSelector;
