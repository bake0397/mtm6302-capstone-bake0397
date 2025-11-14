# **mtm6302-capstone-bake0397**  
APOD  
**Taylor Baker**  
**40895584**

---

# **Part 4 – Development Report**

## **Overview**
This phase focused on building the interactive functionality for the APOD web application, including API integration, favourites storage, modal interactions, accessibility improvements, and responsive layout behaviour.

---

## **Steps Taken**

### **1. API Integration**
- Implemented APOD API requests using a dynamic date value.
- Displayed standard images using `url` and high-definition images using `hdurl`.
- Added validation to prevent selecting future dates.

### **2. Rendering APOD Content**
- Displayed APOD image, title, explanation, and date in the main hero section.
- Added an HD image modal that opens when the main APOD is clicked.

### **3. Favourites System**
- Stored favourites in `localStorage` using the APOD date as the key.
- Added a heart button with a filled/outline visual toggle.
- Heart resets when viewing an APOD that is *not* favourited.

### **4. Favourites Gallery**
- Rendered saved APODs in a responsive 5-column grid layout.
- Used `object-fit: cover` for consistent thumbnail aspect ratios.
- Added “View” and “Delete” buttons for each favourite.

### **5. Modal Features**
- Added two custom modals:
  - **APOD View Modal** for enlarged image display  
  - **Calendar Modal** for selecting an APOD date
- Selecting a date in the calendar modal automatically loads that APOD and closes the modal.

### **6. Accessibility Enhancements**
- Added ARIA labels where needed.
- Added a **Back to Top** skip link that becomes visible after scrolling.
- Used Bootstrap utilities to reduce CSS length.

---

## **Resources Used**
- **NASA APOD API** – https://api.nasa.gov  
- **Bootstrap 5** – grid, layout, utilities  
- **Bootstrap Icons** – interface icons  
- **Google Fonts (Poppins)** – typography  
- **MDN Web Docs** – DOM, Fetch API, event listeners  

---

## **Accessibility References (ARIA)**
To ensure the modals, skip links, and dynamic content were accessible, the following resources were used:

- **MDN ARIA Authoring Practices**  
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA  
- **WAI-ARIA Overview (W3C Web Accessibility Initiative)**  
  https://www.w3.org/WAI/standards-guidelines/aria/  
- **Modal Dialog Accessibility Guidelines (W3C)**  
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/  
- **Using ARIA: Roles, States, and Properties**  
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles  

These resources were referenced when deciding where to apply attributes such as:  
`aria-hidden`, `aria-label`, and accessible modal behaviours.


---

## **Challenges**
- Getting the calendar modal to open from both the nav and footer.
- View button originally displaying enlarged images below the footer instead of in a modal.
- Achieving a fully responsive favourites gallery layout.
- Ensuring heart button properly resets when switching between saved/unsaved APODs.
- Managing multiple modal overlays without conflict.
- Common beginner challenges: handling fetch promises, DOM injection, conditional UI states, and working with `localStorage`.

---

## **Additional Features Added**
- Responsive favourites gallery  
- High-definition APOD modal  
- Calendar modal (nav + footer access)  
- “Back to Top” skip link with scroll-activated visibility  
- Heart button fill behaviour  
