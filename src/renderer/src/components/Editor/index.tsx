import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export function Editor() {
  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading block*',
      }),
      StarterKit.configure({
        document: false,
      }),
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: '',
        },
      }),
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
      Highlight,
    ],
    autofocus: 'end',
    editorProps: {
      attributes: {
        class:
          'focus:outline-none caret-violet-300 prose prose-invert prose-headings:mt-0 data-[type=taskList]:list-none',
      },
    },
  })
  return <EditorContent className="w-[80ch]" editor={editor} />
}
