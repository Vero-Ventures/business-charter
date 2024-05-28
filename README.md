# Business Charter

- [**Project Overview**](#project-overview)
- [**Project Description**](#project-description)
- [**Programming Languages**](#programming-languages)
- [**Hardware/Software Requirements**](#hardwaresoftware-requirements)
- [**Installation**](#installation)
- [**Project Structure**](#project-structure)
- [**Architecture and Design**](#architecture-and-design)
- [**Usage**](#usage)
- [**Testing**](#testing)
- [**Deployment**](#deployment)

# **Project Overview**

- **Description:** This project aims to develop a custom Large Language Model (LLM) to assist business owners and families in crafting a "Corporate Charter." The LLM will guide users towards a unified vision, mission, values, and philanthropic goals. The project proposes automating and enhancing this process using an LLM.
- **Status:** Currently, the project is at the integration phase where the LLM is being integrated with the chatbot and database to auto-update fields based on client responses.

# **Project Description**

This project aims to develop a custom Large Language Model (LLM) to assist business owners and families in crafting a "Corporate Charter." The LLM will guide users towards a unified vision, mission, values, and philanthropic goals.

**Traditional Approach:**

- Specialized advisors traditionally handle this process.

**Proposed Solution:**

- The LLM will replace the advisor role by:
  - Employing probing questions to uncover stakeholders' or family members' underlying values and goals.
  - Compiling these findings into a cohesive charter document for review and agreement.
  - Allowing users to edit and refine the charter collaboratively.

**Technical Approach:**

- The LLM will leverage existing LLM APIs, fine-tuned on relevant business literature and regulations.
- Users will interact with the LLM through a progressive web app interface.

# **Programming Languages**

- **AI/ML Components:** Primarily Python
- **Progressive Web App Interface:** TypeScript

# **Hardware/Software Requirements**

- **Programming Languages:** Python, TypeScript
- **Libraries/Frameworks:**
  - PyTorch for deep learning
  - Selenium for web scraping (potentially)
  - Pandas for data manipulation
  - Other AI/ML libraries as needed
- **APIs:** Existing LLM APIs for model interaction
- **Tools:**
  - IDE for development
  - Code interpreter
  - Web browser for research
  - Potentially DevOps tools for CI/CD (continuous integration and deployment)
- **Computational Resources:** Local AI/ML server with high computational power for training, development, and deployment of the LLM.

# **Installation**

- **Prerequisites:**
  - Node.js and npm
  - Python 3.8+
  - Virtual environment tools (venv, virtualenv)
  - Git
  - Docker (optional, for containerized deployment)
  - IDE (VSCode, PyCharm, etc.)

- **Setup:**
  1. Clone the repository:
     ```bash
     git clone https://github.com/your-repo/business-charter.git
     cd business-charter
     ```
  2. Install dependencies:
     ```bash
     npm install
     pip install -r requirements.txt
     ```

- **Configuration:**
  - Create a `.env` file based on the `.env.example` file and fill in the necessary environment variables:
    ```bash
    cp .env.example .env
    ```

# **Project Structure**

- **Key Files and Their Functionalities:**
- `src/app/chat/`: Contains components and hooks related to the chat functionality.
- `src/app/contacts/`: Manages contact-related functionalities.
- `src/app/family/`: Handles family member data and interactions.
- `src/app/family-crest/`: Manages family crest-related features.
- `src/app/family-garden/`: Contains the family garden store and related components.
- `src/app/family-management/`: Includes components for managing family members.
- `src/app/family-tree/`: Manages the family tree structure.
- `src/components/`: Reusable UI components.
- `src/utils/`: Utility functions and helpers.
- `src/styles/`: CSS and styling files.

# **Architecture and Design**

- **System Overview:**
- High-level architecture diagram (to be provided).
- Database Diagrams and ERDs (to be provided).

- **Technologies Used:**
- **Programming Languages:** Python, TypeScript
- **Frameworks/Libraries:** Next.js, React, PyTorch, Selenium (potentially), Pandas
- **APIs:** Existing LLM APIs for model interaction

- **Modules and Components:**
- **Chat Module:** Handles interactions with the LLM.
- **Family Management Module:** Manages family data and interactions.
- **PDF Generation Module:** Generates family charters in PDF format.

# **Usage**

- **Examples:**
- To start the development server:
  ```bash
  npm run dev
  ```
- To interact with the chatbot and generate a family charter:
  1. Navigate to the chat module in the web app.
  2. Answer the questions prompted by the chatbot.
  3. Review and edit the generated charter.

- **Screenshots:**
- (Include screenshots of key features, if available)

# **Testing**

- **Test Setup:**
- Ensure all dependencies are installed.
- Set up environment variables as described in the Installation section.

- **Running Tests:**
- To run unit tests:
  ```bash
  npm run test
  ```

- **Test Coverage:**
- Coverage reports can be generated using Jest:
  ```bash
  npm run test:coverage
  ```

# **Deployment**

- **Deployment Instructions:**
1. Build the project for production:
   ```bash
   npm run build
   ```
2. Deploy using Docker (optional):
   ```bash
   docker build -t business-charter .
   docker run -p 3000:3000 business-charter
   ```

- **Environment Configurations:**
- Ensure the `.env` file is configured for the target environment (development, staging, production).
