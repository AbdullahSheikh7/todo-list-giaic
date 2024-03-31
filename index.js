#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradientString from "gradient-string";
const sleep = async (ms = 2000) => {
    await new Promise((r) => {
        setTimeout(r, ms);
    });
};
const list = async (message, choices) => {
    return (await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: message,
            choices: choices,
        },
    ])).choice;
};
const main = async () => {
    figlet("Todo List", (error, data) => {
        console.log(gradientString.pastel.multiline(data));
    });
    await sleep(100);
    let developer = chalkAnimation.rainbow("Made by Abdullah");
    await sleep(1000);
    developer.stop();
    let github = chalkAnimation.neon("github.com/abdullahsheikh7/\n");
    await sleep(1000);
    github.stop();
    let exit = false;
    let options = [
        "View tasks",
        "Add task",
        "Mark task as completed",
        "Delete task",
        "Exit",
    ];
    let todoList = [];
    while (!exit) {
        let choice = await list("Please select an option", options);
        if (choice === "View tasks") {
            if (todoList.length === 0) {
                console.log(chalk.red("No tasks found! Add tasks first\n"));
                continue;
            }
            console.log(todoList
                .map((task) => {
                return `\u2022 ${task}\n`;
            })
                .join(""));
        }
        else if (choice === "Add task") {
            let task = (await inquirer.prompt([
                {
                    name: "task",
                    type: "prompt",
                    message: "Please enter the task: ",
                },
            ])).task;
            todoList.push(task);
            console.log(chalk.green("Task added successfully!\n"));
        }
        else if (choice === "Mark task as completed") {
            if (todoList.length === 0) {
                console.log(chalk.red("No tasks found! Add tasks first\n"));
                continue;
            }
            let completeThisTask = await list("Please select a task", todoList);
            todoList.splice(todoList.indexOf(completeThisTask), 1);
            console.log(chalk.green("Task marked as completed!\n"));
        }
        else if (choice === "Delete task") {
            if (todoList.length === 0) {
                console.log(chalk.red("No tasks found! Add tasks first\n"));
                continue;
            }
            let completeThisTask = await list("Please select a task", todoList);
            todoList.splice(todoList.indexOf(completeThisTask), 1);
            console.log(chalk.green("Task deleted successfully!\n"));
        }
        else if (choice === "Exit") {
            if ((await inquirer.prompt([
                {
                    name: "exit",
                    type: "confirm",
                    message: "Are you sure you want to exit?",
                },
            ])).exit) {
                exit = true;
            }
            else {
                console.log("");
            }
        }
    }
};
main();
