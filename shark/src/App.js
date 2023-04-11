import "./App.css"
import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage} from "./firebase/config";
import {getDocs,collection,addDoc, query,where} from "firebase/firestore"
//import StartupRoutes from "./routes/startupRoutes"
function App(){

  const [StartupList, setStartupList] = useState([])
  const [showAllStartups, setShowAllStartups] = useState(false)

  const [newStartup, setNewStartup] = useState("")
  const [Founder, setFounder] = useState("")
  const [Description, setDescription] = useState("")
  const [StartupTag, setTag] = useState("")
  const [Valuation, setValuation] = useState(0)
  const [selectedTag, setSelectedTag] = useState("");
  const startupCollection = collection(db,"startups")
  const getstartupList = async () => {
    try {
      const data = await getDocs(startupCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStartupList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getstartupList();
  }, []);

  useEffect(() => {
    if (showAllStartups) {
      getstartupList();
    }
  }, [showAllStartups]);

  const getStartupListByTag = async () => {
    try {
      const data = await getDocs(query(collection(db, "startups"), where("Tag", "==", selectedTag)));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStartupList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const showStartupsByTag = () => {
    if (selectedTag !== "") {
      getStartupListByTag();
    } else {
      setShowAllStartups(true);
    }
  };

  const CreateAccount = async () => {
    try {
      await addDoc(startupCollection, {
        Name : newStartup,
        Description : Description,
        Founder: Founder,
        Valuation: Valuation,
        Tag: StartupTag,
        userId: auth?.currentUser?.uid,
      });
      getstartupList();
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <div className="App">
      <Auth/>
  
      <div>
        <input
          placeholder="Startup Name..."
          onChange={(e) => setNewStartup(e.target.value)}
        />
        <input
          placeholder="Startup Description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Startup Founder..."
          onChange={(e) => setFounder(e.target.value)}
        />
        <input
          placeholder="Startup Valuation in Rs..."
          type="number"
          onChange={(e) => setValuation(Number(e.target.value))}
        />
        <input
          placeholder="Tag - tech/pharma/food"
          onChange={(e) => setTag(e.target.value)}
        />

      <select onChange={(e) => setSelectedTag(e.target.value)}>
        <option value="">Select a Tag</option>
        <option value="tech">Tech</option>
        <option value="pharma">Pharma</option>
        <option value="food">Food</option>
      </select>
        
        <div className="button-container">
        <button onClick={CreateAccount}> Create Account</button>
        <button onClick={() => setShowAllStartups(true)}>All Startups</button>
        <button onClick={showStartupsByTag}>Show</button>
        </div>
      </div>

      {showAllStartups && (
        <div>
          <h2>All Startups</h2>
          {StartupList.map((startup) => (
            <div key={startup.id}>
              <h3>{startup.Name}</h3>
              <p>{startup.Description}</p>
              <p>Founder: {startup.Founder}</p>
              <p>Valuation: {startup.Valuation}</p>
              <p>Tag: {startup.Tag}</p>
            </div>
          ))}
        </div>
      )}

{!showAllStartups && (
  <div>
    <h2>Filtered Startups</h2>
    {StartupList.map((startup) => (
      <div key={startup.id}>
        <h3>{startup.Name}</h3>
        <p>{startup.Description}</p>
        <p>Founder: {startup.Founder}</p>
        <p>Valuation: {startup.Valuation}</p>
        <p>Tag: {startup.Tag}</p>
      </div>
    ))}
  </div>
)}
    
    </div>
  )
}
export default App