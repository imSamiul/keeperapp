const mongoose = require('mongoose');

const Task = require('../model/task');
const ListName = require('../model/listName');
const User = require('../model/user');

async function updateTasksWithListReference() {
  await mongoose.connect('mongodb://localhost:27017/keeper-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const lists = await ListName.find(); // Get all lists

    lists.forEach(async (list) => {
      // Assuming 'tasks' in List contains the task IDs
      await Task.updateMany(
        { _id: { $in: list.tasks } }, // Find tasks with IDs in the list's tasks array
        { $set: { listName: list.title } }, // Set the 'list' field to the current list's ID
      );
    });

    console.log('Tasks updated successfully');
  } catch (error) {
    console.error('Error updating tasks:', error);
  }
}
updateTasksWithListReference();

// try {
//   const users = await User.find();
//   users.forEach(async (user) => {
//     const newList = new ListName({ name: 'tasks', owner: user._id });
//     await newList.save();
//   });
//   console.log('List updated successfully');
// } catch (error) {
//   console.log('Error updating list:', error);
// }
// }
