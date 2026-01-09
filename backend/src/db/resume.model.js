import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    default: "My Resume"
  },
  personalInfo: {
    fullName: String,
    phone: String,
    linkedin: String,
    github: String,
  },
  summary: String,
  experience: [
    {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      CGPA:Float,
      startYear: String,
      endYear: String
    }
  ],
  skills: [String],
  projects: [
    {
      name: String,
      description: String,
      techStack: [String],
      link: String
    }
  ],
  certifications: [String],
  achievements:[String],
});

export const Resume=mongoose.model("Resume",resumeSchema)