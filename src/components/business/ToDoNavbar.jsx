import { useToDoListContext } from "@/components/business/ToDoListContext"
import { PlusIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useCallback } from "react"

const ToDoNavbar = (props) => {
  const { completed } = props
  const { toDoLists } = useToDoListContext()
  const router = useRouter()

  const handleCreateToDoList = useCallback(() => {
    router.push("/toDoLists/add")
  }, [router])

  return (
    <div className="mb-4 border-b border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-center"
        id="navTab"
        data-tabs-toggle="#navTabContent"
        role="tablist"
      >
        {toDoLists.map((toDoList) => (
          <div key={toDoList.id}>
            <li role="presentation">
              <button
                className="inline-block p-2 rounded-t-lg border-2 border-transparent hover:bg-slate-700 hover:text-gray-300 hover:border-gray-500"
                type="button"
                id={`${toDoList.id}-tab`}
                data-tabs-target={`#${toDoList.id}`}
                role="tab"
                aria-controls={`${toDoList.id}`}
                aria-selected={toDoList.id === 1}
              >
                <div className="flex flex-row">
                  <span className="p-1 mr-5">{toDoList.name}</span>
                  <div className="px-2 py-1 rounded-l-lg bg-green-700">
                    {completed}
                  </div>
                  <div className="px-2 py-1 rounded-r-lg bg-red-800">
                    {toDoList.list.length}
                  </div>
                </div>
              </button>
            </li>
          </div>
        ))}
        <button
          className="inline-block p-2 rounded-t-lg border-2 border-transparent hover:bg-slate-700 hover:text-gray-300 hover:border-gray-500"
          onClick={handleCreateToDoList}
          title="Add a new list"
        >
          <PlusIcon className="h-8 w-7" />
        </button>
      </ul>
    </div>
  )
}

export default ToDoNavbar
