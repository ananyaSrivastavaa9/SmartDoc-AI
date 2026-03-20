![Status](https://img.shields.io/badge/Status-Live-green)
![Made With](https://img.shields.io/badge/Made%20With-JavaScript-blue)

# SmartDoc AI — Azure Document Intelligence Dashboard

## Overview

**Azure Document Intelligence** (formerly Form Recognizer) is a cloud-based AI service by Microsoft that enables developers to extract text, key-value pairs, and structured data from documents such as PDFs, images, and scanned files. It uses advanced machine learning models to analyze and process documents in real time.

This project, **SmartDoc AI**, is a web-based dashboard built on top of Azure Document Intelligence. It provides an interactive interface to upload or analyze documents and visualize extracted content along with additional AI-powered features.

---

## Live Demo

https://ananyasrivastavaa9.github.io/SmartDoc-AI/

---

## Features

* Upload and analyze documents (PDF, JPG, PNG)
* Analyze documents directly via URL
* Real-time text extraction using Azure Document Intelligence
* Document preview (image/PDF)
* Analytics dashboard (pages, words, lines)
* Basic AI-powered summary generation
* Simple document query system (chat-like interaction)
* Download extracted text
* Clean and responsive user interface

---

## Screenshots

### Application Interface

<img width="1913" height="963" alt="image" src="https://github.com/user-attachments/assets/e7b29159-334c-40ec-b3e0-9bd4d7dc6549" />


### Extracted Output & Analytics

<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/02d61583-4b38-45b3-9a32-26e233b9749c" />


### AI Summary and Query

<img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/bfc3c5c3-1e50-4e14-a1d7-99351ef0307c" />


---

## Tech Stack

* HTML
* CSS (modern UI with glassmorphism design)
* JavaScript (Vanilla JS)
* Azure Document Intelligence REST API

---

## How It Works

1. The user provides an Azure endpoint and API key.
2. A document is uploaded or a public URL is provided.
3. The application sends the document to Azure Document Intelligence.
4. The service processes the document and returns structured results.
5. The frontend extracts:

   * Text content
   * Page-level information
6. Additional processing is applied to:

   * Generate a short summary
   * Enable simple query-based interaction
7. Results are displayed in a dashboard format.

---

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. Enter your Azure Document Intelligence:

   * Endpoint
   * API Key
4. Upload a document or provide a URL
5. Click **Analyze**

---

## Notes

* API credentials are not stored in the code; they are provided at runtime.
* Some URLs may not work due to external access restrictions (CORS).
* This project is frontend-only and directly interacts with Azure APIs.

---

## Future Improvements

* Backend integration for secure API handling
* Integration with advanced AI models for better summarization
* Document history and storage
* Authentication system
* Improved query understanding

---

## Author

Ananya Srivastava

---

If you found this project useful, consider starring the repository.
