import FilmList from "../components/FilmList/FilmList";
import FilterItem from "../components/Filter/FilterItem";
import { useState } from "react";
import ProfileIcon from "../assets/ProfileIcon";
import { useAppSelector } from "../store/hooks";
import LogOutIcon from "../assets/LogOut";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((store) => store.user.userAccount);
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    navigate(routes.LOGIN);
  };
  return (
    <div className="min-h-screen w-full bg-[rgb(236,246,246)] flex flex-col">
      <header className="w-full p-4 flex justify-end items-center gap-4">
        <div
          onClick={toggleModal}
          className="cursor-pointer w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          title="Profile"
        >
          <ProfileIcon />
        </div>
        <div
          onClick={handleLogOutClick}
          className="cursor-pointer w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          title="Log Out"
        >
          <LogOutIcon />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start w-full p-6">
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-2xl font-bold mb-4">User Info</h2>
              <p className="text-gray-700">Name: {user?.name}</p>
              <p className="text-gray-700">Email: {user?._id}</p>
              <button
                onClick={toggleModal}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <FilterItem
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedActor={selectedActor}
          setSelectedActor={setSelectedActor}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
        />

        <FilmList
          selectedYear={selectedYear}
          selectedActor={selectedActor}
          selectedGenre={selectedGenre}
          selectedLanguage={selectedLanguage}
          searchTitle={searchTitle}
        />
      </main>
    </div>
  );
};

export default HomePage;
