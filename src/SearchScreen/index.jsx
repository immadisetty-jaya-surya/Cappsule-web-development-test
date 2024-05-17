import axios from "axios";
import { useCallback, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Result } from "../Result";

const SearchScreen = () => {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);

  const onSearch = (event) => {
    setSearchWord(event.target.value);
  };

  const handleSearch = useCallback(async () => {
    if (searchWord.trim()) {
      try {
        const resp = await axios.get(
          `https://backend.cappsule.co.in/api/v1/new_search?q=${searchWord}&pharmacyIds=1,2,3`
        );
        console.log(resp.data.data.saltSuggestions);
        setResults(resp.data.data.saltSuggestions);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    }
  }, [searchWord]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative mt-24 flex flex-col items-center w-full">
      <div className="border w-[1250px] border-gray-400 rounded-3xl flex items-center">
        <FontAwesomeIcon icon={faSearch} className="p-4 mr-2" />
        <input
          type="text"
          value={searchWord}
          onChange={onSearch}
          placeholder="Type your medicine name here"
          className=" outline-none flex-grow"
          onKeyDown={onKeyPress}
        />
        <button
          className="text-cyan-600 text-sm font-semibold mx-8"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className=" w-[1350px] h-[1px] my-6 mx-auto bg-gray-400"></div>
      <div className="flex flex-col items-center w-full justify-between">
        {results.length === 0 && (
          <div className="flex w-[300px] mx-auto text-center">
            Find medicines in amazing discount
          </div>
        )}
        {results.length > 0 &&
          results.map((result, index) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div
                key={index}
                className="flex rounded-2xl shadow-lg p-8 w-10/12 mb-10 bg-gradient-to-r from-white to-green-50"
              >
                <Result result={result} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchScreen;
