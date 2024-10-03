import React, { useState , useEffect } from "react";
import NavBar from "../../components/instructor/NavBar";
import Footer from "../../components/instructor/Footer";

function CreateNewCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    level: "",
    category: "",
    duration: "",
    instructor: "663d2732c71b1cfc3163eaf9",
    status: "Pending",
    enrolledStudents: [],
    contents: [],
    tags: [],
  });

  const [showContentFields, setShowContentFields] = useState(false);
  const [showQuizFields, setShowQuizFields] = useState(false);

  const [content, setContent] = useState({
    title: "",
    type: "",
    lectureNotes: "",
    quizQuestions: [],
  });

  const [quizQuestion, setQuizQuestion] = useState({
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(",").map((tag) => tag.trim());
    setCourseData((prevData) => ({
      ...prevData,
      tags: tagsArray,
    }));
  };

  const handleContentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedContents = [...courseData.contents];
    updatedContents[index] = {
      ...updatedContents[index],
      [name]: value,
    };
    setCourseData({
      ...courseData,
      contents: updatedContents,
    });
  };

  const handleQuizQuestionChange = (e) => {
    const { name, value } = e.target;
    const updatedQuizQ = [...content.quizQuestions];
    updatedQuizQ[index] = {
      ...updatedQuizQ[index],
      [name]: value,
    };
    setQuizQuestion({
      ...quizQuestion,
      question: updatedQuizQ,
    });
  };

  const handleAddContent = () => {
    setShowContentFields(true);
    setContent({
      title: "",
      type: "",
      lectureNotes: "",
      quizQuestions: [],
    });
  };

  const handleAddQuizQuestion = () => {
    setShowQuizFields(true);
    setQuizQuestion({
      question: "",
    });
  };

  const handleRemoveContent = (index) => {
    const updatedContents = [...courseData.contents];
    updatedContents.splice(index, 1);
    setCourseData({
      ...courseData,
      contents: updatedContents,
    });
  };

  const handleRemoveQuizQuestion = (cIndex, qIndex) => {
    const updatedContents = [...courseData.contents];
    const updatedQuestions = [...updatedContents[cIndex].quizQuestions];
    updatedQuestions.splice(qIndex, 1);
    updatedContents[cIndex].quizQuestions = updatedQuestions;
    setCourseData({
      ...courseData,
      contents: updatedContents,
    });
  };

  const saveContent = () => {
    if (content.title && content.type && content.lectureNotes) {
      setCourseData({
        ...courseData,
        contents: [...courseData.contents, content],
      });
      setShowContentFields(false);
    } else {
      console.error("Content title, type, and lecture notes are required.");
    }
  };

  const saveQuizQuestion = () => {
    if (quizQuestion.question) {
      setContent({
        ...content,
        quizQuestions: [...content.quizQuestions, quizQuestion],
      });
      setShowQuizFields(false);
    } else {
      console.error("Question is required");
    }
  };

  const handleEditContent = (index) => {
    const editedContent = courseData.contents[index];

    setContent({
      title: editedContent.title,
      type: editedContent.type,
      lectureNotes: editedContent.lectureNotes,
      quizQuestions: editedContent.quizQuestions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/courses/", {
        method: "POST",
        body: JSON.stringify({
          ...courseData,
          contents: courseData.contents.map((content) => ({
            ...content,
            quizQuestions: content.quizQuestions.map((question) => question.question),
          })),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="top-0 flex flex-col w-screen h-full">
      <div className="flex flex-col grow-0">
        <NavBar />
      </div>
      <div className="items-center justify-center w-11/12 h-full mx-auto mt-5 grow">
        <section className="px-5 bg-white dark:bg-gray-900 rounded-3xl">
          <div className="px-4 py-8 mx-auto lg:py-16">
            <h2 className="items-center justify-center mx-auto mb-4 text-xl font-bold text-gray-900 uppercase dark:text-white">
              Add a new course
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={courseData.title}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={courseData.price}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Price"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={courseData.level}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Business">Business</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="duration"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration (in Hours)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={courseData.duration}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Duration"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="tags"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tags (Separate by commas)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    // value={courseData.tags}
                    value={courseData.tags.join(", ")}
                    onChange={handleTagsChange}
                    // onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tags"
                  />
                </div>
              </div>
              {courseData.contents.map((content, index) => (
                <div key={index} className="mt-5 content-section">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`contentTitle${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id={`contentTitle${index}`}
                      value={content.title}
                      onChange={(e) => handleContentChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Title"
                      required
                    />
                  </div>
                  {/* <div>
                    <label
                      htmlFor={`contentType${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      id={`contentType${index}`}
                      value={content.type}
                      onChange={(e) => handleContentChange(e, index)}
                      data-index={index}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Type"
                      required
                    />
                  </div> */}
                  {/*  */}
                  <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Content Type
                  </label>
                  <select
                    name="level"
                    id={`contentType${index}`}
                    value={content.type}
                    onChange={(e) => handleContentChange(e, index)}
                      data-index={index}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select Content Type</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Video">Video</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
                  {/*  */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`contentNotes${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content Notes
                    </label>
                    <textarea
                      id={`contentNotes${index}`}
                      name="lectureNotes"
                      value={content.lectureNotes}
                      onChange={(e) => handleContentChange(e, index)}
                      data-index={index}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Notes"
                      required
                    ></textarea>
                    {content.quizQuestions.map((question, qIndex) => (
                      <div key={qIndex} className="mt-5 quiz-question-section">
                        <label
                          htmlFor={`quizQuestion${qIndex}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Quiz Question {qIndex + 1}
                        </label>
                        <textarea
                          id={`quizQuestion${qIndex}`}
                          name={`quizQuestion${qIndex}`}
                          value={question.question}
                          onChange={(e) => {
                            const updatedQuestions = [...content.quizQuestions];
                            updatedQuestions[qIndex] = {
                              ...updatedQuestions[qIndex],
                              question: e.target.value,
                            };
                            setContent({
                              ...content,
                              quizQuestions: updatedQuestions,
                            });
                          }}
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Quiz Question"
                          required
                        ></textarea>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveQuizQuestion(index, qIndex)
                          }
                          className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                        >
                          Remove Quiz Question
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEditContent(index)}
                    className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveContent(index)}
                    className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {showContentFields && (
                <div className="content-section">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="initialContentTitle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="initialContentTitle"
                      value={content.title}
                      onChange={(e) =>
                        setContent({ ...content, title: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Title"
                      required
                    />
                  </div>
                  {/*  */}
                  <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Content Type
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={content.type}
                    onChange={(e) =>
                      setContent({ ...content, type: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select Content Type</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Video">Video</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
                {/*  */}
                  {/* <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Content Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      id="initialContentType"
                      value={content.type}
                      onChange={(e) =>
                        setContent({ ...content, type: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Type"
                      required
                    />
                  </div> */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Content Notes
                    </label>
                    <textarea
                      name="lectureNotes"
                      value={content.lectureNotes}
                      onChange={(e) =>
                        setContent({ ...content, lectureNotes: e.target.value })
                      }
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Notes"
                      required
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="quize_Question"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quize Question
                    </label>
                    <textarea
                      id="quize_Question"
                      name="quize_Question"
                      value={quizQuestion.question}
                      onChange={(e) =>
                        setQuizQuestion({
                          ...quizQuestion,
                          question: e.target.value,
                        })
                      }
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Description"
                      required
                    ></textarea>
                    <button
                      type="button"
                      onClick={saveQuizQuestion}
                      className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleAddQuizQuestion}
                      className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Add Quiz Question
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={saveContent}
                    className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                  >
                    Save
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={handleAddContent}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Add Content
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Add course
              </button>
            </form>
          </div>
        </section>
      </div>
      <div className="flex flex-col grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default CreateNewCourse;
