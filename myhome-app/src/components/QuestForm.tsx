import { useState } from 'react';

interface QuestFormProps {
  initialTitle?: string;
  initialDescription?: string;
  submitLabel: string;
  onSubmit: (title: string, description?: string) => void;
  onCancel: () => void;
}

export function QuestForm({
  initialTitle = '',
  initialDescription = '',
  submitLabel,
  onSubmit,
  onCancel,
}: QuestFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === '') return;
    onSubmit(trimmed, description.trim() === '' ? undefined : description.trim());
  };

  return (
    <form className="quest-form" onSubmit={handleSubmit}>
      <input
        className="quest-form__input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="クエスト名（例: カーテンの採寸をする）"
        maxLength={100}
        autoFocus
      />
      <textarea
        className="quest-form__textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="補足メモ（任意）"
        rows={2}
        maxLength={500}
      />
      <div className="quest-form__actions">
        <button type="submit" className="btn btn--primary" disabled={title.trim() === ''}>
          {submitLabel}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          やめる
        </button>
      </div>
    </form>
  );
}
