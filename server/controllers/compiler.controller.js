const Code = require("../models/code.model");

const saveCode = async (req, res) => {
  try {
    const { fullCode, title, description, isPublic } = req.body;

    if (!fullCode?.html && !fullCode?.css && !fullCode?.javascript) {
      return res.status(400).json({ message: "Code cannot be blank!" });
    }

    const newCode = await Code.create({
      title,
      description,
      fullCode,
      isPublic,
      owner: req.user._id,
      ownerName: req.user.username,
    });

    return res.status(201).json({
      message: "Code saved successfully",
      data: newCode,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error saving code",
      error,
    });
  }
};

const loadCode = async (req, res) => {
  try {
    const { urlId } = req.body;

    const code = await Code.findById(urlId);
    if (!code) {
      return res.status(404).json({ message: "Code not found" });
    }

    let isOwner = false;
    if (req.user && String(code.owner) === String(req.user._id)) {
      isOwner = true;
    }

    // increase views
    code.views += 1;
    await code.save();

    return res.status(200).json({
      code,
      isOwner,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error loading code",
      error,
    });
  }
};

const deleteCode = async (req, res) => {
  try {
    const { id } = req.params;

    const code = await Code.findById(id);
    if (!code) {
      return res.status(404).json({ message: "Code not found!" });
    }

    if (String(code.owner) !== String(req.user._id)) {
      return res.status(403).json({
        message: "You don't have permission to delete this code!",
      });
    }

    await Code.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Code deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting code!",
      error,
    });
  }
};

const editCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullCode, title, description, isPublic } = req.body;

    const code = await Code.findById(id);
    if (!code) {
      return res.status(404).json({ message: "Code not found!" });
    }

    if (String(code.owner) !== String(req.user._id)) {
      return res.status(403).json({
        message: "You don't have permission to edit this code!",
      });
    }

    if (fullCode) code.fullCode = fullCode;
    if (title) code.title = title;
    if (description !== undefined) code.description = description;
    if (isPublic !== undefined) code.isPublic = isPublic;

    await code.save();

    return res.status(200).json({
      message: "Code updated successfully!",
      data: code,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error editing code!",
      error,
    });
  }
};

const getAllCodes = async (_req, res) => {
  try {
    const allCodes = await Code.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .select("-fullCode");

    return res.status(200).json(allCodes);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching all codes!",
      error,
    });
  }
};

const getMyCodes = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const myCodes = await Code.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: myCodes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user codes",
      error,
    });
  }
};

module.exports = {
  saveCode,
  loadCode,
  deleteCode,
  editCode,
  getAllCodes,
  getMyCodes,
};
