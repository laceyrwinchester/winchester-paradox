import { useState } from 'react';
// We changed './' to look in the same folder or the correct relative path
import FilterButtons from '../components/gallery/FilterButtons';
import ItemCard from '../components/gallery/ItemCard';

// This fixes the "Missing Properties" error by defining exactly what an Item is
interface GalleryItem {
  id: number;
  title: string;
  category: string; 
  img: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // We use 'category' and 'img' to match the ItemCard expectations
  const galleryData: GalleryItem[] = [
    { id: 1, title: "Celestial Horror", category: "VIEW", img: "/121212.png" },
    { id: 2, title: "The Void", category: "READ", img: "/212121.png" },
    { id: 3, title: "Digital Artifact", category: "ACQUIRE", img: "/121212.png" },
  ];

  const filteredItems = galleryData.filter(item => 
    activeFilter === 'ALL' || item.category.toUpperCase() === activeFilter.toUpperCase()
  );

  return (
    <div className="gallery-container pt-24">
      {/* We use setActiveFilter to match FilterButtons expectations */}
      <FilterButtons 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
