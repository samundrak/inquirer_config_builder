#Inquirer Config Question and Answer Builder
Create a scehma of your question later which will changed to Inquirer compatible question
also if you pass the answers of inquirer to `create` function then it will provide you config
file ready object which can directly saved to file as a config file.

#Setup
- Install the module through `npm i inquirer_config_builder`
- require the module and pass the schema
- call the questions function the schema as param
- `question` function will return question from schema
- `create` with the `answers` provided by inquirer will make config ready object

#Example
```
    const inquirer = require('inquirer');
    const InquirerConfigBuilder = require('inquirer_config_builder');
    
    var schema = {
        server: {
            port: {
                required: true,
                default: 9393
            }
        },
        default: {
            database: {
                type: 'list',
                required: true,
                choices: ['mysql'],
                default: 'mysql'
            }
        }
        ,
        database: {
            mysql: {
                hostname: {
                    required: true
                },
                username: {
                    required: true
                },
                database: {
                    required: true
                },
                password: {
                    required: true
                }
            }
        }
    }


    let questionReadyObject = InquirerConfigBuilder.questions(schema);

    //will output
    //
    // [ { required: true,
    //     default: 9393,
    //     message: 'Enter port',
    //     name: 'server.port',
    //     validate: [Function: required] },
    // { type: 'list',
    //     required: true,
    //     choices: [ 'mysql' ],
    // default: 'mysql',
    //     message: 'Enter database',
    //     name: 'default.database',
    //     validate: [Function: required] },
    // { required: true,
    //     message: 'Enter hostname',
    //     name: 'database.mysql.hostname',
    //     validate: [Function: required] },
    // { required: true,
    //     message: 'Enter username',
    //     name: 'database.mysql.username',
    //     validate: [Function: required] },
    // { required: true,
    //     message: 'Enter database',
    //     name: 'database.mysql.database',
    //     validate: [Function: required] },
    // { required: true,
    //     message: 'Enter password',
    //     name: 'database.mysql.password',
    //     validate: [Function: required] } ]
    //


    inquirer
        .prompt(questionReadyObject).then(answers => {
        "use strict";
        let configReadyObject = InquirerConfigBuilder.create(answers);
        console.log(configReadyObject);

        //Will output
        // { server: { port: 9393 },
        // default: { database: 'mysql' },
        //     database:
        //     { mysql:
        //     { hostname: '127.0.0.1',
        //         username: 'root',
        //         database: 'databasename',
        //         password: 'password' } } }

});


```