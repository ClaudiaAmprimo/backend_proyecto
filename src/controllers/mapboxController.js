import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const getMapboxToken = (req, res) => {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(500).json({ message: 'Mapbox token not found' });
  }
};

export const geocodeLocation = async (req, res) => {
  const { location } = req.query;
  const token = process.env.MAPBOX_ACCESS_TOKEN;

  if (!location) {
    return res.status(400).json({ message: 'Location is required' });
  }

  try {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error geocoding location', error: error.message });
  }
};
