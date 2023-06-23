namespace backend_api.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    public class UpdateTodoRequest
    {
        /// <summary>
        /// 
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool Completed { get; set; }
    }
}