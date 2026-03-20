const fileInput = document.getElementById("fileInput");
let fullText = "";

// PREVIEW
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  const img = document.getElementById("imgPreview");
  const pdf = document.getElementById("pdfPreview");

  img.classList.add("hidden");
  pdf.classList.add("hidden");

  if (!file) return;

  const url = URL.createObjectURL(file);

  if (file.type.includes("image")) {
    img.src = url;
    img.classList.remove("hidden");
  } else if (file.type === "application/pdf") {
    pdf.src = url;
    pdf.classList.remove("hidden");
  }
});

// ANALYZE
async function analyze() {
  const endpoint = document.getElementById("endpoint").value;
  const key = document.getElementById("key").value;
  const file = fileInput.files[0];
  const url = document.getElementById("urlInput").value;

  const loader = document.getElementById("loader");
  const resultBox = document.getElementById("result");

  loader.classList.remove("hidden");
  resultBox.innerText = "🔍 Analyzing document...";

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
  let words = 0;
  let lines = 0;

  result.analyzeResult.pages.forEach(p => {
    lines += p.lines.length;
    p.lines.forEach(l => {
      text += l.content + "\n";
      words += l.content.split(" ").length;
    });
  });

  fullText = text;

  document.getElementById("result").innerText = text || "⚠️ No text found";
  document.getElementById("pages").innerText = result.analyzeResult.pages.length;
  document.getElementById("words").innerText = words;
  document.getElementById("lines").innerText = lines;

  generateSummary(text);

  loader.classList.add("hidden");

  // 🔥 AUTO SCROLL FIX
  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });
}

// SUMMARY
function generateSummary(text) {
  let sentences = text.split(".").slice(0, 3);
  document.getElementById("summary").innerText = sentences.join(". ") + ".";
}

// CHAT
function askQuestion() {
  let q = document.getElementById("question").value.toLowerCase();
  let ans = "Not found in document";

  if (fullText.toLowerCase().includes(q)) {
    ans = "Yes, this is mentioned in the document.";
  }

  document.getElementById("answer").innerText = ans;
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
