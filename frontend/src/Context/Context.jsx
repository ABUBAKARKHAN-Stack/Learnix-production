import React, { createContext, useEffect, useRef, useState } from "react";
import runChat from "../Config/gemini";

// Create the context object
export const Context = createContext();


// Structured Predefined Data
const predefinedData = {
  about: {
    vision:
      "Learnix is a revolutionary e-learning platform dedicated to bridging the communication and accessibility gaps between students and teachers. Born from the challenges faced during the COVID-19 pandemic, Learnix empowers students and educators to thrive in a digital-first learning environment.",
  },
  team: [
    {
      name: "Mansoor",
      role: "Frontend Developer",
      description:
        "Expert in creating user-friendly interfaces, Mansoor ensures Learnix's design is intuitive and visually engaging. His dedication to clean code and innovative layouts makes the learning experience seamless for users.",
    },
    {
      name: "Awais",
      role: "Frontend Developer",
      description:
        "With a keen eye for detail, Awais focuses on responsive design and interactive elements. He collaborates closely with Mansoor to deliver a consistent and engaging frontend experience.",
    },
    {
      name: "Abubakar",
      role: "Backend Developer",
      description:
        "Abubakar ensures Learnix's server-side architecture is robust, secure, and scalable. His expertise lies in managing databases and crafting APIs that make the platform efficient and reliable.",
    },
    {
      name: "Ubaidullah",
      role: "Backend Developer",
      description:
        "Ubaidullah specializes in backend logic and system integrations. He plays a key role in ensuring Learnix’s functionality aligns with user needs and technical standards.",
    },
  ],
  goals: {
    primary: [
      "Connect students and teachers by providing a platform where teachers can easily upload courses and quizzes, and students can access and engage with these resources.",
      "Encourage self-paced learning by allowing students to watch courses at their convenience and solve quizzes to test their knowledge.",
    ],
    future: [
      "Facilitate real-time communication between students and teachers through online video calls.",
      "Enable automated assignment uploads by students and use AI to evaluate and grade assignments effectively.",
    ],
  },
  origin:
    "The concept of Learnix was inspired by the challenges faced during online classes amidst the COVID-19 pandemic. Recognizing the limitations of traditional e-learning platforms, the team set out to create a solution tailored to the unique needs of both students and teachers.",
  team_description:
    "We are four intermediate-level students from Karachi, Pakistan, driven by a shared passion for solving real-world problems using AI and web development. By leveraging our skills and teamwork, we aspire to make education accessible, engaging, and impactful.",
  facilities: {
    students: [
      "Access to a wide range of online courses and educational resources.",
      "Ability to take quizzes and assessments to test understanding.",
      "Option for personalized learning paths to fit each student's pace and needs.",
      "Discussion forums to interact with peers and instructors.",
    ],
    teachers: [
      "Easy course creation tools for uploading and organizing content.",
      "Ability to track student progress and performance.",
      "Options for creating quizzes and assignments for students.",
      "Real-time communication tools for direct interaction with students.",
    ],
  },
  unique_features: [
    "Learnix provides an intuitive platform designed to cater to both students' and teachers' needs.",
    "AI-driven personalized learning paths for each student, ensuring that the content and pace are tailored to individual learning styles.",
    "Automated assignment grading system that allows for quick feedback and more time for teachers to focus on student engagement.",
    "Integrated video call features to facilitate real-time learning and communication between students and teachers.",
  ],
  student_problems_solved:
    "Learnix solves several common issues faced by students in traditional learning environments, such as lack of access to quality resources, slow feedback from teachers, and limited interaction with peers. With Learnix, students can access educational content anytime, take quizzes for immediate feedback, and engage in discussions with their peers.",
  features_for_educators:
    "Learnix offers a range of powerful features for educators, including the ability to easily create and manage courses, track student progress, and provide personalized learning paths. Educators can also create quizzes, assignments, and offer real-time feedback to students.",
  enhance_online_learning:
    "Learnix enhances the online learning experience by offering an intuitive platform for students and educators. With features like interactive courses, quizzes, real-time video calls, and personalized learning paths, it ensures a more engaging and productive learning environment.",
  benefits_for_corporate_training:
    "Learnix provides significant benefits for corporate training, such as scalable content delivery, employee progress tracking, and the ability to tailor courses to specific organizational needs. It helps businesses upskill employees while saving time and resources.",
  personalized_learning_paths:
    "Learnix helps in personalized learning paths by allowing students to set their pace and choose courses based on their individual needs and interests. AI-driven recommendations help guide students through the content, making the learning experience more relevant and effective.",
};

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentprompt, setrecentprompt] = useState(" ");
  const [prevprompts, setprevprompts] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultdata, setresultdata] = useState("");
  const timeoutRef = useRef()


  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const delaypara = async (index, nextword) => {
    timeoutRef.current = setTimeout(() => {
      setresultdata((prev) => prev + nextword);
    }, 20 * index);
  };

  const displayResponseWithEffect = async (response) => {
    setresultdata(""); // Clear previous result
    const formattedResponse = formatTextWithBoldTags(response);
    const responseArray = formattedResponse.split("");
    for (let i = 0; i < responseArray.length; i++) {
      const nextword = responseArray[i];
      delaypara(i, nextword);
    }
  };

  // Format response to bold text where ** is used
  const formatTextWithBoldTags = (text) => {
    let formattedText = text;
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return formattedText;
  };

  const fetchPredefinedResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // Checking for the "future plans" query
    if (lowerQuery.includes("future plans") || lowerQuery.includes("future")) {
      return `Future Goals:
- ${predefinedData.goals.future.join("\n- ")}`;
    }

    if (lowerQuery.includes("vision") || lowerQuery.includes("about")) {
      return predefinedData.about.vision;
    }
    if (lowerQuery.includes("team")) {
      return predefinedData.team
        .map(
          (member) => `${member.name} - ${member.role}: ${member.description}`
        )
        .join("\n\n");
    }
    if (lowerQuery.includes("key features of learnix for educators")) {
      return predefinedData.features_for_educators;
    }

    if (lowerQuery.includes("how does learnix enhance online learning")) {
      return predefinedData.enhance_online_learning;
    }

    if (
      lowerQuery.includes("benefits of using learnix for corporate training")
    ) {
      return predefinedData.benefits_for_corporate_training;
    }

    if (
      lowerQuery.includes("how can learnix help in personalized learning paths")
    ) {
      return predefinedData.personalized_learning_paths;
    }
    if (lowerQuery.includes("goals")) {
      return `Primary Goals:\n- ${predefinedData.goals.primary.join(
        "\n- "
      )}\n\nFuture Goals:\n- ${predefinedData.goals.future.join("\n- ")}`;
    }
    if (lowerQuery.includes("origin")) {
      return predefinedData.origin;
    }
    if (lowerQuery.includes("team description")) {
      return predefinedData.team_description;
    }
    if (lowerQuery.includes("facilities for students")) {
      return `Facilities for Students:
- ${predefinedData.facilities.students.join("\n- ")}`;
    }
    if (lowerQuery.includes("facilities for teachers")) {
      return `Facilities for Teachers:
- ${predefinedData.facilities.teachers.join("\n- ")}`;
    }
    if (lowerQuery.includes("unique features")) {
      return `Unique Features of Learnix:
- ${predefinedData.unique_features.join("\n- ")}`;
    }
    if (lowerQuery.includes("student problems solved")) {
      return predefinedData.student_problems_solved;
    }

    return null;
  };

  const newchat = () => {
    setloading(false);
    setshowresult(false);
  };

  const onSent = async (prompt) => {
    setresultdata("");
    setloading(true);
    setshowresult(true);

    // Check for predefined data response
    const predefinedResponse = fetchPredefinedResponse(prompt || input);
    if (predefinedResponse) {
      setrecentprompt(prompt || input);
      await displayResponseWithEffect(predefinedResponse);
      setloading(false);
      return;
    }

    // If no predefined response, query Gemini API
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setrecentprompt(prompt);
    } else {
      setprevprompts((prev) => [...prev, input]);
      setrecentprompt(input);
      response = await runChat(input);
    }

    await displayResponseWithEffect(response);
    setloading(false);
    setinput("");
  };

  const handleKeyDown = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action like page reload
      onSent(input); // Trigger the send action
    }
  };

  const contextValue = {
    prevprompts,
    setprevprompts,
    onSent,
    setrecentprompt,
    recentprompt,
    showresult,
    loading,
    resultdata,
    input,
    setinput,
    newchat,
    handleKeyDown,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
