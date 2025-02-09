import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeProvider } from '@/components/theme-provider'

import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme='dark'>
      <div className='mx-auto w-full'>
        <Tabs defaultValue='editor' className=''>
          <TabsList className='grid w-full grid-cols-2 p'>
            <TabsTrigger value='editor'>Editor</TabsTrigger>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
          </TabsList>
          <TabsContent value='editor'>Put Editor Content here</TabsContent>
          <TabsContent value='preview'>Put Preview Content here</TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}

export default App
