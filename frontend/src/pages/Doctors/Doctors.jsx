import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from '../../components/Loader/Loading';
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [query, setQuery] = useState('');         // State for input query
  const [debounceQuery, setDebounceQuery] = useState("");   // Debounced query for filtering

  const handleSearch = () => {
    setQuery(query.trim());
    console.log("handle search", query);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);    // Update debounced query after delay
    }, 700);

    return () => {
      clearTimeout(timeout);   // Clear timeout on query change or unmount
    };
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);  // Fetch all doctors

  // Function to filter and highlight matching part of doctors' names
  const highlightMatch = (name, query) => {
    if (!query) return name;

    const parts = name.split(new RegExp(`(${query})`, 'gi'));  // Split name based on query (case-insensitive)
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-300">{part}</span>   // Highlight matching part in yellow
          ) : (
            part   // Non-matching parts remain normal
          )
        )}
      </>
    );
  };

  // Filter doctors based on the query
  const filterDoctors = (doctors, query) => {
    if (!query) {
      return doctors;   // If no query, return all doctors
    }

    return doctors.filter((doctor) => {
      const doctorName = doctor.name.toLowerCase();    // Convert doctor name to lowercase for case-insensitive comparison
      return doctorName.includes(query.toLowerCase()); // Check if doctor name includes the query
    });
  };

  const filteredDoctors = doctors ? filterDoctors(doctors, debounceQuery) : [];

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading"> Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specification"
              value={query}   // Controlled input
              onChange={e => setQuery(e.target.value)}   // Update query as user types
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={() => handleSearch()}>
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={{
                  ...doctor,
                  name: highlightMatch(doctor.name, debounceQuery)   // Highlight matching part of the name
                }} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
