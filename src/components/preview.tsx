import { Content } from '@/types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Preview({ content }: { content: Content }) {
  return (
    <div className='prose-neutral dark:prose-invert lg:prose-lg prose-a:text-blue-500 prose-ul:list-disc prose-ol:list-decimal min-h-80 rounded-lg border p-2 px-5 text-left shadow-md'>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          img(props) {
            const { src } = props

            if (src?.indexOf('.') === 0) {
              const fileName = src.substring(2)
              const file = content.images.find((f) => f.name === fileName)

              if (file) {
                const url = URL.createObjectURL(file)
                return <img {...props} src={url || src} />
              }
            }
            return <img {...props} />
          },
          pre(props) {
            return <pre {...props} className={`${props.className} border border-neutral-300 dark:border-neutral-500`} />
          }
        }}
      >
        {content.textContent}
      </Markdown>
    </div>
  )
}
