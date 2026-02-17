const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'package', 'emoji_strategy.json');
const outputPath = path.join(__dirname, 'js', 'emoji-data.js');

try {
    const rawData = fs.readFileSync(inputPath, 'utf8');
    const emojis = JSON.parse(rawData);

    // Group by category, but mapped to our WhatsApp categories
    // JoyPixels categories: people, nature, food, activity, travel, objects, symbols, flags
    // These map 1:1 nicely to our categories.

    const categories = {
        'people': [],
        'nature': [],
        'food': [],
        'activity': [],
        'travel': [],
        'objects': [],
        'symbols': [],
        'flags': []
    };

    // Helper to fix category names if they differ slightly
    const mapCategory = (cat) => {
        if (cat === 'activities') return 'activity';
        if (cat === 'places') return 'travel'; // JoyPixels uses 'travel' usually but check
        return cat;
    };

    Object.keys(emojis).forEach(key => {
        const emoji = emojis[key];
        const cat = emoji.category;

        if (categories[cat]) {
            categories[cat].push(emoji);
        } else if (cat === 'regional') {
            // skip or map to flags? usually flags
            if (!categories['flags']) categories['flags'] = [];
            categories['flags'].push(emoji);
        } else if (cat === 'modifier') {
            // skip modifiers for the main picker usually, or put in symbols
        } else {
            // Fallback
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(emoji);
        }
    });

    // Write to JS file
    const fileContent = `const EMOJI_DATA = ${JSON.stringify(categories, null, 2)};`;
    fs.writeFileSync(outputPath, fileContent);
    console.log('Successfully created js/emoji-data.js with ' + Object.keys(emojis).length + ' emojis.');

} catch (err) {
    console.error('Error building emoji data:', err);
    process.exit(1);
}
