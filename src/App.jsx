import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const fileInputer = useRef(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
     if (!file) return;

     setLoading(true);

     const formData = new FormData();
     formData.append("image_file", file);
     formData.append("size", "auto");

     try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "",
          },
          body: formData,
        }
      );
      
      const blob = await response.blob();
      setResult(URL.createObjectURL(blob));
     } catch (error) {
      console.error("Error", error);
     }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownload = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = "removed-background.png"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-[#1f1f1f] font-poppins w-full'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-white font-semibold text-3xl'>Remove image backgrounds.</h1>
          <p className='text-gray-300 text-sm'>Instant, clean PNGs. No signup. No noise.</p>
        </div>
        <div className="flex flex-col w-140 h-30 gap-4 mt-5">
          <label className="w-full h-full flex items-center justify-center bg-[#1f1f1f] rounded-lg border-solid border-2 border-[#383838] text-sm text-white font-medium"><input
            type="file"
            className='hidden'
            onChange={handleFileChange}
          />{loading ? "Processing..." : "Remove Background"}</label>
          <button onClick={handleClick} className="w-full  h-full bg-white rounded-lg text-sm font-medium">Remove Background</button>
      </div>

    {file && (
    <>
    <div className='w-140 mt-5 flex items-center justify-center gap-2'>
      <div className='flex-1 flex-col flex items-center justify-center'>
        {file && (
          <>
            <h1 className='text-xs text-white font-poppins'>Original</h1>
            <div className=' w-full h-50 mt-2 rounded-2xl'>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  className='w-full h-full object-cover rounded-2xl'
                />
            </div>
            </>
            )}
      </div>
      <div className='flex-1 flex-col flex items-center justify-center'>
        {result && (
          <>
            <h1 className='text-xs text-white font-poppins'>Result</h1>
            <div className=' w-full h-50 mt-2'>
              
                <img
                  src={result}
                  alt="Result"
                  className="w-full h-full object-cover rounded-2xl"
                />
               </div>
            </>
            )}
      </div>
    </div>
    <div className='flex w-140 h-12 gap-4 mt-5'>
      <button onClick={handleDownload} className='w-full  h-full bg-white rounded-lg text-sm font-medium'>Download PNG</button>
    </div>
  </>
     )}
  </div>
    </>
  )
}

export default App
