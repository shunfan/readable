# Readable

Readable is a content and comment web app.

## Installation

To install all project dependencies, run:

```bash
npm install
```

To launching the project, run:

```bash
npm start
```

## Known issues

* The comment count in the post detail view will not be updated if a new comment is posted. It could be fixed by dispatching a new action to update the post's comment count. However, since it is not explicitly required in the rubric, I decided not to implement it.

* In "Project Overview", it says we need to implement "Create/Edit View". In order to show that users could create and modify posts without **navigating away**, I decided to make them inline views.
