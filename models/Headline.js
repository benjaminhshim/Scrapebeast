var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true,
    multi: false
  },
  link: {
    type: String,
    required: true,
    unique: true,
    multi: false
  },
  img_url: {
    type: String,
    required: true,
    unique: true,
    multi: false
  },
  saved: {
    type: Boolean,
    defaul: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;
