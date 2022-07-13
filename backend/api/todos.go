package api

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// Todo struct
type Todo struct {
	ID        int    `json:"id"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// todos is a list of todos
var todos []Todo = []Todo{}

// createTodoRequest is the request body for creating a new todo
type createTodoRequest struct {
	Text string `json:"text"`
}

// updateTodoRequest is the request body for updating a todo
type updateTodoRequest struct {
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

// getTodos returns all todos
func (s *Server) getTodos(c *gin.Context) {
	c.JSON(http.StatusOK, todos)
}

// createTodo creates a new todo
func (s *Server) createTodo(c *gin.Context) {
	var request createTodoRequest
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	todo := Todo{
		Text:      request.Text,
		ID:        len(todos) + 1,
		Completed: false,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
		UpdatedAt: time.Now().UTC().Format(time.RFC3339),
	}
	todos = append(todos, todo)
	c.JSON(http.StatusCreated, todo)
}

// getTodo returns a single todo
func (s *Server) getTodo(c *gin.Context) {
	_id := c.Param("id")
	// convert id to int
	id, err := strconv.Atoi(_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for _, todo := range todos {
		if todo.ID == id {
			c.JSON(http.StatusOK, todo)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "todo not found"})
}

// updateTodo updates a todo
func (s *Server) updateTodo(c *gin.Context) {
	_id := c.Param("id")
	// convert id to int
	id, err := strconv.Atoi(_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for index, todo := range todos {
		if todo.ID == id {
			var request updateTodoRequest
			if err := c.BindJSON(&request); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			todo.Text = request.Text
			todo.Completed = request.Completed
			todo.UpdatedAt = time.Now().UTC().Format(time.RFC3339)
			todos[index] = todo
			c.JSON(http.StatusOK, todo)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "todo not found"})
}

// deleteTodo deletes a todo
func (s *Server) deleteTodo(c *gin.Context) {
	_id := c.Param("id")
	// convert id to int
	id, err := strconv.Atoi(_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for index, todo := range todos {
		if todo.ID == id {
			todos = append(todos[:index], todos[index+1:]...)
			c.JSON(http.StatusOK, todo)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "todo not found"})
}
