const obatService = require('../services/obatService');

const fetchAndSave = async (req, res) => {
  try {
    const message = await obatService.fetchDataAndSave();
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
};

const getAllObat = (req, res) => {
  obatService.getAllObat((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
};

module.exports = {
  fetchAndSave,
  getAllObat
};
