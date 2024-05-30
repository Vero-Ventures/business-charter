## **Project Description**

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

## **Programming Language(s)**

- **AI/ML Components:** Primarily Python
- **Progressive Web App Interface:** Typescript

## **Hardware/Software Requirements**

- **Programming Languages:** Python, Typescript
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

## **Current Work/Arrangement**

- Currently, charters are developed through consultations with family offices or specialized advisors.
- This project proposes automating and enhancing this process using an LLM.

**Technical Implementation:**

- The development will focus on Python and Typescript.
- Data science, machine learning libraries, and LLM APIs will be used to create the LLM's questioning pipeline and charter compilation functionalities.

## Testing
- Install packages using `npm i`, and run one of the following commands:
  - npm run test : Runs Jest unit tests (**Be warned that there may be a bit of lag, as there is an existing bug in the configuration/code**).
  - npm run test:e2e : Runs Playwright E2E tests, can use --debug to follow step by step.
  - npm run coverage: Runs Jest unit tests with code coverage and creates formatted coverage report in console.
 
## Pre-commits
- Install the pre-commits locally by installing packages using `npm i`.
- Be warned that if you ignore, uninstall, or forget to install the pre-commit hooks, there is a good chance that the GitHub Actions workflow that runs on push/pull request will fail due to formatting/linting issues you may have failed to notice.

## Docker
- The root directory contains a compose.yaml to build a container running the docker image with the existing Dockerfile.
  - To build an image using the Dockerfile, run `docker build -t [name] .` in the root directory.
  - To build a compose container of all the images, run `docker compose up -d` in the root directory.
