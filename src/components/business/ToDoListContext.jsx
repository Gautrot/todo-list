import { createContext, useCallback, useContext, useState } from "react"
export const Context = createContext()
export const useToDoListContext = () => useContext(Context)

const initialToDoItems = [
  {
    id: 1,
    name: "Item 1",
  },
]

const initialToDoLists = [
  {
    id: 1,
    name: "List 1",
    list: initialToDoItems,
  },
]

const ToDoListContext = (props) => {
  const [newListId, setNewListId] = useState(2)
  const [toDoLists, setToDoLists] = useState(initialToDoLists)
  const getNewListId = useCallback(() => {
    setNewListId(newListId + 1)

    return newListId
  }, [newListId])

  const createToDoList = useCallback(
    (toDoList) =>
      setToDoLists((toDoLists) => [
        ...toDoLists,
        {
          id: getNewListId(),
          ...toDoList,
          list: [
            {
              id: 1,
              name: "New Item",
            },
          ],
        },
      ]),
    [getNewListId]
  )

  const deleteToDoList = useCallback(
    (toDoListId) => {
      setToDoLists(toDoLists.filter((toDoList) => toDoList.id !== toDoListId))
      setActiveTab(undefined)
    },
    [toDoLists]
  )

  const editToDoList = useCallback((updatedToDoList) => {
    setToDoLists((toDoLists) =>
      toDoLists.map((toDoList) =>
        toDoList.id === updatedToDoList.id ? updatedToDoList : toDoList
      )
    )
  }, [])

  const [newItemId, setNewItemId] = useState(2)
  const [toDoItems] = useState(initialToDoItems)
  const getNewItemId = useCallback(() => {
    setNewItemId(newItemId + 1)

    return newItemId
  }, [newItemId])

  const createToDoItem = useCallback(
    (toDoItem, toDoListId) =>
      toDoLists
        .find(({ id }) => id === toDoListId)
        .list.splice(toDoItems.length, 0, {
          id: getNewItemId(),
          ...toDoItem,
        }),
    [getNewItemId, toDoItems, toDoLists]
  )

  const deleteToDoItem = useCallback(
    (toDoItemId, toDoListId) => {
      setToDoLists(
        toDoLists.map((toDoList) => {
          if (toDoList.id === toDoListId) {
            return {
              ...toDoList,
              list: toDoList.list.filter(
                (toDoItem) => toDoItem.id !== toDoItemId
              ),
            }
          }

          return toDoList
        })
      )
    },
    [toDoLists]
  )

  const editToDoItem = useCallback(
    (updatedToDoItem, toDoListId) => {
      setToDoLists(
        toDoLists.map((toDoList) => {
          if (toDoList.id === toDoListId) {
            return {
              ...toDoList,
              list: toDoList.list.map((toDoItem) =>
                toDoItem.id === updatedToDoItem.id ? updatedToDoItem : toDoItem
              ),
            }
          }

          return toDoList
        })
      )
    },
    [toDoLists]
  )

  const [data, setData] = useState([])
  const [filters, setFilters] = useState([])
  const filterData = useCallback(() => {
    const filteredData = data.filter(
      (item) => !filters.includes(item.checkboxValue)
    )
    setData(filteredData)
  }, [data, filters])

  const [checkedCount, setCheckedCount] = useState(0)

  const [activeTab, setActiveTab] = useState(undefined)
  const onClickTabItem = (tab) => setActiveTab(tab)

  return (
    <Context.Provider
      {...props}
      value={{
        toDoLists,
        createToDoList,
        deleteToDoList,
        editToDoList,
        toDoItems,
        createToDoItem,
        deleteToDoItem,
        editToDoItem,
        filters,
        setFilters,
        filterData,
        checkedCount,
        setCheckedCount,
        activeTab,
        onClickTabItem,
      }}
    />
  )
}

export default ToDoListContext
