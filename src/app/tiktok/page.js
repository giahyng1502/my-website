"use client";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
const DownLoadTiktok = () => {
  const [url, setUrl] = useState(""); // URL người dùng nhập
  const [videoUrl, setVideoUrl] = useState({}); // Video URL
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  const fetchVideo = async () => {
    if (!url) {
      setError("Please enter a valid TikTok URL!");
      return;
    }
    if (!url.includes("tiktok.com")) {
      setError("Please enter a valid TikTok URL!");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error message
    const apiUrl = `https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(
      url
    )}&hd=1`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b727548c78mshc383ecf5117c896p1a1ddbjsna2e2b334e9d3",
        "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const result = await response.json();
      if (result.data && result.data.hdplay) {
        setVideoUrl(result.data);
      } else {
        setError("Could not fetch video, please try again.");
      }
    } catch (error) {
      setError("An error occurred while fetching the video.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async () => {
    if (videoUrl && videoUrl.hdplay) {
      // Fetch the video data as a Blob
      try {
        const videoResponse = await fetch(videoUrl.hdplay);
        const videoBlob = await videoResponse.blob();
        const videoObjectUrl = URL.createObjectURL(videoBlob);

        const link = document.createElement("a");
        link.href = videoObjectUrl;
        link.download = "tiktok_video.mp4";
        link.click();

        // Revoke the object URL after the download starts
        URL.revokeObjectURL(videoObjectUrl);
      } catch (error) {
        setError("An error occurred while downloading the video.");
        console.error("Download error:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Download TikTok Video</h1>
      <input
        type="text"
        placeholder="Enter TikTok Video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={fetchVideo}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Download"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>{error}</strong>
        </div>
      )}

      {videoUrl && !error && (
        <div className="d-flex justify-content-center">
          <Card className="w-80 p-2">
            <Card.Img
              variant="top"
              src={videoUrl.cover}
              style={{ height: 150, width: "100%", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{videoUrl.title}</Card.Title>
            </Card.Body>
            <Button onClick={handleDownload}>DOWNLOAD</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DownLoadTiktok;
