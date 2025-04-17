import React from 'react';
import '../../styles/studio/StudioFooterControls.css'; // CSS file to be created

interface StudioFooterControlsProps {
  onReset?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onScribble?: () => void;
  onCreateLesson?: () => void;
}

const StudioFooterControls: React.FC<StudioFooterControlsProps> = ({
  onReset,
  onUndo,
  onRedo,
  onScribble,
  onCreateLesson,
}) => {
  return (
    <div className="studio-footer-controls">
      <div className="footer-left-controls">
        <button className="footer-button reset-button" onClick={onReset}>
          Reset All
        </button>
        <button className="footer-button undo-button" onClick={onUndo} aria-label="Undo">
          {/* Undo Icon SVG */}
          <img src="/Images/undoImg.png" alt="Redo" />
        </button>
        <button className="footer-button redo-button" onClick={onRedo} aria-label="Redo">
          {/* Redo Icon SVG */}
          <img src="Images/redoImg.png" alt="Redo" />

        </button>
        <button className="footer-button scribble-button" onClick={onScribble}>
          {/* Scribble/Edit Icon SVG */}
          <img src="/Images/edit.png" alt="Undo" />
          Scribble
        </button>
      </div>
      <div className="footer-right-controls">
        <button className="footer-button create-lesson-button" onClick={onCreateLesson}>
          Create Lesson
        </button>
      </div>
    </div>
  );
};

export default StudioFooterControls; 