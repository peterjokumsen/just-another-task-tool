# Just Another Task Tool (JATT)

A responsive, cross-platform task management application designed for families and teams to handle one-off and repeatable tasks (daily, weekly, monthly).

This project also serves as a practical sandbox to practice concepts for Azure cloud certifications, encompassing core Azure development fundamentals and Azure AI fundamentals.

## Key Features

- **Team/Family Groups**: Organize tasks within specific user groups.
- **Repeatable Tasks**: Support for daily, weekly, and monthly recurring tasks.
- **Role-Based Access**: Simple access controls (e.g., Parent/Admin vs. Child/Member).
- **AI-Powered Productivity**:
  - Auto-categorization of tasks using Azure AI.
  - Generative breakdown of large, complex tasks into smaller, achievable sub-tasks.

## Technology Stack

This is an Nx monorepo containing multiple applications:

- **Web Frontend**: Angular (hosted fully static via Azure Static Web Apps).
- **Mobile Frontend**: React Native (iOS/Android cross-platform).
- **Backend API**: Azure Functions (Serverless C#).
- **Database**: Azure Cosmos DB (NoSQL).
- **Identity**: Microsoft Entra External ID / Azure AD B2C.

## Documentation

Comprehensive guides are located in the `docs/` folder to help you navigate, run, and deploy the project:

- [Architecture Overview](docs/architecture.md) - System design and data flow.
- [Azure Setup](docs/azure-setup.md) - How to provision free-tier Azure services.
- [Development Guide](docs/development.md) - Instructions for local setup and running the apps.
- [AI Capabilities](docs/ai-features.md) - How AI features are implemented and configured.

## License

See the `LICENSE` file in the root directory.
