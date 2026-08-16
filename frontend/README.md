# Aura Assist

Build a highly interactive, modern AI Customer Support web application designed as a premium AI product portfolio project.

The website should feel polished, futuristic, and professional — similar to a modern AI SaaS application.

DESIGN:

Dark modern AI-themed interface

Premium glassmorphism cards

Subtle animated gradient background

Soft glowing effects

Floating particles or subtle animated background elements

Smooth page transitions

Beautiful typography

Responsive on desktop, tablet, and mobile

Avoid excessive animations; keep everything smooth and professional

HERO / HEADER:

Large animated heading: "AI Customer Support"

Subtitle: "Intelligent answers powered by RAG and AI"

Small status indicator showing "AI Assistant Online"

Subtle pulsing green status dot

Add a small animated AI/robot icon

CHAT INTERFACE:

Large glass-style chat panel

Welcome message from the AI when the page loads:
"Hi! 👋 I'm your AI Customer Support Assistant. How can I help you today?"

User messages should appear on the right

AI messages should appear on the left

Animate new messages smoothly when they appear

Add typing animation while waiting for the API response

Add a subtle animated AI avatar

Auto-scroll to the newest message

INPUT:

Modern rounded input box

Placeholder: "Ask me about refunds, shipping, cancellations..."

Animated Send button

Send button should have hover and click animations

Pressing Enter should send the message

Disable the Send button while waiting for a response

AI RESPONSE:
The backend API will return:

{
"question": "Can I get a refund after 20 days?",
"answer": "Yes. You can request a refund within 30 days of purchase...",
"confidence": 1,
"source": "policy_checker"
}

Display:

AI answer

Confidence score as a small visual indicator

Source badge

For source:

"policy_checker" → display "Policy Checker"

"rag" → display "Knowledge Base / RAG"

Use subtle animations when displaying these elements.

ESCALATION:
If the API returns an answer indicating that the information is unavailable, show a professional animated escalation card:

"Your question requires additional assistance."

"Your request has been forwarded for further review."

Use an appropriate warning/support icon and subtle animation.

API CONNECTION:
The frontend will connect to an existing FastAPI backend.

API endpoint:
POST http://localhost:8000/ask

Request:

{
"question": "user's question"
}

Do NOT create a new backend or database.

Create only the frontend interface and API integration.

TECHNOLOGY:

React

TypeScript

Tailwind CSS

Modern component architecture

Use clean reusable components

Keep the code easy to modify and maintain

IMPORTANT:
Prioritize excellent visual design, smooth animations, responsive behavior, and a premium AI-product feel.

Do not make the interface overly complicated or cluttered.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb2c37eb-6406-44d6-a236-e315f796a8f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
