import { useState } from "react"
const { Configuration, OpenAIApi } = require("openai");

const ChatbotApp = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers['User-Agent'];
  

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLanguage, setFirstLanguage] = useState("")
  const [secondLanguage, setSecondLanguage] = useState("")

  const languages = [
    "Mandarin Chinese",
    "Spanish",
    "English",
    "Hindi",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Japanese",
    "Punjabi",
    "German",
    "Javanese",
    "Wu Chinese",
    "Telugu",
    "Vietnamese",
    "Korean",
    "French",
    "Marathi",
    "Tamil",
    "Italian",
    "Turkish",
    "Urdu",
    "Gujarati",
    "Polish",
    "Ukrainian",
    "Persian",
    "Malayalam",
    "Xiang Chinese",
    "Hausa",
    "Kannada",
    "Oriya",
    "Indonesian",
    "Maithili",
    "Burmese",
    "Sunda",
    "Pashto",
    "Hakka Chinese",
    "Malay",
    "Tagalog",
    "Sindhi",
    "Saraiki",
    "Amharic",
    "Fula",
    "Romanian",
    "Dutch",
    "Yoruba",
    "Nepali",
    "Serbo-Croatian",
    "Sinhala",
    "Uzbek",
    "Oromo"
  ];
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `translate "${prompt}" from ${firstLanguage} to ${secondLanguage}`,
        temperature: 0.5,
        max_tokens: 4000,
      });
      console.log("response", result);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };
  console.log(process.env.REACT_APP_OPENAI_API_KEY)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <form onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column"

            
          }}
        >
          <textarea
            type="text"
            rows="4"
            cols="30"
            
            value={prompt}
            placeholder="translate whatever you want"
            className="textArea"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <br/>
          <label htmlFor="oneLanguage">Choose two languages:</label>
          <br/>
          <select name="oneLanguage" className="languages" onChange={(e) => setFirstLanguage(e.target.value)}>
            {languages.sort().map((language, index) => <option value={language} placeholder="languages" key={index}>{language}</option>)}
          </select> 
           to 
           <select name="twoLanguage" className="languages" onChange={(e) => setSecondLanguage(e.target.value)}>
            {languages.sort().map((language, index) => <option value={language} placeholder="languages" key={index}>{language}</option>)}
          </select>
          <br/>
          <button
            disabled={loading || prompt.length === 0}
            type="submit"
          >
            {loading ? "givin it to you..." : "give it to me"}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>Translation:</strong>
            {apiResponse}
          </pre>
        </div>
      )}
    </>
  );
};


export default ChatbotApp;
