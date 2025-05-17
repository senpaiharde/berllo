
export function transformTasksFromBackend(tasks) {
    const transformedTasks = [];
  
    tasks.forEach((task) => {
        const transformedTask = {
          _id: task._id,
          taskChecked: task.isDueComplete ?? false,
          archivedAt: task.archivedAt ?? null,
          taskMembers: task.members || [],
          taskTitle: task.title,
          taskDescription: task.description || '',
          taskLabels: (task.labels || []).map(label => {
            // Normalize label whether it's a string or object
            if (typeof label === 'string') {
              return { id: '', title: '', color: label };
            }
            return {
              id: label.id || '',
              title: label.title || '',
              color: label.color || ''
            };
          }),
          taskStartDate: task.startDate ? new Date(task.startDate).getTime() : null,
          taskCoordinates: task.coordinates || [],
          taskDueDate: task.dueDate ? new Date(task.dueDate).getTime() : null,
          taskDateReminder: task.reminder ? new Date(task.reminder).getTime() : null,
          taskList: task.list,
          taskboard: task.board,
          taskCheckList: (task.checklist || []).flatMap(checklist =>
            checklist.items?.map(item => item.text) || []
          ),
          taskCover: {
            coverType: task.cover?.coverType || '',
            coverColor: task.cover?.coverColor || '',
            coverImg: task.cover?.coverImg || ''
          },
          taskActivityComments: (task.comments || []).map(comment => ({
            userId: comment.user,
            userFullName: '', // You can populate this if you have user lookup
            comment: comment.text,
            date: comment.createdAt ? new Date(comment.createdAt).getTime() : null
          }))
        };
  
        transformedTasks.push(transformedTask);
      });
    
  
    return transformedTasks;
  }
  
  export function transformListsFromBackend(lists) {
    return lists.map((list) => ({
      _id: list._id,
      taskListTitle: list.title,
      taskListBoard: list.board,
      archivedAt: list.archivedAt ?? null,
      listCollapsed: list.listCollapsed ?? false,
      sortedBy: list.sortedBy ?? 'date',
      listStyle: {
        backgroundColor: list.style?.backgroundColor || ''
      },
      // taskList: list.tasks.map((task) => ({
      //   _id: task._id,
      //   taskChecked: task.isDueComplete ?? false,
      //   archivedAt: task.archivedAt ?? null,
      //   taskMembers: task.members || [],
      //   taskTitle: task.title,
      //   taskDescription: task.description || '',
      //   taskLabels: (task.labels || []).map(label => {
      //     if (typeof label === 'string') {
      //       return { id: '', title: '', color: label };
      //     }
      //     return {
      //       id: label.id || '',
      //       title: label.title || '',
      //       color: label.color || ''
      //     };
      //   }),
      //   taskStartDate: task.startDate ? new Date(task.startDate).getTime() : null,
      //   taskCoordinates: task.coordinates || [],
      //   taskDueDate: task.dueDate ? new Date(task.dueDate).getTime() : null,
      //   taskDateReminder: task.reminder ? new Date(task.reminder).getTime() : null,
      //   taskList: task.list,
      //   taskboard: task.board,
      //   taskCheckList: (task.checklist || []).flatMap(checklist =>
      //     checklist.items?.map(item => item.text) || []
      //   ),
      //   taskCover: {
      //     coverType: task.cover?.coverType || '',
      //     coverColor: task.cover?.coverColor || '',
      //     coverImg: task.cover?.coverImg || ''
      //   },
      //   taskActivityComments: (task.comments || []).map(comment => ({
      //     userId: comment.user,
      //     userFullName: '', // Enrich from users if needed
      //     comment: comment.text,
      //     date: comment.createdAt ? new Date(comment.createdAt).getTime() : null
      //   }))
      // }))
    }));
  }

 export function transformBoardFromBackend(rawBoard) {
    return {
      _id: rawBoard._id,
      boardTitle: rawBoard.title || '',
      isStarred: rawBoard.isStarred ?? false,
      archivedAt: rawBoard.archivedAt ?? null,
      createdBy: {
        _id: rawBoard.createdBy?._id || '',
        fullname: rawBoard.createdBy?.fullname || '',
        imgUrl: rawBoard.createdBy?.imgUrl || ''
      },
      boardStyle: {
        backgroundImage: rawBoard.style?.backgroundImage || ''
      },
      boardLabels: (rawBoard.labels || []).map((label, index) => ({
        id: label.id || `d${index + 1}`,
        color: label.color || '',
        title: label.title || ''
      })),
      boardMembers: rawBoard.members || [],
      boardActivities: (rawBoard.activities || []).map(activity => ({
        id: activity.id || '',
        title: activity.title || '',
        createdAt: activity.createdAt ? new Date(activity.createdAt).getTime() : null,
        byMember: {
          _id: activity.byMember?._id || '',
          fullname: activity.byMember?.fullname || '',
          imgUrl: activity.byMember?.imgUrl || ''
        },
        group: {
          id: activity.group?.id || '',
          title: activity.group?.title || ''
        },
        task: {
          id: activity.task?.id || '',
          title: activity.task?.title || ''
        }
      })),
      // boardLists: transformListsFromBoard(rawBoard)
    };
  }
  