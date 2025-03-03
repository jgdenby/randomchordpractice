import React, { useState } from 'react';
import { Check, Music, RefreshCw, List, ChevronRight } from 'lucide-react';

// Define chord types with their respective variations
const chordCategories = [
  { id: 'major', label: 'Major', chords: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  { id: 'minor', label: 'Minor', chords: ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm'] },
  { id: '7', label: '7th', chords: ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'] },
  { id: 'maj7', label: 'Major 7th', chords: ['Cmaj7', 'Dmaj7', 'Emaj7', 'Fmaj7', 'Gmaj7', 'Amaj7', 'Bmaj7'] },
  { id: 'min7', label: 'Minor 7th', chords: ['Cm7', 'Dm7', 'Em7', 'Fm7', 'Gm7', 'Am7', 'Bm7'] },
  { id: 'dim', label: 'Diminished', chords: ['Cdim', 'Ddim', 'Edim', 'Fdim', 'Gdim', 'Adim', 'Bdim'] },
  { id: 'sus2', label: 'Sus2', chords: ['Csus2', 'Dsus2', 'Esus2', 'Fsus2', 'Gsus2', 'Asus2', 'Bsus2'] },
  { id: 'sus4', label: 'Sus4', chords: ['Csus4', 'Dsus4', 'Esus4', 'Fsus4', 'Gsus4', 'Asus4', 'Bsus4'] },
  { id: '6', label: '6th', chords: [ 'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6'] },
  { id: 'min6', label: 'Minor 6th', chords: [ 'Amin6', 'Bmin6', 'Cmin6', 'Dmin6', 'Emin6', 'Fmin6', 'Gmin6'] },
  { id: '6(9)', label: '6(9)', chords: [ 'A6(9)', 'B6(9)', 'C6(9)', 'D6(9)', 'E6(9)', 'F6(9)', 'G6(9)'] },
  { id: 'maj9', label: 'Major 9th', chords: [ 'Amaj9', 'Bmaj9', 'Cmaj9', 'Dmaj9', 'Emaj9', 'Fmaj9', 'Gmaj9'] },
  { id: 'min9', label: 'Minor 9th', chords: [ 'Amin9', 'Bmin9', 'Cmin9', 'Dmin9', 'Emin9', 'Fmin9', 'Gmin9'] },
  { id: '9', label: '9th', chords: [ 'A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9'] },
  { id: '11', label: '11th', chords: [ 'A11', 'B11', 'C11', 'D11', 'E11', 'F11', 'G11'] },
  { id: 'min11', label: 'Minor 11th', chords: [ 'Amin11', 'Bmin11', 'Cmin11', 'Dmin11', 'Emin11', 'Fmin11', 'Gmin11'] },
  { id: 'maj13', label: 'Major 13th', chords: [ 'Amaj13', 'Bmaj13', 'Cmaj13', 'Dmaj13', 'Emaj13', 'Fmaj13', 'Gmaj13'] },
  { id: 'min13', label: 'Minor 13th', chords: [ 'Amin13', 'Bmin13', 'Cmin13', 'Dmin13', 'Emin13', 'Fmin13', 'Gmin13'] },
  { id: '13', label: '13th', chords: [ 'A13', 'B13', 'C13', 'D13', 'E13', 'F13', 'G13'] },
  { id: '7#5', label: '7th#5', chords: [ 'A7#5', 'B7#5', 'C7#5', 'D7#5', 'E7#5', 'F7#5', 'G7#5'] },
  { id: '7b5', label: '7thb5', chords: [ 'A7b5', 'B7b5', 'C7b5', 'D7b5', 'E7b5', 'F7b5', 'G7b5'] },
  { id: '9#5', label: '9th#5', chords: [ 'A7#9', 'B7#9', 'C7#9', 'D7#9', 'E7#9', 'F7#9', 'G7#9'] },
  { id: '9b5', label: '9thb5', chords: [ 'A7b9', 'B7b9', 'C7b9', 'D7b9', 'E7b9', 'F7b9', 'G7b9'] },
];

// Root notes for generating full chord list
const rootNotes = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['major']);
  const [numberOfChords, setNumberOfChords] = useState<number>(10);
  const [generatedChords, setGeneratedChords] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'single'>('list');
  const [currentChordIndex, setCurrentChordIndex] = useState<number>(0);

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        // Don't allow deselecting the last category
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Generate a full list of chords based on selected categories
  const generateFullChordList = () => {
    let allChords: string[] = [];
    
    selectedCategories.forEach(categoryId => {
      const category = chordCategories.find(cat => cat.id === categoryId);
      if (category) {
        // Generate all possible chords for this category by combining with all root notes
        rootNotes.forEach(root => {
          const suffix = category.id === 'major' ? '' : category.chords[0].substring(1);
          allChords.push(`${root}${suffix}`);
        });
      }
    });
    
    return allChords;
  };

  // Generate random chords
  const generateRandomChords = () => {
    const allChords = generateFullChordList();
    const randomChords: string[] = [];
    const max = Math.min(numberOfChords, allChords.length);
    
    // Create a copy of the array to avoid modifying the original
    const availableChords = [...allChords];
    
    for (let i = 0; i < max; i++) {
      const randomIndex = Math.floor(Math.random() * availableChords.length);
      randomChords.push(availableChords[randomIndex]);
      // Remove the selected chord to avoid duplicates
      availableChords.splice(randomIndex, 1);
      
      // If we've used all available chords, break out of the loop
      if (availableChords.length === 0) break;
    }
    
    setGeneratedChords(randomChords);
    setIsGenerated(true);
    setCurrentChordIndex(0); // Reset to first chord when generating new sequence
  };

  // Move to the next chord in single view mode
  const nextChord = () => {
    if (currentChordIndex < generatedChords.length - 1) {
      setCurrentChordIndex(currentChordIndex + 1);
    } else {
      // Loop back to the beginning if we're at the end
      setCurrentChordIndex(0);
    }
  };

  // Toggle between list and single view modes
  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'single' : 'single');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Music className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-indigo-800">Random Chord Practice</h1>
          </div>
          <p className="text-gray-600">Generate random chord sequences for your practice sessions!</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Chord Types</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {chordCategories.map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
                  selectedCategories.includes(category.id)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.label}</span>
                {selectedCategories.includes(category.id) && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label htmlFor="numberOfChords" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Chords
            </label>
            <input
              type="number"
              id="numberOfChords"
              min="1"
              max="50"
              value={numberOfChords}
              onChange={(e) => setNumberOfChords(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={generateRandomChords}
            className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Generate Chord Sequence
          </button>
        </div>

        {isGenerated && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Your Practice Sequence</h2>
                      
                      <button
                        onClick={toggleViewMode}
                        className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors"
                      >
                        {viewMode === 'list' ? (
                          <>
                            <ChevronRight className="h-5 w-5 mr-2" />
                            <span>Single View</span>
                          </>
                        ) : (
                          <>
                            <List className="h-5 w-5 mr-2" />
                            <span>List View</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {generatedChords.length > 0 ? (
                      viewMode === 'list' ? (
                        // List View
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {generatedChords.map((chord, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-center p-4 bg-indigo-50 rounded-md border-2 border-indigo-100"
                            >
                              <span className="text-lg font-medium text-indigo-800">{chord}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Single Chord View
                        <div className="flex flex-col items-center">
                          <div className="mb-8 text-center">
                            <div className="text-sm text-gray-500 mb-2">
                              Chord {currentChordIndex + 1} of {generatedChords.length}
                            </div>
                            <div className="flex items-center justify-center p-12 bg-indigo-50 rounded-lg border-2 border-indigo-200 w-48 h-48 mx-auto">
                              <span className="text-4xl font-bold text-indigo-800">{generatedChords[currentChordIndex]}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={nextChord}
                            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                          >
                            <ChevronRight className="h-5 w-5 mr-2" />
                            Next Chord
                          </button>
                        </div>
                      )
                    ) : (
              <p className="text-gray-600">No chords generated. Please select at least one chord type and try again.</p>
            )}
            
            <div className="mt-6">
              <button
                onClick={generateRandomChords}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors"
              >
                Generate New Sequence
              </button>
            </div>
          </div>
        )}

<footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Use this tool to practice your chord transitions and improve your musical skills.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;