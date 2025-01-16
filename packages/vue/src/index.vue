<template>
  <div class="rich-text-editor">
    <div class="toolbar">
      <div class="toolbar-group">
        <button @click="applyStyle('h1')" title="Heading 1">H1</button>
        <button @click="applyStyle('h2')" title="Heading 2">H2</button>
        <button @click="applyStyle('h3')" title="Heading 3">H3</button>
      </div>

      <div class="toolbar-group">
        <button @click="applyStyle('bold')" title="Bold">B</button>
        <button @click="applyStyle('italic')" title="Italic">I</button>
        <button @click="applyStyle('underline')" title="Underline">U</button>
        <button @click="applyStyle('strikethrough')" title="Strikethrough">
          S
        </button>
      </div>

      <div class="toolbar-group">
        <button @click="applyStyle('ul')" title="Unordered List">UL</button>
        <button @click="applyStyle('ol')" title="Ordered List">OL</button>
        <button @click="applyStyle('blockquote')" title="Quote">Quote</button>
        <button @click="applyStyle('code')" title="Code">Code</button>
      </div>

      <div class="toolbar-group">
        <button @click="insertNode('link')" title="Link">Link</button>
        <button @click="insertNode('image')" title="Image">Image</button>
        <button @click="insertNode('table')" title="Table">Table</button>
        <button @click="insertNode('video')" title="Video">Video</button>
        <button @click="insertNode('audio')" title="Audio">Audio</button>
      </div>

      <div class="toolbar-group">
        <select @change="applyFontSize($event.target.value)">
          <option value="16px">Normal</option>
          <option value="20px">Large</option>
          <option value="24px">Huge</option>
        </select>
        <input
          type="color"
          @change="applyColor($event.target.value)"
          title="Text Color"
        />
      </div>
    </div>

    <div
      class="editor"
      contenteditable="true"
      ref="editorRef"
      @mouseup="saveSelection"
      @keyup="saveSelection"
      @input="updateContent"
      @paste="handlePaste"
    ></div>

    <div class="status-bar">
      <div class="position-info">
        行: {{ currentRow }}, 列: {{ currentColumn }}
      </div>
    </div>

    <div v-if="showLinkModal" class="modal">
      <div class="modal-content">
        <h3>Insert Link</h3>
        <input v-model="linkUrl" placeholder="URL" />
        <input v-model="linkText" placeholder="Text" />
        <div class="modal-actions">
          <button @click="confirmInsertLink">Insert</button>
          <button @click="showLinkModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'VerRichEditor' })

const editorRef = ref<HTMLElement | null>(null)
let savedSelection: Range | null = null
const showLinkModal = ref(false)
const linkUrl = ref('')
const linkText = ref('')
const currentRow = ref(1)
const currentColumn = ref(1)

// Selection handling
const saveSelection = () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0).cloneRange()
    linkText.value = selection.toString()
  }
}

const restoreSelection = () => {
  if (savedSelection && editorRef.value) {
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(savedSelection)
    }
  }
}

const updateCursorPosition = () => {
  const selection = window.getSelection()
  if (!selection || !selection.focusNode || !editorRef.value) return

  let node = selection.focusNode
  let offset = selection.focusOffset

  // Calculate column
  currentColumn.value = offset + 1

  // Calculate row
  let range = document.createRange()
  range.setStart(editorRef.value, 0)
  range.setEnd(node, 0)
  let content = range.cloneContents()
  let rows = content.textContent?.split('\n') || []
  currentRow.value = rows.length
}

// Element creation helpers
const createWrapper = (
  tag: string,
  attributes: Record<string, string> = {},
) => {
  const element = document.createElement(tag)
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value
    } else {
      element.style[key as any] = value
    }
  })
  return element
}

const wrapSelection = (wrapper: HTMLElement) => {
  if (!savedSelection) return

  const content = savedSelection.extractContents()
  wrapper.appendChild(content)
  savedSelection.insertNode(wrapper)

  const newRange = document.createRange()
  newRange.selectNode(wrapper)
  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(newRange)
    savedSelection = newRange
  }
}

// Style application
const applyStyle = (style: string) => {
  restoreSelection()

  switch (style) {
    case 'bold':
      wrapSelection(createWrapper('strong'))
      break
    case 'italic':
      wrapSelection(createWrapper('em'))
      break
    case 'underline':
      wrapSelection(createWrapper('span', { textDecoration: 'underline' }))
      break
    case 'strikethrough':
      wrapSelection(createWrapper('del'))
      break
    case 'h1':
    case 'h2':
    case 'h3':
      wrapSelection(createWrapper(style))
      break
    case 'ul':
    case 'ol':
      const list = createWrapper(style)
      const li = createWrapper('li')
      list.appendChild(li)
      wrapSelection(li)
      savedSelection?.insertNode(list)
      break
    case 'blockquote':
      wrapSelection(
        createWrapper('blockquote', {
          class: 'editor-quote',
          borderLeft: '3px solid #ccc',
          paddingLeft: '1rem',
          margin: '1rem 0',
        }),
      )
      break
    case 'code':
      wrapSelection(
        createWrapper('code', {
          class: 'editor-code',
          background: '#f5f5f5',
          padding: '0.2em 0.4em',
          borderRadius: '3px',
          fontFamily: 'monospace',
        }),
      )
      break
  }

  if (editorRef.value) {
    editorRef.value.focus()
  }
}

// Node insertion
const insertNode = (type: string) => {
  switch (type) {
    case 'link':
      showLinkModal.value = true
      break
    case 'image':
      const imageUrl = prompt('Enter image URL:')
      if (imageUrl) {
        const img = createWrapper('img')
        img.setAttribute('src', imageUrl)
        img.setAttribute('alt', 'Inserted image')
        restoreSelection()
        savedSelection?.insertNode(img)
      }
      break
    case 'table':
      const rows = parseInt(prompt('Number of rows:', '3') || '3')
      const cols = parseInt(prompt('Number of columns:', '3') || '3')
      insertTable(rows, cols)
      break
    case 'video':
      const videoUrl = prompt('Enter video URL:')
      if (videoUrl) {
        const video = createWrapper('video')
        video.setAttribute('src', videoUrl)
        video.setAttribute('controls', 'true')
        restoreSelection()
        savedSelection?.insertNode(video)
      }
      break
    case 'audio':
      const audioUrl = prompt('Enter audio URL:')
      if (audioUrl) {
        const audio = createWrapper('audio')
        audio.setAttribute('src', audioUrl)
        audio.setAttribute('controls', 'true')
        restoreSelection()
        savedSelection?.insertNode(audio)
      }
      break
  }
}

const insertTable = (rows: number, cols: number) => {
  const table = createWrapper('table', {
    border: '1px solid #ccc',
    borderCollapse: 'collapse',
    width: '100%',
  })

  for (let i = 0; i < rows; i++) {
    const tr = createWrapper('tr')
    for (let j = 0; j < cols; j++) {
      const td = createWrapper('td', {
        border: '1px solid #ccc',
        padding: '8px',
      })
      td.setAttribute('contenteditable', 'true')
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }

  restoreSelection()
  savedSelection?.insertNode(table)
}

const confirmInsertLink = () => {
  if (linkUrl.value) {
    const link = createWrapper('a')
    link.setAttribute('href', linkUrl.value)
    link.textContent = linkText.value || linkUrl.value

    restoreSelection()
    savedSelection?.insertNode(link)

    linkUrl.value = ''
    linkText.value = ''
    showLinkModal.value = false
  }
}

// Font styling
const applyFontSize = (size: string) => {
  restoreSelection()
  wrapSelection(createWrapper('span', { fontSize: size }))

  if (editorRef.value) {
    editorRef.value.focus()
  }
}

const applyColor = (color: string) => {
  restoreSelection()
  wrapSelection(createWrapper('span', { color }))

  if (editorRef.value) {
    editorRef.value.focus()
  }
}

// Paste handling
const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain')
  if (text && editorRef.value) {
    const textNode = document.createTextNode(text)
    restoreSelection()
    savedSelection?.insertNode(textNode)
  }
}

// Content update
const updateContent = () => {
  if (editorRef.value) {
    console.log('Content updated:', editorRef.value.innerHTML)
  }
}

// Add event listeners
onMounted(() => {
  document.addEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.addEventListener('input', updateCursorPosition)
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.removeEventListener('input', updateCursorPosition)
})
</script>

<style scoped>
.rich-text-editor {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.toolbar {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  background: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-group {
  display: flex;
  gap: 4px;
  padding: 0 4px;
  border-right: 1px solid #ddd;
}

.toolbar-group:last-child {
  border-right: none;
}

.toolbar button {
  padding: 4px 8px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.toolbar button:hover {
  background: #eee;
}

.toolbar select {
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.editor {
  min-height: 300px;
  padding: 12px;
  outline: none;
}

.editor:focus {
  background: #fafafa;
}

.status-bar {
  border-top: 1px solid #ccc;
  padding: 4px 8px;
  background: #f5f5f5;
  font-size: 12px;
  color: #666;
}

.position-info {
  font-family: monospace;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-content input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.editor img {
  max-width: 100%;
  height: auto;
}

.editor table {
  margin: 1em 0;
}

.editor video,
.editor audio {
  max-width: 100%;
  margin: 1em 0;
}

.editor blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 3px solid #ccc;
  color: #666;
}

.editor code {
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}
</style>
