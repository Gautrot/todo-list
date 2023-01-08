import { useToDoListContext } from "@/components/business/ToDoListContext"
import Button from "@/components/ui/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useCallback } from "react"

const ToDoTab = ({ onClick, active = false, toDoList, checkedCount }) => {
  const onChangeTab = () => {
    onClick(toDoList.name)
  }

  return (
    <li className={`${active ? "active" : ""} tab-item`} onClick={onChangeTab}>
      <button className="inline-block p-2 rounded-t-lg border-2 border-transparent hover:bg-slate-700 hover:text-gray-300 hover:border-gray-500">
        <div className="flex flex-row">
          <span className="p-1 mr-5">{toDoList.name}</span>
          <div className="px-2 py-1 rounded-l-lg bg-green-700">
            {checkedCount}
          </div>
          <div className="px-2 py-1 rounded-r-lg bg-red-800">
            {toDoList.list.length}
          </div>
        </div>
      </button>
    </li>
  )
}

const ToDoNavbar = () => {
  const { toDoLists, checkedCount, onClickTabItem } = useToDoListContext()
  const router = useRouter()

  const handleCreateToDoList = useCallback(() => {
    router.push("/toDoLists/add")
  }, [router])

  return (
    <div className="mb-4 border-b border-gray-700">
      <ul className="flex flex-wrap text-center">
        {toDoLists.map((toDoList) => (
          <ToDoTab
            key={toDoList.id}
            toDoList={toDoList}
            checkedCount={checkedCount}
            onClick={onClickTabItem}
          />
        ))}
        <Button
          className="inline-block p-2 rounded-t-lg border-2 border-transparent hover:bg-slate-700 hover:text-gray-300 hover:border-gray-500"
          onClick={handleCreateToDoList}
          title="Add a new list"
        >
          <PlusIcon className="h-8 w-7" />
        </Button>
      </ul>
    </div>
  )
}

export default ToDoNavbar
