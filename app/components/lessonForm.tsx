import React, { useState } from 'react';
import styles from '../styles/lessonForm.module.css';

interface LessonFormProps {
  onClose: () => void;
  onSubmit: (data: {
    course: string;
    topic: string;
    student?: string;
  }) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    course: '',
    topic: '',
    student: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Create a lesson</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="course">What course are you tutoring on?</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g Maths"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="topic">What topic?</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g calculus"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student">
              who is this lesson for? <span className={styles.optional}>(optional)</span>
            </label>
            <div className={styles.studentInput}>
              <span className={styles.atSymbol}>@</span>
              <input
                type="text"
                id="student"
                name="student"
                value={formData.student}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <p className={styles.instruction}>Click continue to prepare lesson.</p>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.continueButton}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm; 