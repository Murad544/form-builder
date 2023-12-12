'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DndClientProvider = ({ children }: any) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DndClientProvider;
