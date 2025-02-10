import { useState } from 'react'

import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeProvider } from '@/components/theme-provider'
import { Content } from '@/types'
import { ModeToggle } from './components/mode-toggle'

import './App.css'

function App() {
  const [content, setContent] = useState<Content>({
    images: [],
    textContent: '',
  })

  return (
    <ThemeProvider defaultTheme='dark'>
      <div className='mx-auto flex w-full flex-col'>
        <div className='mb-10 w-fit self-end'>
          <ModeToggle />
        </div>
        <Tabs defaultValue='editor' className=''>
          <TabsList className='p grid w-full grid-cols-2'>
            <TabsTrigger value='editor'>Editor</TabsTrigger>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
          </TabsList>
          <TabsContent value='editor'>
            <Editor content={content} setContent={setContent} />
          </TabsContent>
          <TabsContent value='preview'>
            <Preview content={content} />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}

export default App
