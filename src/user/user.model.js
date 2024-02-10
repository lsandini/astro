const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const cgmSimSchema = new Schema({
  email: {
    type: String,
    required: [true, `email required`],
    unique: [true, `email already registered`],
  },
  email2: {
    type: String,
    required: [false, `email required`],
    unique: [false, `email already registered`],
  },
  source: String,
  isf: Number,
  apiSecret: String,
  cr: Number,
  dia: Number,
  weight: Number,
  height: Number,
  gender: String,
  age: Number,
  tp: Number,
  carbsAbsTime: Number,
  nsUrl: String,
  onOffSwitch: String,
  pumpEnabled: String,
  octaves: Number,
  amplitude: Number,
  persistence: Number,
  noiseArray: Array,
  lastUpdate: Date,
  emailAlert: Date,
  hypoAlert: Date,
  hyperAlert: Date,
  basalAlert: Date,
  mealtimeAlert: Date,
  carbAlert: Date,
  emailCheck: String,
  surpriseSwitch: String,
  model: String,
  activityEnabled: String,
  nsUnits: String,
  timezone: String,
});

const cloudSchema = new Schema({
  name: String,
  url: String,
  enabled: Boolean,
});

const uvastateSchema = new Schema({
  email: {
    type: String,
    required: [true, `email required`],
    unique: [true, `email already registered`],
  },
  Gp: Number,
  Gt: Number,
  I_: Number,
  Il: Number,
  Ip: Number,
  Isc1: Number,
  Isc2: Number,
  Qgut: Number,
  Qsto1: Number,
  Qsto2: Number,
  X: Number,
  XL: Number,
  Y: Number,
  Z: Number,
  W: Number,
});

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, `email required`],
    unique: [true, `email already registered`],
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  //password: { type: String, required: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  source: { type: String, required: [true, `source not specified`] },
  lastVisited: { type: Date, default: new Date() },
  data: String,
  dataEncrypt: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastNSupdate: { type: Date, default: new Date() },
});

const surveySchema = new Schema({
  email: { type: String, required: true },
  answers: [
    {
      id: { type: String, required: true },
      category: { type: String, required: false},
      question: { type: String, required: true },
      answer: { type: [String], required: true },
    },
  ],
});

const Survey = mongoose.model('Survey', surveySchema, `survey`);

const userModel = mongoose.model(`user`, userSchema, `user`);
const cgmSimModel = mongoose.model(`cgmsim`, cgmSimSchema, `cgmsim`);
const uvastateModel = mongoose.model(`uvastate`, uvastateSchema, `uvastate`);
const cloudModel = mongoose.model(`cloud`, cloudSchema, `cloud`);

module.exports = { userModel, cgmSimModel, uvastateModel, cloudModel, Survey };