export default async function handler(req, res) {
    const YOUR_GOOGLE_SCRIPT_WEBHOOK_URL_HERE = "https://script.google.com/macros/s/AKfycbzX6GfIKdH9W3ZLsj1RbAfYv5GqD-MVWWe6ToSJFvGRxkJP5ytIa_FaUEFOnK7P95AlSw/exec"
    try {
      const user_id = req.query.id || "unknown";
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const ua = req.headers["user-agent"];
  
      // --- SEND DATA TO GOOGLE SCRIPT WEBHOOK ---
      await fetch(YOUR_GOOGLE_SCRIPT_WEBHOOK_URL_HERE, {
        method: "POST",
        body: JSON.stringify({
          user_id,
          ip,
          user_agent: ua
        }),
        headers: { "Content-Type": "application/json" }
      });
  
      // --- RETURN TRACKING PIXEL (1x1 transparent PNG) ---
      const pixel = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8BwQACfsD/Q2w0X8AAAAASUVORK5CYII=",
        "base64"
      );
  
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Length", pixel.length);
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
  
      res.status(200).send(pixel);
  
    } catch (err) {
      console.error("Tracker error:", err);
      res.status(500).send("Error");
    }
  }
  