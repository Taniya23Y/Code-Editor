const sharedCodeModel = require("../models/sharedCode.model");

exports.saveSharedCode = async (req, res) => {
  try {
    const { shareId, language, sourceCode, input } = req.body;

    if (!shareId || !language || !sourceCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const saved = await sharedCodeModel.create({
      shareId,
      language,
      sourceCode,
      input,
    });

    res.status(201).json({
      success: true,
      shareId: saved.shareId,
    });
  } catch (err) {
    res.status(500).json({ message: "Save failed", error: err.message });
  }
};

exports.getSharedCode = async (req, res) => {
  try {
    const { shareId } = req.params;

    const code = await SharedCode.findOne({ shareId });
    if (!code) return res.status(404).json({ message: "Code not found" });

    res.json(code);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};
