const { gmail } = require('googleapis/build/src/apis/gmail/index.js');
const { encryptToken, decryptToken } = require(`../../encryption.js`);

const addFitbitUser =
  (User) =>
  ({ id, email, firstName, lastName, profilePhoto, dataEncrypt }) => {
    console.log(id, email, firstName, lastName, dataEncrypt);
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: `fitbit`,
      dataEncrypt,
    });
    return user.save();
  };

const addGoogleUser =
  (User) =>
  ({ id, email, firstName, lastName, profilePhoto, dataEncrypt }) => {
    console.log(id, email, firstName, lastName, dataEncrypt);

    const user = new User({
      id,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: `google`,
      dataEncrypt,
    });
    return user.save();
  };

const addLocalUser =
  (User) =>
  ({ id, email, firstName, lastName, profilePhoto, data, password }) => {
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      password,
      profilePhoto,
      data,
      source: `local`,
    });
    return user.save();
  };

const getUsers = (User) => () => {
  return User.find({});
};

const getUserByEmail =
  (User) =>
  async ({ email }) => {
    return await User.findOne({ email });
  };

const getCloudsEnabled = (Clouds) => async () => {
  const _clouds = await Clouds.find({ enabled: true });
  if (_clouds && _clouds.length > 0) {
    return _clouds;
  }
  return [
    {
      name: `default`,
      url: `oracle.cgmsim.com`,
      enabled: true,
    },
  ];
};

const getParamsByEmail =
  (Params) =>
  async ({ email }) => {
    return await Params.findOne({ email });
  };

const removeUserByEmail =
  (User) =>
  async ({ email }) => {
    //console.log("User "+email+ " deleted successfully");
    return await User.deleteOne({ email });
  };

const removeParamsByEmail =
  (Params) =>
  async ({ email }) => {
    //console.log("Params for user "+email+ " deleted successfully");
    return await Params.deleteOne({ email });
  };

// this is for google
const updateAccessToken =
  (User) =>
  async ({ email, access_token }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.data) {
      const oldDataObject = JSON.parse(currentUser.data);
      oldDataObject.access_token = access_token;
      currentUser.data = JSON.stringify(oldDataObject);
      currentUser.save();
    }
  };

const updateNsURL =
  (Params) =>
  async ({ email, nsUrl, apiSecret, nsUnits, timezone }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        nsUrl,
        apiSecret,
        nsUnits,
        timezone,
      });
      params.save();
    } else {
      params.nsUrl = nsUrl;
      params.apiSecret = apiSecret;
      params.nsUnits = nsUnits;
      params.timezone = timezone;
      params.save();
    }
  };

//this is for Fitbit:
  const updateRefreshToken =
  (User) =>
  async ({ email, access_token, refresh_token }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.dataEncrypt) {
      const oldDataObject = JSON.parse(currentUser.dataEncrypt);
      oldDataObject.access_token = access_token;
      oldDataObject.refresh_token = refresh_token;
      currentUser.dataEncrypt = JSON.stringify(oldDataObject);
      currentUser.save();
    }
  };

//this is for Fitbit:
const updateRefreshTokenEncrypted =
  (User) =>
  async ({ email, access_token, refresh_token }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.dataEncrypt) {
      const oldDataObject = JSON.parse(currentUser.dataEncrypt);
      oldDataObject.access_token = encryptToken(access_token);
      oldDataObject.refresh_token = encryptToken(refresh_token);
      currentUser.dataEncrypt = JSON.stringify(oldDataObject);
      currentUser.save();
    }
  };

const updateInitialParams =
  (Params) =>
  async ({
    email,
    email2,
    source,
    nsUrl,
    apiSecret,
    isf,
    cr,
    dia,
    weight,
    height,
    gender,
    age,
    tp,
    carbsAbsTime,
    onOffSwitch,
    pumpEnabled,
    octaves,
    amplitude,
    persistence,
    noiseArray,
    lastUpdate,
    emailCheck,
    surpriseSwitch,
    model,
  }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        email2,
        source,
        nsUrl,
        apiSecret,
        isf,
        cr,
        dia,
        weight,
        height,
        gender,
        age,
        tp,
        carbsAbsTime,
        onOffSwitch,
        pumpEnabled,
        octaves,
        amplitude,
        persistence,
        noiseArray,
        lastUpdate,
        emailCheck,
        surpriseSwitch,
        model,
      });
    } else {
      params.nsUrl = nsUrl;
      params.source = source;
      params.apiSecret = apiSecret;
      params.isf = isf;
      params.cr = cr;
      params.dia = dia;
      params.weight = weight;
      params.height = height;
      params.gender = gender;
      params.age = age;
      params.tp = tp;
      params.carbsAbsTime = carbsAbsTime;
      params.onOffSwitch = onOffSwitch;
      params.pumpEnabled = pumpEnabled;
      params.octaves = octaves;
      params.amplitude = amplitude;
      params.persistence = persistence;
      params.noiseArray = noiseArray;
      params.lastUpdate = lastUpdate;
      params.emailCheck = emailCheck;
      params.surpriseSwitch = surpriseSwitch;
      params.model = model;
      params.email2 = email2;
    }
    return params.save();
  };

const updateParams =
  (Params) =>
  async ({
    email,
    email2,
    source,
    nsUrl,
    apiSecret,
    isf,
    cr,
    dia,
    weight,
    height,
    gender,
    age,
    tp,
    carbsAbsTime,
    onOffSwitch,
    pumpEnabled,
    octaves,
    amplitude,
    persistence,
    noiseArray,
    lastUpdate,
    emailCheck,
    surpriseSwitch,
    model,
  }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        email2,
        source,
        nsUrl,
        apiSecret,
        isf,
        cr,
        dia,
        weight,
        height,
        gender,
        age,
        tp,
        carbsAbsTime,
        onOffSwitch,
        pumpEnabled,
        octaves,
        amplitude,
        persistence,
        noiseArray,
        lastUpdate,
        emailCheck,
        surpriseSwitch,
        model,
      });
    } else {
      params.email2 = email2;
      params.nsUrl = nsUrl;
      params.source = source;
      params.apiSecret = apiSecret;
      params.isf = isf;
      params.cr = cr;
      params.dia = dia;
      params.weight = weight;
      params.height = height;
      params.gender = gender;
      params.age = age;
      params.tp = tp;
      params.carbsAbsTime = carbsAbsTime;
      params.onOffSwitch = onOffSwitch;
      params.pumpEnabled = pumpEnabled;
      params.octaves = octaves;
      params.amplitude = amplitude;
      params.persistence = persistence;
      params.noiseArray = noiseArray;
      params.lastUpdate = lastUpdate;
      params.emailCheck = emailCheck;
      params.surpriseSwitch = surpriseSwitch;
      params.model = model;
    }
    return params.save();
  };

const updateParamsCgmSimModal =
  (Params) =>
  async ({ email, cr, dia, tp, carbsAbsTime, isf, lastUpdate }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        cr,
        dia,
        tp,
        carbsAbsTime,
        isf,
        lastUpdate,
      });
    } else {
      params.isf = isf;
      params.cr = cr;
      params.dia = dia;
      params.tp = tp;
      params.carbsAbsTime = carbsAbsTime;
      params.lastUpdate = lastUpdate;
    }
    return params.save();
  };

const deleteParamsNightscoutModal =
  (Params) =>
  async ({ email }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        email2: '',
        nsUrl: '',
        apiSecret: '',
        lastUpdate: null,
        emailCheck: false,
      });
    } else {
      params.email2 = '';
      params.nsUrl = '';
      params.apiSecret = '';
      params.lastUpdate = null;
      params.emailCheck = false;
    }
    return params.save();
  };
const updateParamsNightscoutModal =
  (Params) =>
  async ({ email, email2, nsUrl, apiSecret, lastUpdate, emailCheck }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        email2,
        nsUrl,
        apiSecret,
        lastUpdate,
        emailCheck,
      });
    } else {
      params.email2 = email2;
      // params.nsUrl = nsUrl;
      params.apiSecret = apiSecret;
      params.lastUpdate = lastUpdate;
      params.emailCheck = emailCheck;
    }
    return params.save();
  };

const updateParamsSubjectModal =
  (Params) =>
  async ({ email, weight, height, gender, age, lastUpdate }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        weight,
        height,
        gender,
        age,
        lastUpdate,
      });
    } else {
      params.weight = weight;
      params.height = height;
      params.gender = gender;
      params.age = age;
      params.lastUpdate = lastUpdate;
    }
    return params.save();
  };

const updateParamsPerlinModal =
  (Params) =>
  async ({
    email,
    octaves,
    amplitude,
    persistence,
    noiseArray,
    lastUpdate,
  }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        octaves,
        amplitude,
        persistence,
        noiseArray,
        lastUpdate,
      });
    } else {
      params.octaves = octaves;
      params.amplitude = amplitude;
      params.persistence = persistence;
      params.noiseArray = noiseArray;
      params.lastUpdate = lastUpdate;
    }
    return params.save();
  };

const updateParamsModelSelectorModal =
  (Params) =>
  async ({ email, model, lastUpdate }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        model,
        lastUpdate,
      });
    } else {
      params.model = model;
      params.lastUpdate = lastUpdate;
    }
    return params.save();
  };

const updateParamsActivationModal =
  (Params) =>
  async ({
    email,
    onOffSwitch,
    pumpEnabled,
    lastUpdate,
    emailCheck,
    surpriseSwitch,
    activityEnabled,
  }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        onOffSwitch,
        pumpEnabled,
        lastUpdate,
        surpriseSwitch,
        activityEnabled,
      });
    } else {
      params.onOffSwitch = onOffSwitch;
      params.pumpEnabled = pumpEnabled;
      params.lastUpdate = lastUpdate;
      params.surpriseSwitch = surpriseSwitch;
      params.activityEnabled = activityEnabled;
    }
    return params.save();
  };

const updateParamsActivateOnly =
  (Params) =>
  async ({ email, onOffSwitch, lastUpdate }) => {
    let params = await Params.findOne({ email });
    if (!params) {
      params = new Params({
        email,
        onOffSwitch,
        lastUpdate,
      });
    } else {
      params.onOffSwitch = onOffSwitch;
      params.lastUpdate = lastUpdate;
    }
    return params.save();
  };

const getPushNotificationTokens =
  (User) =>
  async ({ email }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.data) {
      const dataObject = JSON.parse(currentUser.data);
      if (dataObject.expoPushTokens && dataObject.expoPushTokens.length > 0) {
        return dataObject.expoPushTokens;
      } else {
        return [];
      }
    }
    return [];
  };

const updatePushNotificationToken =
  (User) =>
  async ({ email, expoPushToken }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.data) {
      const oldDataObject = JSON.parse(currentUser.data);
      if (
        oldDataObject.expoPushTokens &&
        oldDataObject.expoPushTokens.length > 0
      ) {
        const t = oldDataObject.expoPushTokens.find(
          (tk) => tk === expoPushToken
        );
        if (!t) {
          oldDataObject.expoPushTokens.push(expoPushToken);
        }
      } else {
        oldDataObject.expoPushTokens = [expoPushToken];
      }
      currentUser.data = JSON.stringify(oldDataObject);
      currentUser.save();
    } else {
      currentUser.data = JSON.stringify({
        expoPushTokens: [expoPushToken],
      });
      currentUser.save();
    }
  };

const deletePushNotificationToken =
  (User) =>
  async ({ email, expoPushToken }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.data) {
      const oldDataObject = JSON.parse(currentUser.data);
      const tokens = [];
      if (
        oldDataObject.expoPushTokens &&
        oldDataObject.expoPushTokens.length > 0
      ) {
        oldDataObject.expoPushTokens.forEach((t) => {
          if (t !== expoPushToken) {
            tokens.push(t);
          }
        });
      }
      oldDataObject.expoPushTokens = tokens;
      currentUser.data = JSON.stringify(oldDataObject);
      currentUser.save();
    }
  };

const deletePushNotificationAllTokens =
  (User) =>
  async ({ email }) => {
    const currentUser = await User.findOne({ email });
    if (currentUser && currentUser.data) {
      const oldDataObject = JSON.parse(currentUser.data);
      oldDataObject.expoPushTokens = [];
      currentUser.data = JSON.stringify(oldDataObject);
      currentUser.save();
    }
  };

const deactivateCGMSIM =
  (Params) =>
  async ({ email }) => {
    try {
      const deactivation = await Params.updateOne(
        { email },
        { $set: { onOffSwitch: `off` } }
      );
    } catch (err) {
      console.log(err);
    }
  };


const Survey = require('./user.model').Survey;
// Function to check if the user has completed the survey

async function hasCompletedSurvey({ email }) {
  const surveyCount = await Survey.countDocuments({ email });
  return surveyCount > 0;
}

/* const hasCompletedSurvey = 
  (User) => 
  async ({email}) => {
    const user = await User.findOne({ email });
    return user && user.surveyAnswers && user.surveyAnswers.length > 0;
  }; */

// Function to save the survey answers to the user's profile
const saveSurveyAnswers = 
  (User) =>

  async ({ email, answers }) => {
      try {
      // Find the user in the database
      const user = await User.findOne({ email });

      // If the user doesn't exist, return an error
      if (!user) {
        throw new Error('User not found');
      }

      // Save the survey answers to the user's profile
      user.surveyAnswers = answers;
      await user.save();

      // Return success
      return { success: true };
    } catch (error) {
      // Return an error if something goes wrong
      return { error: error.message };
    }
  };

// Function to update the status of CGMSIM

const updateNSstatus = (User) => async ({ email, date }) => {
  try {
    const currentUser = await User.findOne({ email });

    if (currentUser) {
      currentUser.lastNSupdate = date;
      await currentUser.save();
      console.log(`NS status updated for ${email} at ${date}`);
    } else {
      console.log(`User not found with email: ${email}`);
    }
  } catch (error) {
    console.error('Error updating NS status:', error);
  }
};

module.exports = (User, Params, Clouds) => {
  return {
    addFitbitUser: addFitbitUser(User),
    addGoogleUser: addGoogleUser(User),
    addLocalUser: addLocalUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User),
    removeUserByEmail: removeUserByEmail(User),
    removeParamsByEmail: removeParamsByEmail(Params),
    updateInitialParams: updateInitialParams(Params),
    updateParams: updateParams(Params),
    updateParamsNightscoutModal: updateParamsNightscoutModal(Params),
    deleteParamsNightscoutModal: deleteParamsNightscoutModal(Params),
    updateParamsCgmSimModal: updateParamsCgmSimModal(Params),
    updateParamsSubjectModal: updateParamsSubjectModal(Params),
    updateParamsPerlinModal: updateParamsPerlinModal(Params),
    updateParamsActivationModal: updateParamsActivationModal(Params),
    updateParamsActivateOnly: updateParamsActivateOnly(Params),
    updateParamsModelSelectorModal: updateParamsModelSelectorModal(Params),
    getParamsByEmail: getParamsByEmail(Params),
    getCloudsEnabled: getCloudsEnabled(Clouds),
    updateAccessToken: updateAccessToken(User),
    updateRefreshToken: updateRefreshToken(User),
    updateRefreshTokenEncrypted: updateRefreshTokenEncrypted(User),
    updateNsURL: updateNsURL(Params),
    updatePushNotificationToken: updatePushNotificationToken(User),
    deletePushNotificationAllTokens: deletePushNotificationAllTokens(User),
    deletePushNotificationToken: deletePushNotificationToken(User),
    getPushNotificationTokens: getPushNotificationTokens(User),
    deactivateCGMSIM: deactivateCGMSIM(Params),
    hasCompletedSurvey,
    // hasCompletedSurvey: hasCompletedSurvey(User),
    saveSurveyAnswers: saveSurveyAnswers(User),
    updateNSstatus: updateNSstatus(User),
  };
};