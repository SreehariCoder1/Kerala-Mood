import React from 'react';
import { MOODS } from '../constants/moods';

const MoodSelector = ({ selectedDistrict, onSelectMood }) => {
    if (!selectedDistrict) {
        return <div className="p-4 text-center text-gray-500 font-medium">Select a district to record your mood</div>;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg mt-6 w-full max-w-md mx-auto border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                How are you feeling in <span className="text-purple-600">{selectedDistrict}</span>?
            </h3>
            <div className="flex gap-3 justify-center flex-wrap">
                {MOODS.map((mood) => (
                    <button
                        key={mood.name}
                        onClick={() => onSelectMood(mood.name)}
                        className={`
              flex flex-col items-center justify-center w-20 h-24 rounded-2xl 
              transition-all duration-300 transform hover:scale-110 active:scale-95
              ${mood.color} ${mood.hover} text-white shadow-sm hover:shadow-md
            `}
                        title={mood.name}
                    >
                        <span className="text-4xl mb-1 filter drop-shadow-sm">{mood.emoji}</span>
                        <span className="text-xs font-bold uppercase tracking-wide">{mood.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;
