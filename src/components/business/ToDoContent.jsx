import ToDoItem from "@/components/business/ToDoItem"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import {
  FunnelIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useCallback } from "react"

const ToDoContent = () => {
  const { toDoLists, deleteToDoList } = useToDoListContext()
  const router = useRouter()

  const handleEditToDoList = useCallback(
    (e) => {
      const toDoListId = Number.parseInt(
        e.currentTarget.getAttribute("data-todolist-id"),
        10
      )
      router.push(`/toDoLists/${toDoListId}/edit`)
    },
    [router]
  )

  const handleDeleteToDoList = useCallback(
    (e) => {
      const toDoListId = Number.parseInt(
        e.currentTarget.getAttribute("data-todolist-id"),
        10
      )

      deleteToDoList(toDoListId)
    },
    [deleteToDoList]
  )

  const handleCreateToDoItem = useCallback(() => {
    router.push("/toDoItems/add")
  }, [router])

  const handleFilter = useCallback(() => {
    toDoLists
      .flatMap(({ list }) => list)
      .filter((toDoItems) => toDoItems.done === true)
  }, [toDoLists])

  return (
    <div id="navTabContent">
      {toDoLists.map((toDoList) => (
        <div
          className="p-2 bg-slate-800 rounded-lg"
          key={toDoList.id}
          id={`${toDoList.id}`}
          role="tabpanel"
          aria-labelledby={`${toDoList.id}-tab`}
        >
          <div className="pb-4 flex flex-row">
            <div className="justify-items-start">
              <button
                className="p-2"
                data-todolist-id={toDoList.id}
                onClick={handleCreateToDoItem}
                title="Add a new item"
              >
                <PlusIcon className="h-7 w-7" />
              </button>
              <button
                className="p-2"
                data-todolist-id={toDoList.id}
                onClick={handleEditToDoList}
                title="Edit this list"
              >
                <PencilSquareIcon className="h-7 w-7" />
              </button>
              <button
                className="p-2"
                data-todolist-id={toDoList.id}
                onClick={handleDeleteToDoList}
                title="Delete this list"
              >
                <TrashIcon className="h-7 w-7" />
              </button>
            </div>
            <div className="justify-items-end">
              <button
                className="p-2 justify-self-end"
                onClick={handleFilter}
                title="Filter by completed"
              >
                <FunnelIcon className="h-7 w-7" />
              </button>
            </div>
          </div>
          <div className="w-full bg-red-900 rounded-full mb-5">
            <div className="w-0 text-sm text-center font-medium p-1 leading-none rounded-full" />
          </div>
          <ToDoItem toDoList={toDoList} />
        </div>
      ))}
    </div>
  )
}

export default ToDoContent
