using System.Net.Mime;
using backend_api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class TodoController : ControllerBase
{
    public static Dictionary<Guid, TodoItem> TodoStore = new Dictionary<Guid, TodoItem>();


    [HttpGet("todos")]
    public List<TodoItem> FetchTodos()
    {
        return TodoStore.Values.ToList();
    }

    [HttpGet("{id}")]
    public TodoItem GetTodoById(Guid id)
    {
        if (!TodoStore.ContainsKey(id))
        {
            this.Response.StatusCode = 404;

            return null;
        }

        return TodoStore[id];
    }

    [HttpPost("create")]
    public TodoItem CreateTodoItem(CreateTodoRequest request)
    {
        if (string.IsNullOrEmpty(request.Title))
        {
            this.Response.StatusCode = 400;

            return null;
        }


        var todoItem = new TodoItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Completed = request.Completed,
            CreatedAt = DateTime.Now
        };

        if (!TodoStore.TryAdd(todoItem.Id, todoItem))
        {
            this.Response.StatusCode = 400;
        }

        return todoItem;
    }

    [HttpPost("update")]
    public TodoItem UpdateTodoItem(UpdateTodoRequest request)
    {
        if (string.IsNullOrEmpty(request.Title))
        {
            this.Response.StatusCode = 400;

            return null;
        }

        if (!TodoStore.ContainsKey(request.Id))
        {
            this.Response.StatusCode = 404;

            return null;
        }

        var todoItem = TodoStore[request.Id];

        todoItem.Title = request.Title;
        todoItem.Completed = request.Completed;

        return todoItem;
    }


    [HttpPost("delete/{id:guid}")]
    public void DeleteTodoItem(Guid id)
    {
        if (!TodoStore.ContainsKey(id))
        {
            this.Response.StatusCode = 404;

            return;
        }

        TodoStore.Remove(id);
    }
}
