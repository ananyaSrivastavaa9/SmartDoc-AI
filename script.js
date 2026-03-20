const fileInput = document.getElementById("fileInput");
let fullText = "";

// ANALYZE
async function analyze() {

  const endpoint = document.getElementById("endpoint").value;
  const key = document.getElementById("key").value;
  const file = fileInput.files[0];
  const url = document.getElementById("urlInput").value;

  let response;

  if (file) {
    response = await fetch(`${endpoint}/formrecognizer/documentModels/prebuilt-read:analyze?api-version=2023-07-31`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": file.type
      },
      body: file
    });
  } else {
    response = await fetch(`${endpoint}/formrecognizer/documentModels/prebuilt-read:analyze?api-version=2023-07-31`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ urlSource: url })
    });
  }

  const op = response.headers.get("operation-location");

  let result;

  while (true) {
    const res = await fetch(op, {
      headers: { "Ocp-Apim-Subscription-Key": key }
    });

    result = await res.json();
    if (result.status === "succeeded") break;

    await new Promise(r => setTimeout(r, 1500));
  }

  let text = "";

  result.analyzeResult.pages.forEach(p => {
    p.lines.forEach(l => {
      text += l.content + " ";
    });
  });

  fullText = text;

  document.getElementById("result").innerText = text;

  generateSummary(text);
  extractKeywords(text);
}

// 🔑 KEYWORD EXTRACTION (SMART LOGIC)
function extractKeywords(text) {

  const stopWords = ["the","is","and","of","to","in","a","for","on","with","as","by","an"];

  let words = text.toLowerCase().split(/\W+/);

  let freq = {};

  words.forEach(word => {
    if (!stopWords.includes(word) && word.length > 3) {
      freq[word] = (freq[word] || 0) + 1;
    }
  });

  let sorted = Object.keys(freq).sort((a,b) => freq[b]-freq[a]);

  let keywords = sorted.slice(0, 8);

  document.getElementById("keywords").innerText =
    keywords.join(", ");
}

// 📄 SUMMARY
function generateSummary(text) {
  let sentences = text.split(".").slice(0, 2);
  document.getElementById("summary").innerText =
    sentences.join(". ") + ".";
}

// COPY
function copyText() {
  navigator.clipboard.writeText(fullText);
  alert("Copied!");
}

// DOWNLOAD
function downloadText() {
  const blob = new Blob([fullText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "result.txt";
  a.click();
}
