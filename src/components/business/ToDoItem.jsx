import { useToDoListContext } from "@/components/business/ToDoListContext"
import { TrashIcon } from "@heroicons/react/20/solid"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"

const ToDoItem = (props) => {
  const { toDoList } = props
  const { deleteToDoItem, editToDoItem } = useToDoListContext()
  const router = useRouter()

  const handleDeleteToDoItem = useCallback(
    (e) => {
      const toDoItemId = Number.parseInt(
        e.currentTarget.getAttribute("data-todoitem-id"),
        10
      )

      deleteToDoItem(toDoItemId)
    },
    [deleteToDoItem]
  )

  const handleEditToDoItem = useCallback(
    (e) => {
      const toDoItemId = Number.parseInt(
        e.currentTarget.getAttribute("data-todoitem-id"),
        10
      )
      router.push({
        pathname: `/toDoItems/${toDoItemId}/edit`,
        query: { listId: toDoList.id },
      })
    },
    [router, toDoList.id]
  )

  const [checked, setChecked] = useState()
  const handleChecked = useCallback(
    (e) => {
      const toDoItemId = Number.parseInt(
        e.currentTarget.getAttribute("data-todoitem-id"),
        10
      )
      const isChecked = setChecked(e.currentTarget.checked)

      editToDoItem(toDoItemId, isChecked)
    },
    [editToDoItem]
  )

  return (
    <>
      {toDoList.list.map((toDoItem) => (
        <div
          className="px-4 py-2 bg-blue-900 rounded-lg flex items-center"
          key={toDoItem.id}
        >
          <label>
            <input
              type="checkbox"
              className="appearance-none bg-white checked:bg-blue-500 p-2 mr-4"
              data-todoitem-id={toDoItem.id}
              onChange={handleChecked}
            />
          </label>
          <button
            data-todoitem-id={toDoItem.id}
            onClick={handleEditToDoItem}
            className="w-full text-left"
            title="Edit this item"
          >
            {toDoItem.name}
          </button>
          <button
            data-todoitem-id={toDoItem.id}
            onClick={handleDeleteToDoItem}
            title="Remove this item"
          >
            <TrashIcon className="h-7 w-7" />
          </button>
        </div>
      ))}
    </>
  )
}

export default ToDoItem
