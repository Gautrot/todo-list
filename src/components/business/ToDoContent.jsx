import ToDoItem from "@/components/business/ToDoItem"
import { useToDoListContext } from "@/components/business/ToDoListContext"
import Button from "@/components/ui/Button"
import {
  FunnelIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useCallback } from "react"

const ToDoContent = () => {
  const { toDoLists, deleteToDoList, checkedCount, filterData, activeTab } =
    useToDoListContext()
  const router = useRouter()

  const handleEditToDoList = useCallback(
    (e) => {
      const toDoListId = Number.parseInt(
        e.currentTarget.getAttribute("data-todolist-id")
      )
      router.push(`/toDoLists/${toDoListId}/edit`)
    },
    [router]
  )

  const handleDeleteToDoList = useCallback(
    (e) => {
      const toDoListId = Number.parseInt(
        e.currentTarget.getAttribute("data-todolist-id")
      )

      deleteToDoList(toDoListId)
    },
    [deleteToDoList]
  )

  const handleCreateToDoItem = useCallback(
    (e) => {
      const toDoListId = Number.parseInt(
        e.currentTarget.getAttribute("data-todolist-id")
      )
      router.push({
        pathname: "/toDoItems/add",
        query: { listId: toDoListId },
      })
    },
    [router]
  )

  return (
    <div>
      {activeTab === undefined || activeTab === null ? (
        <div className="text-slate-700 font-black text-4xl text-center ">
          Select a tab above to show its content here, or create a new To Do
          list by pressing the + icon
        </div>
      ) : (
        toDoLists.map((toDoList) =>
          toDoList.name !== activeTab ? null : (
            <div className="p-2 bg-slate-800 rounded-lg " key={toDoList.id}>
              <div className="pb-4 flex flex-row">
                <div className="justify-items-start">
                  <Button
                    data-todolist-id={toDoList.id}
                    onClick={handleCreateToDoItem}
                    title="Add a new item"
                  >
                    <PlusIcon className="h-7 w-7" />
                  </Button>
                  <Button
                    data-todolist-id={toDoList.id}
                    onClick={handleEditToDoList}
                    title="Edit this list"
                  >
                    <PencilSquareIcon className="h-7 w-7" />
                  </Button>
                  <Button
                    data-todolist-id={toDoList.id}
                    onClick={handleDeleteToDoList}
                    title="Delete this list"
                  >
                    <TrashIcon className="h-7 w-7" />
                  </Button>
                </div>
                <div className="justify-items-end">
                  <Button
                    className="p-2 justify-self-end"
                    data-todolist-id={toDoList.id}
                    onClick={filterData}
                    title="Filter by not completed"
                  >
                    <FunnelIcon className="h-7 w-7" />
                  </Button>
                </div>
              </div>
              <div className="w-full bg-red-900 rounded-full h-2 mb-5">
                <div
                  className="bg-green-700 h-2 rounded-full"
                  style={{
                    width: `${(checkedCount * 100) / toDoList.list.length}%`,
                  }}
                />
              </div>
              <ToDoItem toDoList={toDoList} />
            </div>
          )
        )
      )}
    </div>
  )
}

export default ToDoContent
