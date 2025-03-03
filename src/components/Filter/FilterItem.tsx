import { useEffect, useState } from "react";
import AutocompleteFilter from "./FilterInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Search } from "lucide-react";
import { getFilteredFilmesAsync } from "../../store/slices/userSlice";

interface FilterItemProps {
  selectedYear: string | null;
  setSelectedYear: (value: string | null) => void;
  selectedActor: string | null;
  setSelectedActor: (value: string | null) => void;
  selectedGenre: string | null;
  setSelectedGenre: (value: string | null) => void;
  selectedLanguage: string | null;
  setSelectedLanguage: (value: string | null) => void;
  searchTitle: string;
  setSearchTitle: (value: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  selectedYear,
  setSelectedYear,
  selectedActor,
  setSelectedActor,
  selectedGenre,
  setSelectedGenre,
  selectedLanguage,
  setSelectedLanguage,
  searchTitle,
  setSearchTitle,
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.user.token);
  const metadata = useAppSelector((store) => store.user.metadata?.data);

  const [years, setYears] = useState<string[]>([]);
  const [actors, setActors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);



  useEffect(() => {
    if (metadata) {
      setYears(metadata.years?.map((year: number) => year.toString()) || []);
      setActors(metadata.actors || []);
      setGenres(metadata.genres || []);
      setLanguages(metadata.languages || []);
    }
  }, [metadata]);

  const handleSearch = () => {
    dispatch(
      getFilteredFilmesAsync({
        token: token,
        filters: {
          year: selectedYear ? parseInt(selectedYear) : undefined,
          genres: selectedGenre ? encodeURIComponent(selectedGenre) : undefined,
          actor: selectedActor ? encodeURIComponent(selectedActor) : undefined,
          language: selectedLanguage
            ? encodeURIComponent(selectedLanguage)
            : undefined,
          title: searchTitle ? encodeURIComponent(searchTitle) : undefined,
          page: 1,
        },
      })
    );
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4 p-4 mt-5 mb-10">
      <div className="flex items-center gap-2 w-full bg-white rounded-xl p-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 w-full rounded-xl">
        <p className="font-bold text-lg sm:text-xl shrink-0">Filter:</p>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <AutocompleteFilter
            id="year-filter"
            options={years}
            label="Year"
            onChange={setSelectedYear}
          />
          <AutocompleteFilter
            id="actor-filter"
            options={actors}
            label="Actors"
            onChange={setSelectedActor}
          />
          <AutocompleteFilter
            id="genres-filter"
            options={genres}
            label="Genres"
            onChange={setSelectedGenre}
          />
          <AutocompleteFilter
            id="languages-filter"
            options={languages}
            label="Languages"
            onChange={setSelectedLanguage}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
