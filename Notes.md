### DATA
what does a Todo List Item look like?
    id   - number
    task - text
    due_date - date
    done - boolean

// Routes
    // HTML ROUTES
        GET / -> index.html
    // API ROUTES
        // See a list of our existing TODOS - READ - GET
            GET /api/todos
        // Add a task - POST
            POST /api/todos
        // Mark a task complete - UPDATE - PUT/PATCH
            PUT /api/todos/:id
