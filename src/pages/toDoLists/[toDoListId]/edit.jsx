import Layout from "@/components/ui/Layout"
import ToDoForm from "@/components/business/ToDoForm"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import { useCallback } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      toDoListId: Number.parseInt(params.toDoListId, 10),
    },
  },
})

const EditList = (props) => {
  const {
    params: { toDoListId },
  } = props

  const { toDoLists, editToDoList } = useToDoListContext()
  const router = useRouter()

  const handleSubmit = useCallback(
    (val) => {
      editToDoList(val)
      router.push("/")
    },
    [router, editToDoList]
  )

  return (
    <Layout title="Edit your To Do list">
      <span>Edit your To Do list's name below.</span>
      <div className="p-4 bg-slate-800 border-0 rounded-lg">
        <ToDoForm
          onSubmit={handleSubmit}
          initValues={toDoLists.find(({ id }) => id === toDoListId)}
        />
      </div>
    </Layout>
  )
}

export default EditList
