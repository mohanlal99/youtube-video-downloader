import { useState } from "react";
import Navbar from "./Componats/navbar";
function App() {
  const [url, setUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloading(true);
    setDownloadSuccess(false);
    try {
      const response = await fetch("http://localhost:5000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // or setDownloadSuccess(true) to indicate success
        setDownloadSuccess(true);
      } else {
        // Handle server errors or invalid responses
        alert("Try again");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please check your connection and try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="App container m-auto px-3 lg:px-16">
      <Navbar />
      <div className="main p-5 text-center items-center justify-center">
        <h1 className="text-center text-xl lg:text-3xl font-bold pb-4">
          Download Youtube Video in HD Quality
        </h1>
        <div className="relative flex justify-center items-center">
          <form onSubmit={handleDownload} className="relative">
            <input
              className="p-3 pe-20 w-full lg:w-[600px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube video link"
            />
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-blue-700"
              type="submit"
            >
              <i className={`fa ${downloading ? "fa-spinner fa-spin" : "fa-circle-down"} text-4xl px-2`}></i>
            </button>
          </form>
        </div>
        {downloading && <p>Downloading...</p>}
        {downloadSuccess && <p>Download successfully!</p>}
      </div>
    </div>
  );
}

export default App;
