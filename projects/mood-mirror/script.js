// MoodMirror JavaScript - Handles user interactions and personalized responses

class MoodMirror {
    constructor() {
        this.currentMood = null;
        this.userName = '';
        this.moodHistory = this.loadHistory();
        this.initializeElements();
        this.attachEventListeners();
        this.personalizedMessages = this.initializeMessages();
        this.poeticResponses = this.initializePoetry();
        this.previewTimeout = null;
    }

    initializeElements() {
        this.nameInput = document.getElementById('nameInput');
        this.moodButtons = document.querySelectorAll('.mood-btn');
        this.inputSection = document.getElementById('inputSection');
        this.resultSection = document.getElementById('resultSection');
        this.historySection = document.getElementById('historySection');
        this.userEmoji = document.getElementById('userEmoji');
        this.userNameDisplay = document.getElementById('userName');
        this.personalizedMessage = document.getElementById('personalizedMessage');
        this.resetBtn = document.getElementById('resetBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.historyBtn = document.getElementById('historyBtn');
        this.closeHistoryBtn = document.getElementById('closeHistoryBtn');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.exportHistoryBtn = document.getElementById('exportHistoryBtn');
        this.historyList = document.getElementById('historyList');
        this.totalEntries = document.getElementById('totalEntries');
        this.dominantMood = document.getElementById('dominantMood');
        this.streakDays = document.getElementById('streakDays');
    }

    attachEventListeners() {
        // Name input validation
        this.nameInput.addEventListener('input', (e) => {
            this.userName = e.target.value.trim();
        });

        // Mood selection and preview
        this.moodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectMood(button);
            });
            
            // Real-time mood preview on hover
            button.addEventListener('mouseenter', (e) => {
                this.previewMood(button.dataset.mood);
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.clearPreview();
            });
        });

        // Button event listeners
        this.resetBtn.addEventListener('click', () => {
            this.resetMirror();
        });
        
        this.exportBtn.addEventListener('click', () => {
            this.exportReflection();
        });
        
        this.historyBtn.addEventListener('click', () => {
            this.showHistory();
        });
        
        this.closeHistoryBtn.addEventListener('click', () => {
            this.hideHistory();
        });
        
        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });
        
        this.exportHistoryBtn.addEventListener('click', () => {
            this.exportHistory();
        });

        // Enter key support
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.userName) {
                this.nameInput.blur();
            }
        });
    }

    initializeMessages() {
        return {
            happy: [
                "Your smile lights up the room! Keep spreading that wonderful energy, {name}! ✨",
                "What a beautiful day to be {name}! Your happiness is contagious and inspiring! 🌟",
                "{name}, your joy is like sunshine - it makes everything brighter around you! 🌞",
                "The world is better because you're in it, {name}! Your happiness radiates pure positivity! 💫"
            ],
            sad: [
                "{name}, it's okay to feel sad sometimes. You're stronger than you know, and brighter days are coming. 💙",
                "Even on cloudy days, {name}, remember that you are valued and this feeling will pass. 🌤️",
                "Your heart is beautiful, {name}. Take time to care for yourself - you deserve comfort and peace. 🤗",
                "Dear {name}, sadness shows your depth and humanity. Be gentle with yourself today. 💝"
            ],
            excited: [
                "{name}, your excitement is absolutely electric! Channel that amazing energy into something wonderful! ⚡",
                "Wow, {name}! Your enthusiasm is infectious - go out there and conquer the world! 🚀",
                "The universe can feel your excitement, {name}! This energy will take you to incredible places! 🎆",
                "Your passion is your superpower, {name}! Let that excitement guide you to amazing adventures! 🌪️"
            ],
            calm: [
                "{name}, your peaceful energy is like a gentle breeze. You bring tranquility wherever you go. 🍃",
                "In a chaotic world, {name}, your calmness is a gift. You're a source of serenity for others. 🧘",
                "Your inner peace shines through, {name}. This balanced energy is truly beautiful. ⚖️",
                "Like still waters run deep, {name}, your calm presence holds great wisdom and strength. 🌊"
            ],
            anxious: [
                "{name}, your feelings are valid. Take deep breaths - you have the strength to overcome this. 🌸",
                "Dear {name}, anxiety doesn't define you. You're braver than you believe and stronger than you feel. 💪",
                "One breath at a time, {name}. You've overcome challenges before, and you will again. 🦋",
                "{name}, it's okay to feel overwhelmed. You're not alone, and you have the courage to face this. 🌱"
            ],
            angry: [
                "{name}, your anger shows you care deeply. Channel that passion into positive change! 🔥",
                "Strong emotions mean a strong heart, {name}. Use this energy to fuel your determination! ⚔️",
                "{name}, your fire can light the way to justice and improvement. You have the power to make things better! 🏹",
                "That intensity is part of your strength, {name}. Let it drive you toward meaningful action! ⭐"
            ]
        };
    }

    initializePoetry() {
        return {
            happy: [
                "Like golden rays of morning sun, {name}, your joy has just begun. Dance through life with heart so free, you're exactly who you're meant to be! ✨",
                "In gardens where the flowers bloom, {name} brightens every room. Your laughter is a melody, that sets the world in harmony! 🌺",
                "Dear {name}, you shine so bright, like stars that paint the velvet night. Your happiness, a gift so rare, spreads magic everywhere! 🌟"
            ],
            sad: [
                "Through valleys deep and shadows long, {name}, know that you are strong. Like rain that feeds the earth below, from tears the brightest flowers grow. 🌧️",
                "In quiet moments, {name} dear, remember love is always near. The storm may rage, the sky may cry, but morning's light will paint the sky. 🌈",
                "Sweet {name}, when sadness calls, remember: every mighty tree that stands the tallest has weathered storms and never falls. 🌳"
            ],
            excited: [
                "Like lightning dancing through the sky, {name}'s spirit soars so high! Your energy, a blazing fire, lifts others up and they aspire! ⚡",
                "Electric {name}, your passionate heart beats like thunder, sets worlds apart! Channel this force, this burning flame, and nothing will remain the same! 🔥",
                "Vibrant {name}, your excitement flows like rivers where adventure goes! Your enthusiasm lights the way for others' bright and shining day! 🌊"
            ],
            calm: [
                "Gentle {name}, like morning dew, brings peace to all and sees things through. In stillness, wisdom softly speaks, and serenity is what it seeks. 🍃",
                "Peaceful {name}, your tranquil soul makes broken spirits feel more whole. Like lakes that mirror sky above, you radiate pure grace and love. 🏞️",
                "Serene {name}, in chaos' storm, you are the center, safe and warm. Your presence brings a healing balm to hearts that need your gentle calm. 🧘"
            ],
            anxious: [
                "Brave {name}, though worry clouds your mind, remember you are strong and kind. Like butterflies that learn to fly, you'll soar above the cloudy sky. 🦋",
                "Dear {name}, anxiety may whisper fears, but courage dries away the tears. Each breath you take, each step you make, shows strength that none can ever break. 💪",
                "Gentle {name}, when nerves run high, remember you were born to fly. Though winds may shake the mighty tree, deep roots will set your spirit free. 🌱"
            ],
            angry: [
                "Fierce {name}, your anger burns with righteous fire that never turns from justice, truth, and what is right. You are a warrior of the light! ⚔️",
                "Strong {name}, your passion flames like forge that shapes the strongest frames. Channel this heat, this molten core, to build what wasn't there before! 🔨",
                "Mighty {name}, your fury's roar shakes foundations to the core. Use this force, this blazing might, to champion what you know is right! 🏹"
            ]
        };
    }

    selectMood(selectedButton) {
        // Validate name input
        if (!this.userName) {
            this.showNameError();
            return;
        }

        // Clear previous selections
        this.moodButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Select current mood
        selectedButton.classList.add('selected');
        this.currentMood = selectedButton.dataset.mood;
        const emoji = selectedButton.dataset.emoji;

        // Add visual feedback
        selectedButton.style.transform = 'scale(1.15)';
        setTimeout(() => {
            selectedButton.style.transform = '';
        }, 200);

        // Wait a moment then show result
        setTimeout(() => {
            this.showResult(emoji);
        }, 600);
    }

    showNameError() {
        this.nameInput.style.borderColor = '#ef4444';
        this.nameInput.style.backgroundColor = '#fef2f2';
        this.nameInput.placeholder = 'Please enter your name first!';
        
        // Add shake animation
        this.nameInput.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            this.nameInput.style.borderColor = '';
            this.nameInput.style.backgroundColor = '';
            this.nameInput.style.animation = '';
            this.nameInput.placeholder = 'Enter your name';
        }, 2000);

        this.nameInput.focus();
    }

    showResult(emoji) {
        // Apply mood-based theme
        document.body.className = `mood-${this.currentMood}`;
        
        // Update result display
        this.userEmoji.textContent = emoji;
        this.userNameDisplay.textContent = this.userName;
        
        // Get and display personalized message
        const message = this.getPersonalizedMessage();
        
        // Save to history
        this.addToHistory(this.currentMood, emoji, message);
        
        // Hide input section and show result
        this.inputSection.style.display = 'none';
        this.resultSection.style.display = 'block';
        
        // Animate message typing effect
        this.typeMessage(message);
        
        // Add celebratory particles
        this.createCelebrationEffect();
    }

    getPersonalizedMessage() {
        const messages = this.personalizedMessages[this.currentMood];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        return randomMessage.replace(/{name}/g, this.userName);
    }

    typeMessage(message) {
        this.personalizedMessage.textContent = '';
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < message.length) {
                this.personalizedMessage.textContent += message[index];
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    createCelebrationEffect() {
        // Create additional floating particles for celebration
        const colors = {
            happy: '#fbbf24',
            sad: '#3b82f6',
            excited: '#ef4444',
            calm: '#10b981',
            anxious: '#8b5cf6',
            angry: '#dc2626'
        };

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createParticle(colors[this.currentMood]);
            }, i * 100);
        }
    }

    createParticle(color) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Animate upward
        let position = startY;
        let opacity = 1;
        
        const animateParticle = () => {
            position -= 3;
            opacity -= 0.02;
            
            particle.style.top = position + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0 && position > -50) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        animateParticle();
    }

    resetMirror() {
        // Clear selections
        this.currentMood = null;
        this.moodButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Reset theme
        document.body.className = '';
        
        // Clear form
        this.nameInput.value = '';
        this.userName = '';
        
        // Show input section and hide result
        this.resultSection.style.display = 'none';
        this.inputSection.style.display = 'block';
        
        // Focus on name input
        setTimeout(() => {
            this.nameInput.focus();
        }, 300);
    }

    // Add some fun easter eggs
    addEasterEggs() {
        // Special responses for certain names
        const specialNames = {
            'mirror': 'Ah, the mirror looking at itself! How wonderfully recursive! ✨',
            'mood': 'The embodiment of mood itself has arrived! 🎭',
            'happiness': 'Pure joy in human form! 😄',
            'zen': 'The master of inner peace graces us! 🧘‍♀️'
        };

        if (specialNames[this.userName.toLowerCase()]) {
            return specialNames[this.userName.toLowerCase()];
        }

        return null;
    }

    // Real-time mood preview functionality
    previewMood(mood) {
        clearTimeout(this.previewTimeout);
        this.previewTimeout = setTimeout(() => {
            document.body.className = `mood-${mood}`;
        }, 300);
    }

    clearPreview() {
        clearTimeout(this.previewTimeout);
        this.previewTimeout = setTimeout(() => {
            document.body.className = '';
        }, 100);
    }

    // Mood history management
    loadHistory() {
        try {
            return JSON.parse(localStorage.getItem('moodMirrorHistory')) || [];
        } catch {
            return [];
        }
    }

    saveHistory() {
        localStorage.setItem('moodMirrorHistory', JSON.stringify(this.moodHistory));
    }

    addToHistory(mood, emoji, message) {
        const entry = {
            id: Date.now(),
            name: this.userName,
            mood: mood,
            emoji: emoji,
            message: message,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
        
        this.moodHistory.unshift(entry);
        
        // Keep only last 50 entries
        if (this.moodHistory.length > 50) {
            this.moodHistory = this.moodHistory.slice(0, 50);
        }
        
        this.saveHistory();
    }

    showHistory() {
        this.updateHistoryStats();
        this.renderHistoryList();
        this.historySection.style.display = 'block';
        this.resultSection.style.display = 'none';
    }

    hideHistory() {
        this.historySection.style.display = 'none';
        this.resultSection.style.display = 'block';
    }

    updateHistoryStats() {
        // Total entries
        this.totalEntries.textContent = this.moodHistory.length;
        
        // Dominant mood
        if (this.moodHistory.length > 0) {
            const moodCounts = {};
            this.moodHistory.forEach(entry => {
                moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
            });
            
            const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
                moodCounts[a] > moodCounts[b] ? a : b
            );
            
            const moodEmojis = {
                happy: '😊', sad: '😢', excited: '🤩',
                calm: '😌', anxious: '😰', angry: '😡'
            };
            
            this.dominantMood.textContent = moodEmojis[dominantMood] || '😊';
        } else {
            this.dominantMood.textContent = '😊';
        }
        
        // Calculate streak
        this.streakDays.textContent = this.calculateStreak();
    }

    calculateStreak() {
        if (this.moodHistory.length === 0) return 0;
        
        const today = new Date().toDateString();
        const dates = [...new Set(this.moodHistory.map(entry => 
            new Date(entry.timestamp).toDateString()
        ))].sort((a, b) => new Date(b) - new Date(a));
        
        let streak = 0;
        let currentDate = new Date();
        
        for (const dateStr of dates) {
            const entryDate = new Date(dateStr);
            const dayDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === streak) {
                streak++;
                currentDate = entryDate;
            } else {
                break;
            }
        }
        
        return streak;
    }

    renderHistoryList() {
        if (this.moodHistory.length === 0) {
            this.historyList.innerHTML = `
                <div class="empty-history">
                    <p>🌟 Start your mood journey by selecting how you feel!</p>
                </div>
            `;
            return;
        }
        
        const historyHTML = this.moodHistory.map(entry => `
            <div class="history-entry">
                <div class="history-entry-header">
                    <div class="history-mood">
                        <span>${entry.emoji}</span>
                        <span>${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</span>
                    </div>
                    <div class="history-date">${entry.date} at ${entry.time}</div>
                </div>
                <div class="history-message">${entry.message}</div>
            </div>
        `).join('');
        
        this.historyList.innerHTML = historyHTML;
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all mood history? This cannot be undone.')) {
            this.moodHistory = [];
            this.saveHistory();
            this.renderHistoryList();
            this.updateHistoryStats();
        }
    }

    exportHistory() {
        if (this.moodHistory.length === 0) {
            alert('No mood history to export!');
            return;
        }
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Date,Time,Name,Mood,Message\n"
            + this.moodHistory.map(entry => 
                `"${entry.date}","${entry.time}","${entry.name}","${entry.mood}","${entry.message.replace(/"/g, '""')}"`
            ).join('\n');
        
        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', `mood-mirror-history-${new Date().toISOString().split('T')[0]}.csv`);
        link.click();
    }

    exportReflection() {
        // Create a canvas to capture the current reflection
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 800;
        canvas.height = 600;
        
        // Set background gradient based on current mood
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const colors = this.getMoodColors(this.currentMood);
        gradient.addColorStop(0, colors.primary);
        gradient.addColorStop(1, colors.secondary);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Inter, Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🪞 MoodMirror Reflection', canvas.width / 2, 80);
        
        // Add user info
        ctx.font = '28px Inter, Arial';
        ctx.fillText(`${this.userEmoji.textContent} ${this.userName}`, canvas.width / 2, 150);
        
        // Add date
        ctx.font = '18px Inter, Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 180);
        
        // Add mood
        ctx.font = '24px Inter, Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Feeling: ${this.currentMood.charAt(0).toUpperCase() + this.currentMood.slice(1)}`, canvas.width / 2, 230);
        
        // Add message (wrapped text)
        const message = this.personalizedMessage.textContent;
        const words = message.split(' ');
        const lines = [];
        let currentLine = '';
        
        ctx.font = '20px Inter, Arial';
        const maxWidth = canvas.width - 100;
        
        for (const word of words) {
            const testLine = currentLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        
        const startY = 300;
        lines.forEach((line, index) => {
            ctx.fillText(line.trim(), canvas.width / 2, startY + (index * 30));
        });
        
        // Download the image
        const link = document.createElement('a');
        link.download = `mood-reflection-${this.userName}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }

    getMoodColors(mood) {
        const colorMap = {
            happy: { primary: '#fbbf24', secondary: '#f59e0b' },
            sad: { primary: '#3b82f6', secondary: '#1d4ed8' },
            excited: { primary: '#ef4444', secondary: '#dc2626' },
            calm: { primary: '#10b981', secondary: '#059669' },
            anxious: { primary: '#8b5cf6', secondary: '#7c3aed' },
            angry: { primary: '#dc2626', secondary: '#b91c1c' }
        };
        return colorMap[mood] || { primary: '#6366f1', secondary: '#8b5cf6' };
    }

    getPersonalizedMessage() {
        // Check for repeated moods to provide more sophisticated responses
        const recentMoods = this.moodHistory.slice(0, 5).map(entry => entry.mood);
        const moodCount = recentMoods.filter(m => m === this.currentMood).length;
        
        let messages;
        
        // Use poetry for frequent moods or special occasions
        if (moodCount >= 2 || Math.random() < 0.3) {
            messages = this.poeticResponses[this.currentMood];
        } else {
            messages = this.personalizedMessages[this.currentMood];
        }
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        return randomMessage.replace(/{name}/g, this.userName);
    }
}

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize the MoodMirror when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.moodMirror = new MoodMirror();
    
    // Add some interactive features
    document.addEventListener('keydown', (e) => {
        // Press 'R' to reset
        if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
            e.preventDefault();
            window.moodMirror.resetMirror();
        }
    });
    
    // Add dynamic background color transitions
    setInterval(() => {
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => {
            const randomDelay = Math.random() * 2;
            particle.style.animationDelay = randomDelay + 's';
        });
    }, 10000);
});

// Add some console messages for developers
console.log('🪞 MoodMirror loaded successfully!');
console.log('💡 Tip: Press Ctrl+R to quickly reset the mirror');
console.log('✨ Built with love, HTML, CSS, and JavaScript');