import "@/styles/globals.css"
import ContextProvider from "@/components/business/ToDoListContext"

const App = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default App
