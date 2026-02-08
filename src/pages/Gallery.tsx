import { useState } from 'react';
// These imports look for the files inside src/components/gallery/
import FilterButtons from '../components/gallery/FilterButtons';
import ItemCard from '../components/gallery/ItemCard';

// 1. Define the shape of your data so TypeScript doesn't panic
interface GalleryItem {
  id: number;
  title: string;
  category: string; 
  img: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // 2. Your data, using 'category' and 'img' to match ItemCard
  const galleryData: GalleryItem[] = [
    { id: 1, title: "Celestial Horror", category: "VIEW", img: "/121212.png" },
    { id: 2, title: "The Void", category: "READ", img: "/212121.png" },
    { id: 3, title: "Digital Artifact", category: "ACQUIRE", img: "/121212.png" },
  ];

  const filteredItems = galleryData.filter(item => 
    activeFilter === 'ALL' || item.category.toUpperCase() === activeFilter.toUpperCase()
  );

  return (
    <div className="gallery-container pt-24 min-h-screen bg-[#050505]">
      {/* 3. Passing 'setActiveFilter' correctly */}
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
