import Layout from "@/components/ui/Layout"
import ToDoForm from "@/components/business/ToDoForm"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import { useCallback } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      toDoItemId: Number.parseInt(params.toDoItemId),
    },
  },
})

const EditItem = (props) => {
  const {
    params: { toDoItemId },
  } = props

  const { toDoLists, editToDoItem } = useToDoListContext()
  const router = useRouter()
  const toDoListId = Number.parseInt(router.query.listId)

  const handleSubmit = useCallback(
    (val) => {
      editToDoItem(val, toDoListId)
      router.push("/")
    },
    [editToDoItem, toDoListId, router]
  )

  return (
    <Layout title="Edit your item">
      <span>Edit the selected item from your To Do list below.</span>
      <div className="p-4 bg-slate-800 border-0 rounded-lg">
        <ToDoForm
          onSubmit={handleSubmit}
          initValues={toDoLists
            .find(({ id }) => id === toDoListId)
            .list.find(({ id }) => id === toDoItemId)}
        />
      </div>
    </Layout>
  )
}

export default EditItem
