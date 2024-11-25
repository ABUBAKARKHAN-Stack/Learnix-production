import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFullQuizForAdmin } from '../API/mainFetching';
import Sidebar from '../Components/Sidebar';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function QuizesPage() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await getFullQuizForAdmin(quizId);
        const shuffledQuestions = shuffleArray(res.data.data.questions || []);
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuizzes();
  }, [quizId]);

  const nextQuiz = () => {
    const currentQuestion = questions[quizIndex];
    const isCorrect = selectedAnswer === currentQuestion.options[currentQuestion.correctAnswerIndex].optionText;

    setUserAnswers((prev) => [
      ...prev,
      { question: currentQuestion.question, selectedAnswer, isCorrect },
    ]);

    if (quizIndex < questions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      setQuizCompleted(true); // Mark the quiz as completed
    }
  };

  const restartQuiz = () => {
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F3EBE5]">
      {/* Sidebar Section */}
      <div className="z-50 ml-8 md:pt-10 md:top-0 md:left-0 md:sticky md:h-screen bg-gray-200">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-5 md:px-10 flex items-center justify-center">
        {questions.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border border-gray-200">
            {!quizCompleted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
                  Question {quizIndex + 1}/{questions.length}
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  {questions[quizIndex]?.question}
                </p>

                {/* Quiz Options */}
                <div className="space-y-4">
                  {questions[quizIndex]?.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center cursor-pointer transform transition-all duration-200 ${
                        selectedAnswer === option.optionText
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-blue-100'
                      } rounded-lg p-4 border border-gray-300`}
                      onClick={() => handleOptionSelect(option.optionText)}
                    >
                      <input
                        type="radio"
                        id={`option-${quizIndex}-${index}`}
                        name={`quizOption-${quizIndex}`}
                        value={option.optionText}
                        checked={selectedAnswer === option.optionText}
                        onChange={() => handleOptionSelect(option.optionText)}
                        className="mr-3"
                      />
                      <label htmlFor={`option-${quizIndex}-${index}`} className="text-md font-medium">
                        {option.optionText}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Next Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={nextQuiz}
                    disabled={!selectedAnswer}
                    className={`px-6 py-2 rounded-lg w-full md:w-auto ${
                      selectedAnswer
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    } transition-all duration-300`}
                  >
                    {quizIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  Quiz Completed!
                </h3>
                <p className="text-lg font-medium text-gray-700 mb-4">
                  You answered {userAnswers.filter((ans) => ans.isCorrect).length} out of{' '}
                  {questions.length} questions correctly.
                </p>
                <ul className="text-left space-y-2">
                  {userAnswers.map((ans, index) => (
                    <li key={index} className="flex items-center">
                      <span
                        className={`mr-2 font-medium ${
                          ans.isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {index + 1}.
                      </span>
                      <span className="flex-1">{ans.question}</span>
                      {ans.isCorrect ? (
                        <span className="text-green-600 ml-2">✔</span>
                      ) : (
                        <span className="text-red-600 ml-2">✘</span>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={restartQuiz}
                  className="mt-6 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
                >
                  Restart Quiz
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xl font-medium text-gray-500">Loading quiz...</p>
        )}
      </div>
    </div>
  );
}

export default QuizesPage;
