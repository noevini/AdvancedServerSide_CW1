const profileService = require("../services/profileService");

const profileController = {
  getMyProfile: async (req, res) => {
    try {
      const userId = req.user.userId;

      const profile = await profileService.getMyProfile(userId);

      return res.status(200).json(profile);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  createProfile: async (req, res) => {
    try {
      const userId = req.user.userId;

      const { full_name, biography, linkedin_url, image_url } = req.body;

      const profile = await profileService.createProfile(
        userId,
        full_name,
        biography,
        linkedin_url,
        image_url,
      );

      return res.status(201).json({
        message: "Profile created successfully",
        profile,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = profileController;
