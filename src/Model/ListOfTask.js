export default class ListOfTask {
    constructor() {
        this.list = [];
    }

    addTask = (task) => {
        this.list = [...this.list, task]
    }

    findTask = (id) => {
        for (let task of this.task) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    }

    findIndex = (id) => {
        for (let index in this.task) {
            if (this.list[index].id === id) {
                return index;
            }
        }

        return null;
    }
}