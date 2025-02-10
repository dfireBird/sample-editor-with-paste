import { Textarea } from '@/components/ui/textarea'
import { Content } from '@/types'

// Common mime types of images that can be considered safe for use
// Ref from: https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types#image_types
const SAFE_IMAGE_MIME_TYPES = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
]

const EXTENSION_REGEX = /(?:\.([^.]+))?$/

function generateFileName(ext: string) {
  const requiredLength = 10
  const randomFileName = Math.floor(Math.random() * 10 ** 10).toString()

  if (randomFileName.length >= requiredLength) {
    return `${randomFileName}.${ext}`
  } else {
    const paddingLength = requiredLength - randomFileName.length
    const padding = '0'.repeat(paddingLength)
    return `${padding}${randomFileName}.${ext}`
  }
}

export function Editor({
  content,
  setContent,
}: {
  content: Content
  setContent: React.Dispatch<React.SetStateAction<Content>>
}) {
  const onPaste: React.ClipboardEventHandler<HTMLTextAreaElement> = (event) => {
    let imageTextContent = ''
    const images: File[] = []
    for (const file of event.clipboardData.files) {
      if (!SAFE_IMAGE_MIME_TYPES.includes(file.type)) continue

      const extension = EXTENSION_REGEX.exec(file.name)?.[1] ?? ''
      const newName = generateFileName(extension)
      const newFile = new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
      })

      imageTextContent += `![${file.name}](./${newName})`
      images.push(newFile)
    }

    const insertAtPosition = (value: string, idx: number, insert: string) =>
      `${value.substring(0, idx)}${insert}${value.substring(idx)}`

    const cursorPos = event.currentTarget.selectionStart
    setContent((oldValue) => ({
      textContent: insertAtPosition(
        oldValue.textContent,
        cursorPos,
        imageTextContent,
      ),
      images: oldValue.images.concat(images),
    }))

    setTimeout(() => {
      const input = event.target as HTMLTextAreaElement
      const newCursorPos = cursorPos + imageTextContent.length
      input.selectionStart = newCursorPos
      input.selectionEnd = newCursorPos
    }, 0)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent((ov) => ({ ...ov, textContent: e.target.value }))

  return (
    <Textarea
      className='min-h-80 p-2'
      placeholder='Use Markdown to format your blog'
      value={content.textContent}
      onChange={onChange}
      onPaste={onPaste}
    >
      {content.textContent}
    </Textarea>
  )
}
