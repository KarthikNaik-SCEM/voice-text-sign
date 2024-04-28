import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./App.css";

import { VscDebugRestart } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";

function App() {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  //convert the text to sign lang after the recognition
  useEffect(() => {
    if (finalTranscript !== "") {
      convertWordToImage();
    }
  }, [interimTranscript, finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // const [mess, setMess] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius minus ullam incidunt nulla dolor assumenda quidem dolorum quia excepturi ipsa.")
  const [signConversionImage, setSignConversionImage] = useState("");

  //this will contain the list of objects where each object item is either a word or a letter and based on that it will

  // Function to convert the words to sign language images
  const convertWordToImage = async () => {
    const arrayOfWords = transcript.match(/\b(\w+)\b/g);

    // Define a function to convert a single word
    const convertWord = async (word) => {
      const response = await fetch(
        `http://localhost:8800/getSignWord/${word.toLowerCase()}`
      );
      const data = await response.json();
      if (data.success) {
        setSignConversionImage(data.url);
      } else {
        await convertLetterToImage(word); // Convert letter by letter if word not found
      }
    };

    // Loop through each word in the array
    for (const word of arrayOfWords) {
      await convertWord(word); // Wait for the conversion of each word
      await delay(2000); // Wait for 2 seconds before processing the next word
    }
  };

  // Function to convert the letters to sign language images
  const convertLetterToImage = async (word) => {
    const arrayOfLetters = word.split("");

    // Define a function to convert a single letter
    const convertLetter = async (letter) => {
      const response = await fetch(
        `http://localhost:8800/getSignLetter/${letter.toLowerCase()}`
      );
      const data = await response.json();
      if (data.success) {
        setSignConversionImage(data.url);
      }
      await delay(2000); // Wait for 2 seconds before processing the next letter
    };

    // Loop through each letter in the array
    for (const letter of arrayOfLetters) {
      await convertLetter(letter); // Wait for the conversion of each letter
    }
  };

  // Utility function to create delay using promises
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Call convertWordToImage function
  // convertWordToImage();

  return (
    <section className="flex items-center justify-center flex-col-reverse h-screen w-screen bg-[#0b2942] text-white">
      <p className="font-bold text-3xl">
        Microphone: {listening ? "on" : "off"}
      </p>
      <button
        onClick={convertWordToImage}
        title="hello"
        className="px-2 py-1 border-4 my-2 rounded-md border-blue-800 font-medium hover:scale-105 duration-200"
      >
        click me to repeat again
      </button>

      <div className="space-x-16 my-5 ">
        <button
          className="mx-3 text-3xl bg- border-blue-950"
          title="Start"
          onClick={SpeechRecognition.startListening}
        >
          <FaPlay size={25} />
        </button>
        <button
          className="mx-3"
          title="Stop"
          onClick={SpeechRecognition.stopListening}
        >
          <FaRegStopCircle size={25} />
        </button>
        <button className="mx-3" title="Restart" onClick={resetTranscript}>
          <VscDebugRestart size={25} />
        </button>
      </div>

      <p className="font-medium text-2xl italic text-yellow-200  underline-offset-8 underline relative ">
        {transcript}
      </p>

      <img
        loading="eager"
        src={signConversionImage}
        alt="no sign for this word"
        className="block border-[5px] border-blue-400 italic   max-h-96 max-w-[50rem] "
        height={300}
        width={500}
      />
    </section>
  );
}

export default App;
