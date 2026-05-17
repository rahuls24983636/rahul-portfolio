# Rahul Portfolio

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Features

- **Modern Design** - Clean, professional aesthetic with gradient accents
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Interactive Animations** - Smooth scroll, hover effects, and typing animation
- **Easy to Customize** - Well-organized code for easy modifications

## Sections

1. **Hero** - Introduction with typing animation and call-to-action buttons
2. **About** - Personal information with experience highlights
3. **Skills** - Technical skills organized by category (Frontend & Backend)
4. **Projects** - Showcase of 6 sample projects with tech stack tags
5. **Contact** - Contact form and multiple contact methods

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local server for development (Live Server extension, Python http.server, etc.)

### Installation

1. Clone or download this repository
2. Navigate to the project folder
3. Open `index.html` in your browser

```bash
cd rahul-portfolio
# For a quick local server (optional)
python -m http.server 8000
# or
npx live-server
```

### Customization

#### Personal Information
- Open `index.html` and update:
  - Name in the hero section
  - About description
  - Contact information (email, social links)
  - Project details

#### Colors
- Edit `styles.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other variables ... */
}
```

#### Projects
- Replace project icons, titles, descriptions, and tech tags in the Projects section
- Update the project links to point to your actual repositories or live demos

#### Profile Image
- To add your actual photo, replace the avatar icon with an `<img>` tag:
```html
<img src="path-to-your-image.jpg" alt="Rahul" class="hero-avatar-img">
```

## File Structure

```
rahul-portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Custom Properties
- **JavaScript** - Interactivity, Animations, Form handling
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Deployment

This portfolio can be easily deployed to:
- **GitHub Pages** - Free hosting directly from your repository
- **Netlify** - Drag and drop deployment
- **Vercel** - Git integration for seamless deployments
- **Firebase Hosting** - Google's fast and secure hosting

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- Email: rahul@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com)
- GitHub: [Your GitHub](https://github.com)

---

**Enjoy your new portfolio!** Feel free to star ⭐ this repository if you found it helpful.
