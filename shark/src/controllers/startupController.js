const { getDocs, collection, addDoc } = require("firebase/firestore");
const { db } = require("../firebase/config");

const startupCollection = collection(db, "startups");

exports.getAllStartups = async (req, res) => {
  try {
    const data = await getDocs(startupCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getByTag = async (req, res) => {
//     const startups = await ;
//     res.render('startups', { startups });
//   };


exports.createStartup = async (req, res) => {
  const { Name, Description, Founder, Valuation, Tag } = req.body;
  try {
    await addDoc(startupCollection, {
      Name,
      Description,
      Founder,
      Valuation,
      Tag,
      userId: req.user.uid,
    });
    res.json({ message: "Startup created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};