import { useState } from 'react';
import FilterButtons from './FilterButtons';
import ItemCard from './ItemCard';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Logic to filter the list based on the state
  const filteredItems = activeFilter === 'ALL' 
    ? galleryData 
    : galleryData.filter(item => item.category.toUpperCase() === activeFilter);

  return (
    <div className="gallery-container">
      {/* Pass the state and the setter function to the buttons */}
      <FilterButtons 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

const galleryData = [
  { id: 1, title: "Celestial Horror", category: "VIEW", img: "/121212.png" },
  { id: 2, title: "The Void", category: "READ", img: "/212121.png" },
  { id: 3, title: "Digital Artifact", category: "ACQUIRE", img: "/121212.png" },
];
