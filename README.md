# FraudLens AI

> **Detect Fraud Before It Happens.**
> An AI-powered multimodal fraud investigation assistant built with **Gemma 4** for the **Build with Gemma 4 – AI Durg Hackathon (Track 3: Open Track)**.

---

## Overview

FraudLens AI helps users identify and understand potential digital scams before financial loss occurs.

Modern fraud is no longer limited to emails and SMS. Scammers now exploit multiple communication channels including WhatsApp, social media, voice calls, fake advertisements, and manipulated videos.

FraudLens AI enables users to upload suspicious content and receive a structured fraud analysis powered by **Gemma 4**.

Supported content types:

* Text Messages
* SMS
* Emails
* Screenshots
* Images
* Audio Recordings
* Voice Notes
* Videos

The system analyzes submitted content and provides:

* Fraud Classification
* Risk Assessment
* Social Engineering Detection
* Threat Indicators
* Confidence Score
* Safety Recommendations

---

## Problem Statement

Digital fraud has become increasingly sophisticated and difficult for everyday users to identify.

Common threats include:

* Banking Phishing
* UPI Scams
* Investment Frauds
* Job Scams
* Lottery Scams
* Fake Customer Support
* Identity Impersonation

Many victims lose money because fraudulent content appears legitimate and creates urgency, fear, or false trust.

FraudLens AI aims to bridge this gap through explainable AI-powered fraud analysis.

---

## Target Users

### Primary Users

* Students (Gen Z)
* Senior Citizens

### Secondary Users

* Online Shoppers
* Small Business Owners
* UPI Users
* General Internet Users

---

## Key Features

### Multimodal Fraud Analysis

Analyze:

* Text
* Images
* Audio
* Video

### Scam Classification

Detect:

* Phishing Attacks
* Banking Fraud
* Investment Scams
* UPI Fraud
* Job Scams
* Impersonation Attacks

### Risk Assessment

Generate:

* Risk Level
* Confidence Score
* Threat Category

### Social Engineering Detection

Identify tactics such as:

* Urgency Manipulation
* Fear-Based Pressure
* Authority Impersonation
* Greed Exploitation
* Emotional Manipulation

### Actionable Recommendations

Provide:

* Safety Advice
* Verification Steps
* Response Recommendations

---

## How It Works

```text
User Submission
       │
       ▼
Content Processing Layer
       │
       ▼
Gemma 4 Intelligence Engine
       │
       ▼
Fraud Analysis Engine
       │
       ▼
Risk Assessment
       │
       ▼
Investigation Report
```

---

## System Architecture

### Text Analysis

```text
Text Input
     │
     ▼
Gemma 4
     │
     ▼
Fraud Classification
     │
     ▼
Investigation Report
```

### Image Analysis

```text
Image Upload
      │
      ▼
OCR Processing
      │
      ▼
Gemma 4
      │
      ▼
Fraud Analysis
```

### Audio Analysis

```text
Audio File
     │
     ▼
Speech-to-Text
     │
     ▼
Gemma 4
     │
     ▼
Risk Assessment
```

### Video Analysis

```text
Video Upload
      │
      ▼
Frame Extraction
      │
      ▼
Audio Extraction
      │
      ▼
Gemma 4
      │
      ▼
Threat Analysis
```

---

## Gemma 4 Integration

Gemma 4 serves as the core intelligence layer of FraudLens AI.

### Responsibilities

#### Fraud Classification

Classifies suspicious content into categories such as:

* Banking Fraud
* Investment Scam
* Job Scam
* UPI Fraud
* Phishing

#### Risk Assessment

Determines:

* Threat Severity
* Risk Level
* Confidence Score

#### Social Engineering Analysis

Identifies manipulation techniques including:

* Urgency
* Fear
* Trust Exploitation
* Authority Abuse

#### Recommendation Generation

Produces:

* Safety Guidance
* Verification Suggestions
* Next-Step Recommendations

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* FastAPI

### Database

* MongoDB Atlas

### AI Layer

* Gemma 4

### Deployment

* Vercel
* Render
* MongoDB Atlas

---

## Example Workflow

### User Input

```text
Your bank account will be suspended.
Click the link below immediately to verify your identity.
```

### FraudLens AI Output

```text
Risk Level: HIGH

Fraud Type:
Banking Phishing

Confidence:
94%

Indicators:
• Urgent language
• Banking impersonation
• Suspicious verification request

Recommendation:
Do not click the link.
Verify directly through your bank's official website.
```

---

## Innovation

Unlike traditional scam detectors that only classify content as "scam" or "safe", FraudLens AI provides:

* Explainable AI Analysis
* Social Engineering Detection
* Multimodal Investigation
* Human-Readable Reports
* Action-Oriented Guidance

This allows users to understand *why* content is dangerous rather than relying on a binary prediction.

---

## Future Scope

* Regional Language Support
* Browser Extension
* WhatsApp Integration
* Real-Time Threat Intelligence
* Government Cybercrime Reporting Integration
* Community Fraud Intelligence Network

---

## Team

**Team Name:** [Your Team Name]

| Member   | Role              |
| -------- | ----------------- |
| Member 1 | Frontend Engineer |
| Member 2 | Backend Engineer  |
| Member 3 | AI Engineer       |

---

## Hackathon Information

**Event:** Build with Gemma 4 – AI Durg
**Track:** Track 3 – Open Track
**Powered By:** Google Gemma 4

---

## License

This project is developed for educational and hackathon purposes.

FraudLens AI does not provide legal, financial, or cybersecurity guarantees. Users should verify critical decisions through official channels.
