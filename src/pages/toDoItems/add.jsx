import Layout from "@/components/ui/Layout"
import ToDoForm from "@/components/business/ToDoForm"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import { useCallback } from "react"
import { useRouter } from "next/router"

const AddItem = () => {
  const { createToDoItem } = useToDoListContext()
  const router = useRouter()

  const handleSubmit = useCallback(
    (val) => {
      createToDoItem(val)
      router.push("/")
    },
    [router, createToDoItem]
  )

  return (
    <Layout title="Add a new item">
      <span>Add a new item to your To Do list by filling the form below.</span>
      <div className="p-4 bg-slate-800 border-0 rounded-lg">
        <ToDoForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  )
}

export default AddItem
