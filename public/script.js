document.getElementById("urlForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const originalUrl = document.getElementById("originalUrl").value;
    const submitBtn = document.querySelector("button[type='submit']");
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Generating...";
  
      const response = await fetch("https://urlshortner-production-0cf2.up.railway.app/shorten/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      const data = await response.json();
      const shortUrl = `${data.data.shortUrl}`;
  
      document.getElementById("shortUrl").href = shortUrl;
      document.getElementById("shortUrl").textContent = shortUrl;
      document.getElementById("result").classList.remove("hidden");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to create short URL");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Generate Short URL";
    }
  });

  document.getElementById("copyBtn").addEventListener("click", () => {
    const shortUrl = document.getElementById("shortUrl").textContent;
    navigator.clipboard.writeText(shortUrl)
      .then(() => alert("URL copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  });
  
  // Refresh functionality
  document.getElementById("refreshBtn").addEventListener("click", () => {
    location.reload();
  });