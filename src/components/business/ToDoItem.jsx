import { useToDoListContext } from "@/components/business/ToDoListContext"
import { TrashIcon } from "@heroicons/react/20/solid"
import { useCallback } from "react"
import { useRouter } from "next/router"

const ToDoItem = (props) => {
  const { toDoList } = props
  const { deleteToDoItem, onCheckboxChange } = useToDoListContext()
  const router = useRouter()

  const handleDeleteToDoItem = useCallback(
    (e) => {
      const toDoItemId = Number.parseInt(
        e.currentTarget.getAttribute("data-todoitem-id")
      )

      deleteToDoItem(toDoItemId, toDoList.id)
    },
    [deleteToDoItem, toDoList.id]
  )

  const handleEditToDoItem = useCallback(
    (e) => {
      const toDoItemId = Number.parseInt(
        e.currentTarget.getAttribute("data-todoitem-id")
      )
      router.push({
        pathname: `/toDoItems/${toDoItemId}/edit`,
        query: { listId: toDoList.id },
      })
    },
    [router, toDoList.id]
  )

  const handleCheckbox = useCallback(
    (e) => {
      const toDoItemName = e.currentTarget.getAttribute("data-todoitem-name")
      onCheckboxChange(e, toDoItemName)
    },
    [onCheckboxChange]
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
              data-todoitem-name={toDoItem.name}
              onChange={handleCheckbox}
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
