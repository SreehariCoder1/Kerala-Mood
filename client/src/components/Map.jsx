import React from 'react';
import { DISTRICTS } from '../constants/districts';
import { getMoodColor } from '../constants/moods';

const Map = ({ districtMoods, onSelectDistrict, selectedDistrict }) => {
    // Rough geographic ordering/grouping for stacking
    // North: Kasaragod, Kannur, Wayanad
    // North-Central: Kozhikode, Malappuram, Palakkad
    // Central: Thrissur, Ernakulam, Idukki
    // South-Central: Kottayam, Alappuzha, Pathanamthitta
    // South: Kollam, Thiruvananthapuram

    return (
        <div className="flex flex-col items-center gap-2 p-4 max-w-md mx-auto relative">
            {/* Pseudo-map visualization using a vertical stack of styled buttons */}
            <h2 className="text-xl font-bold mb-4 text-gray-700">Kerala Map</h2>

            {DISTRICTS.map((district) => {
                const moodData = districtMoods.find(d => d.district === district);
                const moodColor = moodData?.dominantMood ? getMoodColor(moodData.dominantMood) : 'bg-white';
                const isSelected = selectedDistrict === district;

                return (
                    <button
                        key={district}
                        onClick={() => onSelectDistrict(district)}
                        className={`
              w-48 h-12 rounded-lg shadow-md border-2 transition-all duration-300 flex items-center justify-between px-4
              ${moodColor}
              ${isSelected ? 'border-purple-600 scale-105 z-10' : 'border-gray-200 hover:scale-105'}
            `}
                    >
                        <span className="font-semibold text-gray-800">{district}</span>
                        {moodData?.dominantMood && (
                            <span className="text-xl" title={moodData.dominantMood}>
                                {/* We could lookup the emoji here but color tells the story */}
                            </span>
                        )}
                        {isSelected && <span className="text-purple-600 font-bold">●</span>}
                    </button>
                );
            })}
        </div>
    );
};

export default Map;
