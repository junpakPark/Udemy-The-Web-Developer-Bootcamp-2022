let input = prompt("What Would you like to do?")

const toDoList = []

while (input !== 'quit' && input !== 'q'){
    if(input === 'new'){
        const newTodo = prompt('Ok, What is the new to do?');
        toDoList.push(newTodo);
        console.log(`${input} added to list`);
    } else if(input === 'list') {
        console.log('**********');
        for (let i = 0; i < toDoList.length; i++) {
            console.log(`${i} : ${toDoList[i]}` );
        }
        console.log('**********');
    } else if (input === 'delete') {
        const index = prompt('Ok, enter an index to delete:');
        if(!Number.isNaN(parseInt(index))){
            const deleted = toDoList.splice(index, 1);
            console.log(`ok, deleted ${deleted[0]}`)
        } else {
            console.log('unknown index')
        }
    }
    input = prompt("What Would you like to do?")
}

if (input === 'quit') {
    console.log("OK, BYE!")
}