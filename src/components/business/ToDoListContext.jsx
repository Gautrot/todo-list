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
    // const selectedToDoItem = toDoLists.find(
    //   ({ id }) => id === toDoListId
    // ).list
    // .find(({ id }) => id === updatedToDoItem.id)
    // .map((toDoItem) => {
    //   toDoItem.id === updatedToDoItem.id ? toDoItem : null
    // })

    // const selectedToDoItem = toDoItems.find(
    //   ({ id }) => id === updatedToDoItem.id
    // )
    // console.log(selectedToDoItem, updatedToDoItem)

    setToDoItems(
      (toDoLists) => toDoLists.find(({ id }) => id === toDoListId).list
      // .map((toDoItem) => {
      //   toDoItem.id === updatedToDoItem.id ? updatedToDoItem : toDoItem
      // })
    )

    // const test = console.log(test.list.flatMap())

    // toDoLists.map((toDoList) => {
    //   const test = toDoList.id === toDoListId && toDoList
    //   console.log(typeof test)
    // })

    // test.list.find(({ list }) => list)
    // .find(({ id }) => id === toDoListId)
    // .map(({ list }) => {
    //   console.log(list)
    //   list
    // })
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
