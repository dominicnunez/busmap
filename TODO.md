# TODO

## Features to Implement

### Other features
- Use LocalStorage
- Sticky headers
- Enable exporting the student list to CSV or JSON format.
- Implement an import feature to allow uploading a file to populate the student list.

### AddStudent component changes:

- Add dropdown field showing existing students
- Selected sibling's ID gets added to siblings array
- Both students' siblings arrays update bidirectionally

### Table component changes:

- Add "Link Siblings" button in actions column
- Button opens modal with dropdown of unlinked students
- Updates siblings arrays for both students

### State management in App.js:

- Add helper function to handle bidirectional linking
- Track student IDs using timestamp or UUID
- Update student state to reflect sibling relationships

## Improvements
- Enhance form validation in `AddStudent` (e.g., prevent negative stop numbers, handle invalid input gracefully).
- Add success and error feedback messages for actions like adding, editing, or deleting students.
- Improve search functionality to include "Stop Number" and other possible fields.

## Styling/UI Enhancements
- Add animations or transitions to modals and buttons for a polished experience.
- Configure Tailwind themes to support dark mode.

## Testing
- Write unit tests for `AddStudent` to verify form behavior and validations.
- Write unit tests for `StudentTable` to ensure correct filtering, rendering, and actions.
- Add integration tests for the entire workflow (add/edit/delete students).
- Perform an accessibility audit using tools like axe or Lighthouse to ensure compliance.


