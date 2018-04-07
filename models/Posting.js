const mongoose = require("mongoose");

// Save a reference to the Schema constructor then
// Use the Schema constructor to create a new UserSchema object
const Schema = mongoose.Schema;
const HeadlineSchema = new Schema({
  // `title` is required, unique and of type String
  // `url` is required and of type String
  // `age` is required and of type String.  Age is when job was posted
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
const Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Article model
module.exports = Headline;
