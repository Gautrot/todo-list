import Layout from "@/components/ui/Layout"
import ToDoNavbar from "@/components/business/ToDoNavbar"
import ToDoContent from "@/components/business/ToDoContent"

const Index = () => {
  return (
    <Layout title="Index">
      <ToDoNavbar />
      <ToDoContent />
    </Layout>
  )
}

export default Index
