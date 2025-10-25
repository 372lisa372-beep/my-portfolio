# Mythic Quiz

A interactive web-based quiz application about mythology, built with HTML, CSS, and JavaScript.

## Features

- Interactive mythology quiz with multiple-choice questions
- Responsive design that works on desktop and mobile devices
- Score tracking and results display
- Beautiful gradient styling and smooth animations
- Randomized question order for each quiz session

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Running the Application

1. Open the `index.html` file in your web browser
2. Click "Start Quiz" to begin
3. Select answers by clicking on the answer buttons
4. View your final score at the end

### Project Structure

```
mythic-quiz/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── .github/
    └── copilot-instructions.md
```

## Customization

### Adding New Questions

To add new quiz questions, edit the `questions` array in `script.js`:

```javascript
const questions = [
    {
        question: "Your question here?",
        answers: [
            { text: "Option 1", correct: false },
            { text: "Option 2", correct: true },
            { text: "Option 3", correct: false },
            { text: "Option 4", correct: false }
        ]
    }
    // Add more questions...
];
```

### Styling

Modify `styles.css` to change colors, fonts, layout, or animations to match your preferences.

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, gradients, and responsive design
- **JavaScript** - Interactive functionality and quiz logic

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.