import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
});

export default model("Role", roleSchema);
