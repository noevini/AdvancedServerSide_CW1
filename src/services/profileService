const profileRepository = require("../repositories/profileRepository");

const profileService = {
  getMyProfile: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  },

  createProfile: async (userId, fullName, biography, linkedinUrl, imageUrl) => {
    const existingProfile = await profileRepository.findByUserId(userId);

    if (existingProfile) {
      throw new Error("Profile already exists for this user");
    }

    const newProfile = await profileRepository.createProfile(
      userId,
      fullName,
      biography,
      linkedinUrl,
      imageUrl,
    );

    return newProfile;
  },
};

module.exports = profileService;
