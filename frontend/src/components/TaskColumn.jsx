"use client"

import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { formatDate } from "../lib/utils"

const TaskColumn = ({
  title,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  color = "bg-gray-50 border-gray-200",
  headerColor = "bg-gray-100",
}) => {
  return (
    <div className={`border rounded-lg ${color}`}>
      <div className={`${headerColor} rounded-t-lg px-4 py-3 border-b`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <Badge variant="outline">{tasks.length}</Badge>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No tasks</p>
        ) : (
          tasks.map((task) => (
            <Card key={task._id} className="shadow-sm">
              <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start">
                <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(task)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {title !== "Pending" && (
                      <DropdownMenuItem onClick={() => onStatusChange(task._id, "Pending")}>
                        Move to Pending
                      </DropdownMenuItem>
                    )}
                    {title !== "Review" && (
                      <DropdownMenuItem onClick={() => onStatusChange(task._id, "Review")}>
                        Move to Review
                      </DropdownMenuItem>
                    )}
                    {title !== "Completed" && (
                      <DropdownMenuItem onClick={() => onStatusChange(task._id, "Completed")}>
                        Mark as Completed
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => onDelete(task._id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-3 pt-2">
                {task.description && <p className="text-sm text-gray-600 mb-2">{task.description}</p>}
                {task.dueDate && (
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="text-xs">
                      Due: {formatDate(task.dueDate)}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskColumn
