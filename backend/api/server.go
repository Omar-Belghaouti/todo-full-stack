package api

import (
	"github.com/gin-gonic/gin"
)

// Server serves HTTP requests for our todo service
type Server struct {
	router *gin.Engine
}

// NewServer create a new HTTP server and setup routing
func NewServer() (*Server, error) {
	s := &Server{
		router: gin.Default(),
	}
	s.setupRouter()
	return s, nil
}

// setupRouter sets up the routing of the server
func (s *Server) setupRouter() {
	s.router.GET("/todos", s.getTodos)
	s.router.POST("/todos", s.createTodo)
	s.router.GET("/todos/:id", s.getTodo)
	s.router.PUT("/todos/:id", s.updateTodo)
	s.router.DELETE("/todos/:id", s.deleteTodo)
}

// Start run the HTTP server on a specific address
func (s *Server) Start(addr string) error {
	return s.router.Run(addr)
}
