---
name: core-skills
description: "Use when planning, generating, reviewing, executing, or debugging Playwright tests in this workspace. Applies the project API, assertion, Page Object Model, execution, and test-design standards to the available Playwright agents."
---

# Core Playwright Standards

Use these references as the project standards when working through a Playwright agent. Load only the references relevant to the task, and read the full reference before applying it:

- Test planning or test authoring: [TEST_DESIGN_SKILL.md](./TEST_DESIGN_SKILL.md)
- Creating or extending page objects: [POM_CREATION_SKILL.md](./POM_CREATION_SKILL.md)
- Writing or repairing assertions: [ASSERTION_SKILLS.md](./ASSERTION_SKILLS.md)
- Running or debugging tests: [POM_EXECUTION_SKILLS.md](./POM_EXECUTION_SKILLS.md)
- API and hybrid UI/API coverage: [API_SKILLS.md](./API_SKILLS.md)

Combine references when the task spans multiple areas. For example, generating a UI test uses test design, POM creation, and assertion guidance; healing a failing test uses execution and assertion guidance, plus POM creation if a page object changes.

Use the browser and test tools available to the selected Playwright agent. The CLI commands in the references are examples for CLI workflows, not a requirement for agents that have browser or test-runner tools. Use the CLI only when requested or when the selected agent has no suitable tool.

Follow the current workspace configuration and existing code conventions where examples differ. In generated tests, keep UI actions in page objects and assertions in test files; prefer Playwright's retrying `expect` assertions and accessible locators.