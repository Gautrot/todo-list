import Layout from "@/components/ui/Layout"
import ToDoForm from "@/components/business/ToDoForm"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import { useCallback } from "react"
import { useRouter } from "next/router"

const AddList = () => {
  const { createToDoList } = useToDoListContext()
  const router = useRouter()

  const handleSubmit = useCallback(
    (val) => {
      createToDoList(val)
      router.push("/")
    },
    [router, createToDoList]
  )

  return (
    <Layout title="Add a new To Do list">
      <div className="flex h-screen">
        <div className="mb-auto mt-0 w-full">
          <span>Add a new To Do list by filling the form below.</span>
          <div className="p-4 bg-slate-800 border-0 rounded-lg">
            <ToDoForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddList
