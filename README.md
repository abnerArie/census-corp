# Running Angular Project and Unit Tests

Hello, in this guide, I will be explaining how to run an Angular application and run unit tests using various commands.

## Prerequisites
Before we start, make sure you have both Node.js and npm installed.

## Running Angular Project

1. **Installation of Angular CLI**

    Angular CLI is a powerful tool to initialize, develop and maintain Angular applications. You can install it globally on your machine using npm:

        ```bash
        npm install -g @angular/cli
        ```

2. **Install dependencies**

    Now, navigate to the directory where the app is located, run the following command:

        ```bash
        npm install
        ```

3. **Running the Application**

    Start the server:

        ```bash
        cd my-app
        ng serve
        ```

    The ng serve command launches the server, watches your files, and rebuilds the app as you make changes to those files. The --open (or just -o) option automatically opens your browser to http://localhost:4200/.

## Running Unit Tests

1. **Angular Unit Testing**

    Angular uses Jasmine for its test framework and Karma for its test runner. Karma is a tool that spawns a web server that executes source code against a configured set of browsers.

2. **Running Unit Test Using Karma**

   You can run your unit tests with the `ng test` command. It compiles your application and starts the Karma test runner.

    ```bash
    ng test
    ```

   The command line will output the test results in real time. By default, ng test starts Chrome and watches for tests. You can add the `--no-watch` flag to run your tests once and terminate the process.

    ```bash
    ng test --no-watch
    ```

I hope this document provides you a good understanding of how to start with your Angular project and how to test it.