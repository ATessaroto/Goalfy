import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/Table";
import style from'./index.css';
function App() {


  return (
    <div className="App">
      <Navbar/>
      <div className={style.pageBody}>
        <Table/>
      </div>
    </div>
  );
}

export default App;
