<template>
  <div class="tasks-container">
    <NuxtLink to="/user/profile" class="profile-link">Your To-do</NuxtLink>
    <form @submit.prevent="createTask" class="task-form">
      <input type="text" v-model="task" placeholder="Time to get things done?" class="task-input">
      <button type="submit" class="submit-button">+</button>
    </form>

    <div class="tasks-list">
        <div v-for="task in tasks" :key="task.id" class="task-item">
            <p>{{ task.todo }}</p> 
            <button @click="deleteTask(task.id)" class="delete-button">×</button>
        </div>
    </div>
    <p class="counter">Your remaining todos: {{ taskCounter }} </p>
    <p class="quote">"Doing what you love is the cornerstone of having abundance in your life." - Wayne Dyer</p>
  </div>
</template>

<style scoped>
.tasks-container {
    margin: 6rem auto;
    width: 90%;
    max-width: 500px;
    padding: 1rem;
}

.profile-link {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    margin: 1rem 0;
    color: black;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
}

.profile-link:hover {
    text-decoration: underline;
}

.task-form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.task-input {
    flex: 1;
    padding: 0.8rem 1rem;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    margin-right: 1rem;
    font-size: 1rem;
}

.submit-button {
    background-color: rgb(72, 72, 72);
    color: white;
    border-radius: 5px;
    border: none;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.submit-button:hover {
    cursor: pointer;
}

.tasks-list {
    display: flex;
    flex-direction: column;
    justify-content: start;
    max-height: 320px;
    overflow-y: auto;
    width: 100%;
}

.task-item {
    margin-top: 1rem;
    width: 100%;
    padding: 0.8rem;
    padding-left: 1rem;
    border: 1px solid rgb(72, 72, 72);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 100;
    border-radius: 10px;
    box-sizing: border-box;
}

.task-item p {
    width: 85%;
    overflow: hidden;
    margin: 0;
    word-break: break-word;
}

.delete-button {
    background-color: transparent;
    color: black;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: 15%;
    text-align: center;
}

.counter {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: start;
    font-style: italic;
    font-size: 1rem;
}

.quote {
    margin-top: 1rem;
    font-style: italic;
    opacity: 0.6;
    font-size: 0.9rem;
    text-align: center;
}

/* Responsive styles for mobile devices */
@media (max-width: 768px) {
    .tasks-container {
        margin: 1rem auto;
        width: 95%;
        padding: 0.5rem;
    }
    
    .profile-link {
        padding-left: 0.5rem;
        font-size: 1.3rem;
        margin: 0.8rem 0;
    }
    
    .task-form {
        margin-bottom: 1rem;
    }
    
    .task-input {
        padding: 0.6rem 0.8rem;
        margin-right: 0.5rem;
        font-size: 0.9rem;
    }
    
    .submit-button {
        height: 2.2rem;
        width: 2.2rem;
        font-size: 1.3rem;
    }
    
    .task-item {
        margin-top: 0.8rem;
        padding: 0.6rem;
        padding-left: 0.8rem;
    }
    
    .counter {
        font-size: 0.9rem;
        margin-top: 0.8rem;
    }
    
    .quote {
        font-size: 0.8rem;
        margin-top: 0.8rem;
    }
}

@media (max-width: 480px) {
    .tasks-container {
        margin: 5rem auto;
        width: 100%;
        padding: 0 1rem;
    }
    
    .profile-link {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        padding-left: 0.3rem;
    }
    
    .task-form {
        margin-bottom: 0.8rem;
    }
    
    .task-input {
        padding: 0.5rem;
        margin-right: 0.3rem;
        font-size: 0.85rem;
    }
    
    .submit-button {
        height: 2rem;
        width: 2rem;
        font-size: 1.2rem;
    }
    
    .tasks-list {
        max-height: 400px;
    }
    
    .task-item {
        margin-top: 0.6rem;
        padding: 0.5rem;
        padding-left: 0.6rem;
    }
    
    .task-item p {
        width: 80%;
        font-size: 0.85rem;
    }
    
    .delete-button {
        width: 20%;
        font-size: 1.3rem;
    }
    
    .counter {
        font-size: 0.85rem;
        margin-top: 0.6rem;
    }
    
    .quote {
        font-size: 0.75rem;
        margin-top: 0.6rem;
    }
}
</style>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const taskCounter = ref(0)

const task = ref("")
const tasks = ref([])

const client = useSupabaseClient()
const user = useSupabaseUser()

// Fetch initial tasks
const fetchTasks = async () => {
  try {
    const { data, error } = await client.from('todos').select()
    if (error) {
      console.error('Error fetching tasks:', error.message)
      return
    }
    tasks.value = data || []
    taskCounter.value = tasks.value.length
  } catch (error) {
    console.error('Error fetching tasks:', error.message)
  }
}

// Create a new task
const createTask = async () => {
  if (!task.value.trim()) return
  
  try {
    const { error } = await client.from('todos').insert({
      todo: task.value,
      user_id: user.value?.id
    })
    
    if (error) {
      console.error('Error creating task:', error.message)
      return
    }
    task.value = "" // Clear input after submission
  } catch (error) {
    console.error('Error creating task:', error.message)
  }
}

// Delete a task
const deleteTask = async (id) => {
  try {
    const { error } = await client.from('todos').delete().eq('id', id)
    
    if (error) {
      console.error('Error deleting task:', error.message)
      return
    }
    
    // Remove the task from the local list
    tasks.value = tasks.value.filter((t) => t.id !== id)
    taskCounter.value = tasks.value.length
  } catch (error) {
    console.error('Error deleting task:', error.message)
  }
}

// Set up realtime channel
let realtimeChannel

onMounted(() => {
  // Fetch tasks when component mounts
  fetchTasks()
  
  // Set up realtime subscription
  realtimeChannel = client.channel('tasks-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'todos'
      },
      (payload) => {
        // Add new task to the list
        tasks.value.push(payload.new)
        taskCounter.value = tasks.value.length
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'todos'
      },
      (payload) => {
        // Update existing task in the list
        const index = tasks.value.findIndex((t) => t.id === payload.new.id)
        if (index !== -1) {
          tasks.value[index] = payload.new
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'todos'
      },
      (payload) => {
        // Remove deleted task from the list
        tasks.value = tasks.value.filter((t) => t.id !== payload.old.id)
        taskCounter.value = tasks.value.length
      }
    )
    .subscribe()
})

// Clean up realtime subscription when component is unmounted
onUnmounted(() => {
  if (realtimeChannel) {
    client.removeChannel(realtimeChannel)
  }
})

// Watch for changes in tasks array and update counter
watch(tasks, (newTasks) => {
  taskCounter.value = newTasks.length
})
</script>
