import Card from "../components/Card";
import FilterSidebar from "../components/FilterSidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function App() {
  return (
    <div className="w-full min-h-screen">
      <div className="container px-10 mx-auto">
        <Navbar />
        <div className="flex flex-row py-10">
          <section className="flex px-[120px]">
            <FilterSidebar />
          </section>
          <section className="flex flex-col space-y-10">
            <SearchBar />
            <Card />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
