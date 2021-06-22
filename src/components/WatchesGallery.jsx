import React from 'react';
import Watch from './Watch';

export default function WatchesGallery({date, items, onDeleteWatch}) {
  return (
    <div className="watches-gallery">
      {items.map(item => <Watch key={item.id} date={date} item={item} onDeleteWatch={onDeleteWatch}/>)}
    </div>
  )
}
