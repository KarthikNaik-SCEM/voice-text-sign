import { useEffect, useState } from 'react'
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css'

function App() {

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  //convert the text to sign lang after the recognition
  useEffect(() => {
    if (finalTranscript !== '') {
      convertWordToImage()
    }
  }, [interimTranscript, finalTranscript]);
  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // const [mess, setMess] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius minus ullam incidunt nulla dolor assumenda quidem dolorum quia excepturi ipsa.")
  const [signConversionImage, setSignConversionImage] = useState("")

  //function to convert the words to sign language images
  const convertWordToImage= async()=>{
    


    const arrayOfWords=transcript.match(/\b(\w+)\b/g);


    
    async function displayListElementsWithDelay(list, index) {
      // Base case: If index is equal to or greater than the length of the list, stop recursion
      if (index >= list.length) {
        return;
      }
    
      const response = await fetch(`http://localhost:8800/getSignWord/${arrayOfWords[index].toLowerCase()}`);
      const data = await response.json();
      console.log(data.url);
      setSignConversionImage(data.url)

      // Highlight the current word being displayed
      // setHighlightedWordIndex(index);
    
      // Increment index to move to the next element
      index++;
    
      // Call setTimeout to recursively call the function after 2 seconds
      setTimeout(function() {
        displayListElementsWithDelay(list, index);
      }, 2000); // 2000 milliseconds = 2 seconds
    }

    displayListElementsWithDelay(arrayOfWords, 0);

  }

  return (
    <>
  <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button className='mx-3' onClick={SpeechRecognition.startListening}>start</button>
      <button className='mx-3' onClick={SpeechRecognition.stopListening}>stop</button>
      <button className='mx-3' onClick={resetTranscript}>reset</button>
      <p>{transcript}</p>

  <button onClick={convertWordToImage} className='px-2 py-1 border-4 rounded-md border-purple-700 text-purple-700 hover:scale-105 duration-200'>click me to repeat again</button>
  <br />
  <img src={signConversionImage} alt="no sign for this word" />
  
    </>
  )
}

export default App
