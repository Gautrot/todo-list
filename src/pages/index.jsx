import Layout from "@/components/ui/Layout"
import ToDoNavbar from "@/components/business/ToDoNavbar"
import ToDoContent from "@/components/business/ToDoContent"

const Index = () => {
  return (
    <Layout title="Index">
      <ToDoNavbar completed={0} />
      <ToDoContent />
    </Layout>
  )
}

export default Index
