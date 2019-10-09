function refreshTodos(){
    $.get("/api/todos").then(function(data){
        console.log(data);
        var done = data.filter(todo => todo.done);
        var notdone = data.filter(todo => !todo.done);

        var notDoneEl = $("#not-done");
        notDoneEl.empty();
        notdone.forEach(item => {
            notDoneEl.append(
                `<li>${item.task}<button class="done" data-id="${item.id}">Done</button</li>`
            )
        });
        var doneEl = $("#done");
        doneEl.empty();
        done.forEach(item => {
            doneEl.append(
                `<li>${item.task}<button class="notdone" data-id="${item.id}">Not Done</button</li>`
            )
        });
    })
}

$(document).on("click", ".done", function(){
    $.ajax({
        method: "put", 
        url: "/api/todos/" + $(this).attr("data-id"),
        data: {done: true}
    }).then(function(){
        refreshTodos();
    })
})
$(document).on("click", ".notdone", function(){
    $.ajax({
        method: "put", 
        url: "/api/todos/" + $(this).attr("data-id"),
        data: {done: false}
    }).then(function(){
        refreshTodos();
    })
})

$("#add").on("click", function(){
    $.post("/api/todos", { task: $("#task").val(), done: false}).then(function(){
        $("#task").val("");
        refreshTodos();
    })
});

refreshTodos();