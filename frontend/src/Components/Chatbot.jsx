import React, { useContext } from "react";
import { Context } from "../Context/Context"; // Ensure the import path is correct
import { assets } from "../assets/imgs/assets";
import { FaRobot } from "react-icons/fa";


// Function to convert **bold** text into <strong> tags
const formatText = (text) => {
  // Convert any text between ** to <strong> tags
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

function Main() {
  const {
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
    handleKeyDown, // Add the handleKeyDown from Context
  } = useContext(Context);

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // Set the clicked suggestion as the current prompt
    setrecentprompt(suggestion);
    setinput(suggestion); // Optional: if you want the text to appear in the input field
    onSent(suggestion); // Trigger the AI response with the suggestion
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex items-center justify-between text-xl p-5 pt-2 text-[#585858] sticky top-0 z-10 bg-white shadow-lg">
        <p className="text-xl font-semibold">Learnix BOT</p>
        <div className="p-2 bg-gradient-to-r rounded-full from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500">
          <FaRobot size={30} className="text-white" />
        </div>
      </div>

      {/* Main content area that will scroll */}
      <div className="flex-1 overflow-y-auto ">
        {!showresult ? (
          <div className="max-w-[900px] mx-auto px-5">
            <div className="my-5 text-[45px]  mb-[5vh] mt-[5vh] text-[#c4c7c5] leading-[38px] font-medium">
              <p>
                <span className="bg-gradient-to-t from-[#4b90ff] to-[#ff5546] text-transparent bg-clip-text">
                  Hello , Learnix Community.
                </span>{" "}
                <br />
              </p>
              <p>How can I help you?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* Suggestion boxes about Learnix */}
              <div
                className="h-[180px] p-4 bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() =>
                  handleSuggestionClick(
                    "What are the key features of Learnix for educators?"
                  )
                }>
                <p className="text-[#585858] text-[17px]">
                  What are the key features of Learnix for educators?
                </p>
                <img
                  src={assets.compass_icon}
                  alt=""
                  className="w-[35px] p-1 absolute bg-white rounded-[20px] bottom-2 right-2"
                />
              </div>
              <div
                className="h-[180px] p-4 bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() =>
                  handleSuggestionClick(
                    "How does Learnix enhance online learning experiences?"
                  )
                }>
                <p className="text-[#585858] text-[17px]">
                  How does Learnix enhance online learning experiences?
                </p>
                <img
                  src={assets.bulb_icon}
                  alt=""
                  className="w-[35px] p-1 absolute bg-white rounded-[20px] bottom-2 right-2"
                />
              </div>
              <div
                className="h-[180px] p-4 bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() =>
                  handleSuggestionClick(
                    "What are the benefits of using Learnix for corporate training?"
                  )
                }>
                <p className="text-[#585858] text-[17px]">
                  What are the benefits of using Learnix for corporate training?
                </p>
                <img
                  src={assets.message_icon}
                  alt=""
                  className="w-[35px] p-1 absolute bg-white rounded-[20px] bottom-2 right-2"
                />
              </div>
              <div
                className="h-[180px] p-4 bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() =>
                  handleSuggestionClick(
                    "How can Learnix help in personalized learning paths for students?"
                  )
                }>
                <p className="text-[#585858] text-[17px]">
                  How can Learnix help in personalized learning paths for
                  students?
                </p>
                <img
                  src={assets.code_iconF}
                  alt=""
                  className="w-[35px] p-1 absolute bg-white rounded-[20px] bottom-2 right-2"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-5 max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            <div className="my-10 flex items-center gap-5">
              <div className="p-2 bg-gradient-to-r rounded-full from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500">
                <FaRobot size={30} className="text-white" />
              </div>
              <p>{recentprompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img
                src={assets.gemini_icon}
                alt=""
                className="h-[40px] rounded-full"
              />
              {loading ? (
                <div className="flex flex-col gap-2 w-full">
                  <hr className="h-[20px] rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] animate-loader" />
                  <hr className="h-[20px] rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] animate-loader" />
                  <hr className="h-[20px] rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] animate-loader" />
                </div>
              ) : (
                <p
                  className="text-[17px] font-light leading-[1.8]"
                  dangerouslySetInnerHTML={{
                    __html: formatText(resultdata), // Convert **bold** text here
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input area at the bottom */}
      <div className="w-full max-w-[900px] mx-auto mt-auto px-5 pt-5">
        <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-4 rounded-full">
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
            className="flex-1 bg-transparent border-none outline-none p-2 text-[18px]"
            onKeyDown={handleKeyDown} // Handle key press
          />
          <div className="flex items-center gap-5">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-[24px] cursor-pointer"
            />
            <img
              src={assets.mic_icon}
              alt=""
              className="w-[24px] cursor-pointer"
            />
            {input && (
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt=""
                className="w-[24px] cursor-pointer"
              />
            )}
          </div>
        </div>
        <p className="text-[13px] mt-5 text-center font-light">
          Gemini may display incorrect info, so double-check before using.
        </p>
      </div>
    </div>
  );
}

export default Main;
