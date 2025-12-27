export const MOODS = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-400', hover: 'hover:bg-yellow-500' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-400', hover: 'hover:bg-blue-500' },
    { name: 'Angry', emoji: '😡', color: 'bg-red-500', hover: 'hover:bg-red-600' },
    { name: 'Excited', emoji: '🤩', color: 'bg-pink-400', hover: 'hover:bg-pink-500' },
    { name: 'Neutral', emoji: '😐', color: 'bg-gray-400', hover: 'hover:bg-gray-500' },
];

export const getMoodColor = (moodName) => {
    const mood = MOODS.find(m => m.name === moodName);
    return mood ? mood.color : 'bg-white';
};
