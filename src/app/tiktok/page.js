"use client";
import { ClipboardIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
const DownLoadTiktok = () => {
  const [url, setUrl] = useState(""); // URL người dùng nhập
  const [videoUrl, setVideoUrl] = useState({}); // Video URL
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const [downloading, setDownloading] = useState(false); // Downloading state

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
    const apiUrl = `https://toptop.huuhuybn.workers.dev/?link=${url}`;

    try {
      const response = await fetch(apiUrl);
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
  const handlePaste = async () => {
    try {
      navigator.clipboard.readText().then((text) => {
        setUrl(text);
      });
    } catch (error) {
      console.error("Clipboard error:", error);
    }
  };
  const handleDownload = async () => {
    if (videoUrl && videoUrl.hdplay) {
      setDownloading(true); // Start downloading process

      // Fetch the video data as a Blob
      try {
        const videoResponse = await fetch(videoUrl.hdplay);
        const videoBlob = await videoResponse.blob();
        const videoObjectUrl = URL.createObjectURL(videoBlob);

        const link = document.createElement("a");
        link.href = videoObjectUrl;
        link.download = `tiktok_video${videoObjectUrl}.mp4`;
        link.click();

        // Revoke the object URL after the download starts
        URL.revokeObjectURL(videoObjectUrl);
      } catch (error) {
        setError("An error occurred while downloading the video.");
        console.error("Download error:", error);
      } finally {
        setDownloading(false); // End downloading process
      }
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="my-5" style={{ fontSize: 30 }}>
        Download TikTok Video
      </h1>
      <div className="relative w-full">
        <button
          onClick={() => {
            handlePaste();
          }}
        >
          <ClipboardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-7 w-7" />
        </button>
        <input
          className="w-100 p-3 pl-10 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          type="text"
          style={{ borderRadius: 16 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
        />
      </div>
      <button
        onClick={fetchVideo}
        className="mt-3"
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
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Fetch Video"
        )}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>{error}</strong>
        </div>
      )}

      {videoUrl.cover && !error && (
        <div className="mt-5 d-flex justify-content-center">
          <Card className="w-80 p-2">
            <Card.Img
              variant="top"
              src={videoUrl.cover}
              style={{ height: 150, width: "100%", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{videoUrl.title}</Card.Title>
            </Card.Body>
            <Button
              onClick={() => {
                if (downloading) return;
                else handleDownload();
              }}
              disabled={downloading}
            >
              {downloading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "DOWNLOAD"
              )}
            </Button>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default DownLoadTiktok;
