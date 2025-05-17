// DescriptionEditor.jsx
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export default function DescriptionEditor({ initial, onSave, onCancel }) {
  const [value, setValue] = useState(initial);

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content: initial,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  // Sync if initial changes externally
  useEffect(() => {
    if (editor && initial !== value) {
      editor.commands.setContent(initial);
      setValue(initial);
    }
  }, [initial, editor]);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 8 }}>
      {/* Toolbar */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          •
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </button>
        <button
          onClick={() => {
            const url = prompt('Link URL');
            if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
        >
          🔗
        </button>
        <button
          onClick={() => {
            const src = prompt('Image URL');
            if (src) editor.chain().focus().setImage({ src }).run();
          }}
        >
          🖼
        </button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} style={{ minHeight: 100 }} />

      {/* Actions */}
      <div style={{ marginTop: 8, textAlign: 'right' }}>
        <button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </button>
        <button
          onClick={() => onSave(value)}
          style={{ background: '#0c66e4', color: '#fff' }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
