mtm6302-capstone-bake0397

APOD
Taylor Baker
40895584

Part 4 – Development Report
Overview

This phase focused on building the interactive functionality for the APOD web application, including API integration, favourites storage, modal features, accessibility improvements, and responsive UI behaviour.

Steps Taken
1. API Integration

Implemented APOD API requests using a dynamic date parameter.

Displayed standard images using url and high-definition images using hdurl.

Added date validation to prevent future selections.

2. Rendering APOD Content

Displayed APOD image, date, title, and explanation in the main hero section.

Added a dedicated HD image modal that opens when the hero image is clicked.

3. Favourites Feature

Built a favourites system using localStorage that stores APOD data by date.

Added a heart button that visually toggles between outline and filled states.

Heart resets automatically when viewing an APOD that is not saved.

4. Favourites Gallery

Rendered saved APODs as a responsive 5-column grid.

Used object-fit: cover so all thumbnails share a consistent aspect ratio.

Each image includes “View” and “Delete” buttons.

5. Modal Systems

Created two separate modals:

APOD View Modal (large image + details)

Calendar Modal (opens from nav + footer)

Selecting a date in the calendar modal automatically loads its APOD and closes the modal.

6. Accessibility Enhancements

Added targeted ARIA labels.

Implemented a Skip to Top button that appears only after scrolling past the header.

Styled using Bootstrap utilities to keep CSS minimal.

Resources Used

NASA APOD API – https://api.nasa.gov

Bootstrap 5 – layout, grid, and responsive utilities

Bootstrap Icons – heart icon and UI icons

Google Fonts (Poppins) – site typography

MDN Web Docs – DOM, events, Fetch API reference

Challenges

Calendar modal not triggering from footer link.

Favourites “View” button opening content below the footer before modal CSS was applied.

Getting the favourites grid to align evenly across screen sizes.

Resetting the heart button correctly depending on whether the APOD was saved.

Managing multiple modals without visual conflicts.

General beginner challenges: async fetch logic, dynamic DOM injection, state management, and localStorage handling.

Additional Features Added

Responsive favourites gallery

Skip link with scroll-trigger visibility

HD hero image modal

Calendar modal accessible from both nav and footer

Heart button state syncing