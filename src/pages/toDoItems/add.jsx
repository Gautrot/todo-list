import Layout from "@/components/ui/Layout"
import ToDoForm from "@/components/business/ToDoForm"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import { useCallback } from "react"
import { useRouter } from "next/router"

const AddItem = () => {
  const { createToDoItem } = useToDoListContext()
  const router = useRouter()
  const toDoListId = Number.parseInt(router.query.listId)

  const handleSubmit = useCallback(
    (val) => {
      createToDoItem(val, toDoListId)
      router.push("/")
    },
    [createToDoItem, toDoListId, router]
  )

  return (
    <Layout title="Add a new item">
      <div className="flex h-screen">
        <div className="mb-auto mt-0 w-full">
          <span>
            Add a new item to your To Do list by filling the form below.
          </span>
          <div className="p-4 bg-slate-800 border-0 rounded-lg">
            <ToDoForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddItem
