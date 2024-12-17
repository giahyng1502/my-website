export default async function download(req, res) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;
      const videoUrl = `https://toptop.huuhuybn.workers.dev/?link=${encodeURIComponent(
        url
      )}`;
      const response = await fetch(videoUrl);
      const data = await response.json();
      if (data.code === 0) {
        res.status(200).json(data);
      } else {
        res.status(400);
      }
    } catch (error) {
      console.log("Có lỗi xẩy ra khi download video", error);
      res.status(500);
    }
  } else {
    console.log("lỗi phương thức POST");
    res.status(405);
  }
}
