import { useState } from 'react';
import FilterButtons from '../components/gallery/FilterButtons';
import ItemCard from '../components/gallery/ItemCard';

// This tells TypeScript exactly what an Item looks like
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  img: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const galleryData: GalleryItem[] = [
    { id: 1, title: "Celestial Horror", category: "VIEW", img: "/121212.png" },
    { id: 2, title: "The Void", category: "READ", img: "/212121.png" },
    { id: 3, title: "Digital Artifact", category: "ACQUIRE", img: "/121212.png" },
  ];

  const filteredItems = activeFilter === 'ALL' 
    ? galleryData 
    : galleryData.filter(item => item.category.toUpperCase() === activeFilter.toUpperCase());

  return (
    <div className="gallery-container pt-20 pb-10">
      {/* Passing the state down to the child component */}
      <FilterButtons 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
