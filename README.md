🧠 SkillPilot – AI-Powered Interview Practice Platform

MockMate is an AI-driven interview preparation tool that allows users to mock real interview experiences. Users can select their domain (e.g., Frontend, Backend, DevOps, Data Science, etc.), and the system dynamically generates a personalized set of interview questions using the OpenAI API.

To make the experience immersive, VAPI converts the interviewer’s questions from text to speech, enabling users to listen and respond as if in a real interview scenario.

🚀 Features

🎯 Domain-based interview selection
Choose your desired field or technology, and get questions tailored to that area.

🤖 AI-generated questions
OpenAI dynamically generates relevant and non-repetitive interview questions for your chosen domain.

🔊 Realistic voice experience
VAPI converts the generated questions into lifelike speech for a real-time interview feel.

💬 Interactive user flow
Users can listen, think, and respond just like in an actual interview setup.

🧩 Scalable backend architecture
The project is designed with modular APIs, making it easy to extend with new domains or question sources.

🏗️ Tech Stack

Frontend:

Next.js (React Framework)

Tailwind CSS / shadcn/ui

Backend:

Node.js / Express.js

OpenAI API (for AI question generation)

VAPI (for text-to-speech conversion)

Database (optional):

MongoDB or Supabase (for storing user sessions or question history)

Hosting:

Vercel / Render / AWS

⚙️ How It Works

User selects a domain (e.g., Backend Developer, Frontend Developer, DevOps Engineer).

The app calls the OpenAI API to generate domain-specific interview questions.

Each question is sent to VAPI, which converts it into a realistic voice output.

The user listens and responds — simulating a natural interview environment.

🧩 API Flow
[Frontend]
     ↓
User selects domain
     ↓
/generate-questions (OpenAI)
     ↓
Questions returned
     ↓
/text-to-speech (VAPI)
     ↓
Audio questions played

🖥️ Installation & Setup
1. Clone the repository
git clone <repo>
cd mockmate

2. Install dependencies
npm install

3. Create a .env file

Add your API keys:

OPENAI_API_KEY=your_openai_api_key
VAPI_API_KEY=your_vapi_api_key

4. Run the app
npm run dev


App will start at: http://localhost:3000

🧠 Example Domains

Frontend Development

Backend Development

DevOps

Data Science

Machine Learning

Cloud Computing

Each domain triggers a unique set of AI-generated interview questions.

📸 Future Enhancements

🧍‍♂️ Add AI interviewer voice responses (two-way interaction)

🗂️ Save past mock sessions for review

📊 Add analytics to track user performance

🧩 Support multiple languages

🤝 Contributing

Contributions are welcome!
If you’d like to add more domains or improve question generation, feel free to open a pull request.

🧾 License

This project is licensed under the MIT License.

✨ Author

Karan Mehta
