import { GoogleGenAI } from "@google/genai";


const extractJSON = (text) =>
    text.replace(/```json/g, "").replace(/```/g, "").trim();

const jdanalysis = async (req, res) => {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        message: "Please enter a valid job description",
      });
    }

    const prompt = `
You are an expert technical recruiter.

Carefully analyze the job description below and extract:
1. Required technical skills
2. Recommended certifications
3. Suggested projects

IMPORTANT:
- Infer skills even if implied
- Do NOT return empty arrays
- Return ONLY valid JSON
- No markdown, no explanation

JSON format:
{
  "required_technical_skills": [],
  "recommended_certifications": [],
  "suggested_projects": []
}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw =
      response.candidates[0].content.parts[0].text;

    const parsed = JSON.parse(extractJSON(raw));

    return res.status(200).json(parsed);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error during AI analysis",
    });
  }
};

export { jdanalysis };
