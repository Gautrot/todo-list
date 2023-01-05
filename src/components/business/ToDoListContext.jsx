import { createContext, useCallback, useContext, useState } from "react"
export const Context = createContext()
export const useToDoListContext = () => useContext(Context)

const initialToDoItems = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
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
    (toDoList) => {
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
      ])
    },
    [getNewListId]
  )

  const deleteToDoList = useCallback(
    (toDoListId) =>
      setToDoLists(toDoLists.filter((toDoList) => toDoList.id !== toDoListId)),
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
  const [toDoItems, setToDoItems] = useState(initialToDoItems)
  const getNewItemId = useCallback(() => {
    setNewItemId(newItemId + 1)

    return newItemId
  }, [newItemId])

  const createToDoItem = useCallback(
    (toDoItem) => {
      setToDoItems((toDoItems) => [
        ...toDoItems,
        {
          id: getNewItemId(),
          ...toDoItem,
        },
      ])
    },
    [getNewItemId]
  )

  const deleteToDoItem = useCallback(
    (toDoItemId) =>
      setToDoItems(toDoItems.filter((toDoItem) => toDoItem.id !== toDoItemId)),
    [toDoItems]
  )

  const editToDoItem = useCallback((updatedToDoItem, toDoListId) => {
    setToDoItems(
      (toDoLists) => toDoLists.filter(({ id }) => id === toDoListId).list
    )
  }, [])

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
      }}
    />
  )
}

export default ToDoListContext
