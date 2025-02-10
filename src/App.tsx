import { useState } from 'react'

import { Editor } from '@/components/editor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeProvider } from '@/components/theme-provider'
import { Content } from '@/types'

import './App.css'

function App() {
  const [content, setContent] = useState<Content>({
    images: [],
    textContent: '',
  })

  return (
    <ThemeProvider defaultTheme='dark'>
      <div className='mx-auto w-full'>
        <Tabs defaultValue='editor' className=''>
          <TabsList className='p grid w-full grid-cols-2'>
            <TabsTrigger value='editor'>Editor</TabsTrigger>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
          </TabsList>
          <TabsContent value='editor'>
            <Editor content={content} setContent={setContent} />
          </TabsContent>
          <TabsContent value='preview'>Put Preview Content here</TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}

export default App
