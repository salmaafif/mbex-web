import Booth from "../models/Booth.js";

const getBooth = async (req, res) => {
  try {
    const booth = await Booth.find();
    res.status(200).json(booth);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booths" });
  }
};

const getBoothById = async (req, res) => {
  try {
    const boothgetid = await Booth.findById(req.params.id);
    res.status(200).json(boothgetid);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booths" });
  }
};

const createBooth = async (req, res) => {
  try {
    const boothcreate = await Booth.create(req.body);
    res.status(201).json(boothcreate);
  } catch (error) {
    console.error("Error create : ", error);
    res.status(500).json({ message: error.message });
  }
};
const selectBooth = async (req, res) => {
  const { boothId } = req.body;
  const userId = req.user.id;

  try {
    const booth = await Booth.findById(boothId);
    const user = await User.findById(userId);

    if (!booth) return res.status(404).json({ message: "Booth not found!" });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // ✅ VALIDASI HOUSE
    if (booth.house !== user.house) {
      return res
        .status(403)
        .json({
          message: `Booth hanya bisa dipilih oleh house ${booth.house}`,
        });
    }

    if (booth.userId) {
      return res.status(400).json({ message: "Booth sudah dipilih!" });
    }

    if (user.selected_booth) {
      return res.status(400).json({ message: "Kamu sudah memilih booth!" });
    }

    booth.userId = userId;
    user.selected_booth = boothId;

    await booth.save();
    await user.save();

    res.status(200).json({ message: "Booth berhasil dipilih!", booth });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBooth = async (req, res) => {
  try {
    const booth = await Booth.findByIdAndUpdate(req.params.id, req.body);
    if (!booth) {
      return res.status(404).json({ message: "booth not found" });
    }
    const updatebooth = await Booth.findById(req.params.id);
    res.status(200).json(updatebooth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBooth = async (req, res) => {
  try {
    const booth = await Booth.findByIdAndDelete(req.params.id, req.body);
    if (!booth) {
      return res.status(404).json({ message: "booth not found" });
    }
    //const updatebooth = await booth.findById(req.params.id)
    res.status(200).json({ message: "already deleted " + booth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getBooth,
  getBoothById,
  createBooth,
  deleteBooth,
  updateBooth,
  selectBooth
};
