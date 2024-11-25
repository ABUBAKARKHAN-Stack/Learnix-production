import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import stringSimilarity from "string-similarity"; // Install with `npm install string-similarity`

const App = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyAbt7YGI76jhf07m3yZe6QncQs9DwAUXog"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const geminiInfo = [
    {
      input: "What is Learnix?",
      response:
        "Learnix is an innovative e-learning platform that bridges the gap between students and teachers. It allows teachers to upload courses and quizzes, and students can watch courses, solve quizzes, and track their progress.",
    },
    {
      input: "What inspired the idea of Learnix?",
      response:
        "The idea for Learnix was inspired by the challenges faced during online classes during the COVID-19 pandemic. The lack of interaction, poor communication, and inefficiencies in managing learning materials motivated us to create a platform that addresses these problems effectively.",
    },
    {
      input: "Who are the members of the Learnix team?",
      response:
        "The Learnix team consists of four students from Karachi, Pakistan: Mansoor (Frontend Developer), Awais (Frontend Developer), Abubakar (Backend Developer), and Ubaidullah (Backend Developer). Together, they bring expertise in web development and a passion for solving educational challenges.",
    },
    {
      input: "What is Learnix's vision?",
      response:
        "Learnix is a revolutionary e-learning platform dedicated to bridging the communication and accessibility gaps between students and teachers. Born from the challenges faced during the COVID-19 pandemic, Learnix empowers students and educators to thrive in a digital-first learning environment.",
    },
    {
      input: "Tell me about the Learnix team.",
      response:
        "The Learnix team consists of four intermediate-level students from Karachi, Pakistan. Mansoor and Awais focus on the frontend development, while Abubakar and Ubaidullah handle the backend development. Together, they are passionate about solving real-world problems using AI and web development.",
    },
    {
      input: "What are Learnix’s primary goals?",
      response:
        "Learnix's primary goals are to connect students and teachers by providing a platform where teachers can easily upload courses and quizzes, and students can access and engage with these resources. It also encourages self-paced learning, allowing students to watch courses at their convenience and solve quizzes to test their knowledge.",
    },
    {
      input: "What are Learnix's future goals?",
      response:
        "In the future, Learnix aims to facilitate real-time communication between students and teachers through online video calls. Additionally, the platform plans to enable automated assignment uploads by students and use AI to evaluate and grade assignments effectively.",
    },
    {
      input: "What inspired the creation of Learnix?",
      response:
        "The concept of Learnix was inspired by the challenges faced during online classes amidst the COVID-19 pandemic. The team recognized the limitations of traditional e-learning platforms and sought to create a solution tailored to the unique needs of both students and teachers.",
    },
    {
      input: "What is the significance of Learnix's name?",
      response:
        'The name "Learnix" symbolizes a blend of "learning" and "innovation." It reflects the platform\'s mission to innovate the education process and make learning more accessible and engaging.',
    },

    {
      input: "What is Learnix?",
      response:
        "Learnix is an innovative e-learning platform that bridges the gap between students and teachers. It allows teachers to upload courses and quizzes, and students can watch courses, solve quizzes, and track their progress. Learnix aims to make learning accessible and interactive for everyone.",
    },
    {
      input: "How does Learnix work?",
      response:
        "Learnix allows teachers to upload educational content such as video lessons, quizzes, and reading materials. Students can access these materials at any time, watch the videos, and take quizzes to test their knowledge. The platform tracks students' progress and provides valuable insights to both students and teachers.",
    },
    {
      input: "What kind of courses can be uploaded on Learnix?",
      response:
        "Teachers can upload a variety of courses, including video lectures, reading materials, and quizzes. The platform supports diverse subjects and formats, making it flexible and adaptable for different learning needs.",
    },
    {
      input: "Is Learnix free to use?",
      response:
        "Learnix offers both free and premium options. The free plan gives access to a limited set of courses and features. Premium plans unlock additional features, such as more course materials, real-time communication, and advanced progress tracking tools.",
    },
    {
      input: "Can students track their progress on Learnix?",
      response:
        "Yes, students can track their progress on Learnix. The platform provides tools to monitor completed courses, quiz results, and areas where students need improvement. This helps them stay motivated and on track with their learning goals.",
    },
    {
      input: "How can teachers upload quizzes on Learnix?",
      response:
        "Teachers can easily upload quizzes through Learnix's user-friendly interface. They can create various types of questions such as multiple-choice, true/false, and open-ended questions, and assign them to students for self-assessment.",
    },
    {
      input: "Can Learnix integrate with other platforms?",
      response:
        "Yes, Learnix is designed to integrate with external platforms. For instance, it supports integration with video conferencing tools for live sessions, content management systems for seamless uploading of materials, and other educational tools to enhance the learning experience.",
    },
    {
      input: "Does Learnix support mobile devices?",
      response:
        "Absolutely! Learnix is optimized for mobile devices. Students and teachers can access the platform via smartphones and tablets, allowing for learning on the go and access to content anytime, anywhere.",
    },
    {
      input: "What is the future of Learnix?",
      response:
        "The future of Learnix includes adding AI-powered features such as automated grading, personalized learning paths, and more interactive features like real-time video calls and gamification to enhance the learning experience.",
    },
    {
      input: "How do I get started with Learnix?",
      response:
        "Getting started with Learnix is simple. Sign up on the platform, create your profile, and start exploring courses if you're a student or upload your content if you're a teacher. The platform is intuitive and easy to navigate.",
    },
    {
      input: "How secure is Learnix?",
      response:
        "Learnix uses industry-standard encryption and follows best practices for data security. User data, including personal information and learning progress, is protected, ensuring a secure learning environment for everyone.",
    },
    {
      input: "How does Learnix help teachers with assessments?",
      response:
        "Learnix provides tools for teachers to create and upload quizzes, assign grades, and track student performance. This makes the assessment process more efficient and helps teachers focus on delivering quality content.",
    },
    {
      input: "Can Learnix be used for group studies?",
      response:
        "Yes, Learnix supports collaborative learning. Students can interact through discussion boards, share resources, and collaborate on assignments, making it easier to learn in groups.",
    },
    {
      input: "Is Learnix available globally?",
      response:
        "Yes, Learnix is accessible worldwide. The platform is designed to accommodate students and teachers from different countries, making education accessible no matter where you are.",
    },
    {
      input: "What sets Learnix apart from other e-learning platforms?",
      response:
        "Learnix stands out due to its focus on improving teacher-student communication, real-time collaboration, and personalized learning experiences. It also offers advanced features like AI-assisted grading and live video calls to enhance the educational experience.",
    },
    {
      input: "Can I contact customer support if I need help with Learnix?",
      response:
        "Yes, Learnix provides dedicated customer support. Users can reach out via email or through the platform’s help center for assistance with any issues or questions.",
    },
    {
      input: "Can teachers set deadlines for quizzes and assignments?",
      response:
        "Yes, teachers can set deadlines for quizzes and assignments, ensuring students stay on track with their learning. Deadlines help maintain a structured learning environment.",
    },
    {
      input: "What is Learnix's vision?",
      response:
        "Learnix is dedicated to bridging the communication and accessibility gaps between students and teachers. It empowers both parties to thrive in a digital-first learning environment, inspired by the challenges faced during the COVID-19 pandemic.",
    },
    {
      input: "Who are the team members behind Learnix?",
      response:
        "The Learnix team consists of four intermediate-level students from Karachi, Pakistan: Mansoor (Frontend Developer), Awais (Frontend Developer), Abubakar (Backend Developer), and Ubaidullah (Backend Developer). Together, they are working to create a platform that makes education more accessible and interactive.",
    },
    {
      input: "What are Learnix's primary goals?",
      response:
        "Learnix's primary goals include connecting students and teachers, enabling self-paced learning, and offering a platform for teachers to upload courses and quizzes. It also aims to improve communication and engagement between students and teachers.",
    },
    {
      input: "What are Learnix's future goals?",
      response:
        "In the future, Learnix aims to introduce features like real-time video calls for live lessons and automated assignment grading powered by AI. These features will further enhance the learning experience and help teachers and students interact more effectively.",
    },
    {
      input: "What is Learnix's origin story?",
      response:
        "Learnix was born from the challenges faced during online classes amid the COVID-19 pandemic. The team recognized the limitations of existing e-learning platforms and set out to create a solution that better serves both students and teachers.",
    },
    {
      input: "What is the team description behind Learnix?",
      response:
        "The Learnix team consists of four passionate students from Karachi, Pakistan, who are dedicated to solving real-world problems using AI and web development. Their goal is to make education more accessible, engaging, and impactful for all learners.",
    },
    {
      input: "Can students give feedback on courses?",
      response:
        "Yes, students can provide feedback on courses. This helps teachers improve their content and allows Learnix to ensure high-quality learning materials are available to everyone.",
    },
    {
      input: "Does Learnix offer certificates?",
      response:
        "Currently, Learnix does not offer certificates. However, students can track their progress and accomplishments through the platform's progress tracking tools.",
    },
    {
      input: "How do teachers interact with students on Learnix?",
      response:
        "Teachers can interact with students through discussion forums, feedback on quizzes, and through the platform's messaging system. Future updates will include live video calls for real-time interaction.",
    },
    {
      input: "Is there a community for Learnix users?",
      response:
        "Yes, Learnix fosters a community of teachers and students through its discussion boards and forums. Users can connect, share ideas, and help each other in their learning journeys.",
    },
    {
      input: "Does Learnix support multiple languages?",
      response:
        "Currently, Learnix is primarily available in English, but future updates will support multiple languages to make the platform more accessible to a global audience.",
    },
    {
      input: "How can Learnix improve my learning experience?",
      response:
        "Learnix improves your learning experience by providing personalized content, easy-to-use tools for tracking progress, and the ability to engage with educators. It also provides a flexible learning environment where you can learn at your own pace.",
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: "user", parts: [{ text: inputText }] };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setLoading(true);

    // Match input using fuzzy matching
    const bestMatch = stringSimilarity.findBestMatch(
      inputText.trim().toLowerCase(),
      geminiInfo.map((item) => item.input.toLowerCase())
    );

    if (bestMatch.bestMatch.rating > 0.8) {
      // If a good match is found
      const matchedInfo = geminiInfo[bestMatch.bestMatchIndex];
      console.log("Matched Predefined Response:", matchedInfo.response);
      setChatHistory([
        ...updatedHistory,
        { role: "model", parts: [{ text: matchedInfo.response }] },
      ]);
      setInputText("");
      setLoading(false);
      return;
    }

    // If no good match, fallback to AI
    try {
      console.log("No good match found. Querying AI...");
      const chat = model.startChat({ history: updatedHistory });
      const result = await chat.sendMessage(inputText);
      const modelResponse = result.response.text();

      setChatHistory([
        ...updatedHistory,
        { role: "model", parts: [{ text: modelResponse }] },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory([
        ...updatedHistory,
        {
          role: "model",
          parts: [{ text: "Sorry, I couldn't process your request." }],
        },
      ]);
    } finally {
      setLoading(false);
      setInputText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Learnix Chat & Info</h1>

      {/* Chat Section */}
      <div className="min-h-[50vh] flex flex-col justify-between bg-gray-100 p-4 border rounded-lg">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}>
                {message.parts[0].text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="bg-white p-4 border-t flex items-center space-x-3">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-500 text-white rounded-full disabled:opacity-50"
            disabled={loading}>
            {loading ? "..." : "➤"}
          </button>
        </div>
      </div>

      {/* Gemini Info Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Learnix Info</h2>
        <ul className="space-y-1">
          {geminiInfo.map((info, index) => (
            <li key={index}>
              <strong>{info.input}:</strong> {info.response}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
