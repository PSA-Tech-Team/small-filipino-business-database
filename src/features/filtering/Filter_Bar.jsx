import { useState } from 'react'
import './Filter_Bar.css'
function Filter_Bar({onFilterChange}) {    
  const [selectedFilters, setSelectedFilters] = useState(
    {
      type: [],
      rating: [],
    }
  );
  
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
        const updatedCategory = prevFilters[category].includes(value)
            ? prevFilters[category].filter((item) => item !== value)
            : [...prevFilters[category], value];
        const updatedFilters = { ...prevFilters, [category]: updatedCategory };
        onFilterChange(updatedFilters); // Notify parent of changes
        return updatedFilters;
    });
  };
  
  
  
  return (
    <div className='filter'>
        <div className='margins'>
            <h1>Filter</h1>
            <h3>Business Type</h3>
            <br />
            <div className='types'>
                <label>Food/Drink</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('type', 'Food/Drink')}
                />
            </div>
            <div className='types'>
                <label>Clothing/Accessories</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('type', 'Clothing/Accessories')}
                />
            </div>
            <div className='types'>
                <label>Arts/Crafts/Decor</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('type', 'Arts/Crafts/Decor')}
                />
            </div>
            <div className='types'>
                <label>ETC</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('type', 'ETC')}
                />
            </div>
            <h3>Rating</h3>
            <div className='types'>
                <label>5 Stars</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('rating', 5)}
                />
            </div>
            <div className='types'>
                <label>4 Stars</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('rating', 4)}
                />
            </div>
            <div className='types'>
                <label>3 Stars</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('rating', 3)}
                />
            </div>
            <div className='types'>
                <label>2 Stars</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('rating', 2)}
                />
            </div>
            <div className='types'>
                <label>1 Star</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('rating', 1)}
                />
            </div>
            <div className='types'>
                <label>0 Stars</label>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('rating', 0)}
                />
            </div>
        </div>
    </div>
);
}

export default Filter_Bar;