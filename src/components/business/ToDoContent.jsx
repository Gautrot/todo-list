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

const ToDoContent = (props) => {
  const { activeTab, onCheckboxChange, countChecked } = props
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

  return (
    <div>
      {activeTab === undefined ? (
        <div className="flex h-screen">
          <div className="m-auto text-slate-700 font-black text-4xl text-center ">
            Select a tab above to show its content here
          </div>
        </div>
      ) : (
        toDoLists.map((toDoList) =>
          toDoList.name !== activeTab ? null : (
            <div
              className="p-2 bg-slate-800 rounded-lg flex h-screen"
              key={toDoList.id}
            >
              <div className="mb-auto w-full mt-0">
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
                      title="Filter by completed"
                    >
                      <FunnelIcon className="h-7 w-7" />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-red-900 rounded-full h-2 mb-5">
                  <div
                    className="bg-green-700 h-2 rounded-full"
                    style={{
                      width: `${
                        (countChecked.length * 100) / toDoList.list.length
                      }%`,
                    }}
                  />
                </div>
                <ToDoItem
                  toDoList={toDoList}
                  onCheckboxChange={onCheckboxChange}
                />
              </div>
            </div>
          )
        )
      )}
    </div>
  )
}

export default ToDoContent
