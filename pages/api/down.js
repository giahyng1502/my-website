import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { videoUrl } = req.body; // URL của video được gửi từ client

      if (!videoUrl) {
        return res.status(400).json({ error: "Video URL is required." });
      }

      // Gửi yêu cầu tải video từ URL
      const videoResponse = await fetch(videoUrl);

      if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video: ${videoResponse.statusText}`);
      }

      // Cài đặt header HTTP để tải xuống video
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=video_${Date.now()}.mp4`
      );

      // Stream dữ liệu video từ server nguồn đến client
      await pipeline(videoResponse.body, res);
    } catch (error) {
      console.error("Lỗi tải video:", error);
      res
        .status(500)
        .json({ error: "An error occurred while downloading the video." });
    }
  } else {
    // Phương thức không được hỗ trợ
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed." });
  }
};

export default handler;
