const LanguageCode = require("../models/languageCode.model");

exports.createLanguageCode = async (req, res) => {
  try {
    const { title, language, sourceCode, input, isPublic } = req.body;

    if (!title || !language || !sourceCode) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const code = await LanguageCode.create({
      title,
      language,
      sourceCode,
      input,
      isPublic,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      id: code._id,
    });
  } catch (error) {
    console.error("CREATE LANGUAGE CODE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.saveLanguageCode = async (req, res) => {
  try {
    const { title, language, sourceCode, input, isPublic } = req.body;

    if (!language || !sourceCode) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const saved = await LanguageCode.create({
      title,
      language,
      sourceCode,
      input,
      isPublic,
      owner: req.user._id,
      ownerName: req.user.username,
    });

    res.status(201).json({
      success: true,
      id: saved._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Save failed", error: err.message });
  }
};

exports.getLanguageCode = async (req, res) => {
  try {
    const { id } = req.params;

    const code = await LanguageCode.findById(id);
    if (!code) {
      return res.status(404).json({ message: "Code not found" });
    }

    code.views += 1;
    await code.save();

    res.json({ success: true, code });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

exports.updateLanguageCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, language, sourceCode, input, isPublic } = req.body;

    const code = await LanguageCode.findById(id);

    if (!code) {
      return res.status(404).json({
        success: false,
        message: "Code not found",
      });
    }

    /* 🔒 owner check */
    if (code.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this code",
      });
    }

    /* update fields */
    if (title !== undefined) code.title = title;
    if (language !== undefined) code.language = language;
    if (sourceCode !== undefined) code.sourceCode = sourceCode;
    if (input !== undefined) code.input = input;
    if (isPublic !== undefined) code.isPublic = isPublic;

    await code.save();

    res.status(200).json({
      success: true,
      message: "Code updated successfully",
      code,
    });
  } catch (error) {
    console.error("UPDATE LANGUAGE CODE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getMyLanguageCodes = async (req, res) => {
  try {
    const codes = await LanguageCode.find({
      owner: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select("_id title language sourceCode ownerName views createdAt");

    res.status(200).json({
      success: true,
      data: codes,
    });
  } catch (error) {
    console.error("GET MY LANGUAGE CODES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load saved editor codes",
    });
  }
};
