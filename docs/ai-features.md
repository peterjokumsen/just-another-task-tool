# AI Features & Integration Notes

This application leverages Azure AI features to improve user productivity while demonstrating an understanding of cloud-enabled AI service integration for certification practice.

## Core Features

### 1. Task Auto-Categorization

When a user types a new task (e.g., "Mow the front lawn before Sunday"), the system will silently trigger an Azure AI Language service or a small prompt to Azure OpenAI to determine optimal categories and urgency.

**Pipeline Flow:**

1. User submits task creation request to the API.
2. The Azure Function catches the request and forwards the title/description payload to Azure AI endpoints.
3. Azure AI models return suggested tags (e.g., `[Yardwork, Outdoors]`).
4. The task is saved into Cosmos DB with auto-populated tags.

### 2. Large Task Breakdown (Generative AI)

For complex assignments (e.g., "Build the garden shed"), users can click an **"AI Assist: Break It Down"** button. The application will use an LLM model to generate smaller, manageable sub-tasks.

**Pipeline Flow:**

1. User explicitly requests task break-down via the UI on an existing or draft task.
2. An Azure Function endpoint orchestrates the call to Azure OpenAI (e.g., `gpt-3.5-turbo` or `gpt-4o-mini`).
3. The prompt explicitly commands a JSON-formatted list of 3-5 sub-steps.
4. The UI processes the list and proposes the sub-tasks for user approval before saving them to Cosmos DB.

## Free Tier / Cost Minimization Strategy

Using `Standard` Azure OpenAI incurs costs. If budget strictly forbids any minor consumption charges, this project can implement the AI interfaces as abstract services, allowing local API mocked returns, or substituting with standard Azure Text Analytics (which often has a free tier 5,000 requests/month) for categorization, and a mock text-splitter generator for local dev until the exact exams require OpenAI practice.
