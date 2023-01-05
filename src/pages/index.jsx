import Layout from "@/components/ui/Layout"
import ToDoNavbar from "@/components/business/ToDoNavbar"
import ToDoContent from "@/components/business/ToDoContent"
import { useState } from "react"
import { useToDoListContext } from "@/components/business/ToDoListContext"

const Index = () => {
  const { toDoLists } = useToDoListContext()
  const [activeTab, setActiveTab] = useState(toDoLists[0].title)
  const onClickTabItem = (tab) => setActiveTab(tab)

  const [countChecked, setCountChecked] = useState([])
  const onCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setCountChecked([...countChecked, item])
    } else {
      setCountChecked((prev) =>
        prev.filter((currItem) => currItem.value !== item.value)
      )
    }
  }

  return (
    <Layout title="Index">
      <ToDoNavbar
        activeTab={activeTab}
        onClickTabItem={onClickTabItem}
        onCheckboxChange={onCheckboxChange}
        countChecked={countChecked}
      />
      <ToDoContent
        activeTab={activeTab}
        onCheckboxChange={onCheckboxChange}
        countChecked={countChecked}
      />
    </Layout>
  )
}

export default Index
