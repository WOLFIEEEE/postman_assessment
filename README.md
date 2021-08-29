# Public api's detail to database


### A node js service .

## Features:
- This will iterate through all the available api in the [public api repo](https://github.com/public-apis/public-apis) using postman api
- It will handle keep in find the constarints like 10 request per minute and changing auth token after every 5 minute .

## Requirements:
- [Docker](https://www.python.org/downloads/)
- [MongoDB Atlas](https://www.docker.com/)

## How to run :
- **Step 1**:
    Clone the repo
    ```bash
    git clone https://github.com/WOLFIEEEE/postman_assessment.git
    ```
- **Step 2**:
    Create a free mongodb atlas account [steps](https://www.mongodb.com/cloud/atlas/register).

    It will take roughly around 3-4 minute ( sorry for that )

- **Secret step**:
    As the above step might consume time so I will be leaving my connection url in env only , just for the time being as this is private repo , you won't be able to see the data stored but you can run the application and check the working.

    If you wish to use this move directly to **step4** 

- **Step 3**;
    
    After setting up account and creating cluster . 

    - click on connect 
    -  click on connect with application 
    -  You will get a url copy the url and paster it in [env.json](https://github.com/WOLFIEEEE/postman_assessment/blob/main/env.json)

    ```json
    {
    "database_uri":"mongodb url",
    "database_name":"Postman_Assessment",
    "collectionn_name":"Api collections"
    }
    ```

    Don't forget to repalce the **<** **passowrd>**  with  your own password.

## - Using docker
- **Step 4**
    In windows
     ```bash
    docker-compose up
    ```
    In Linux based operating system 
     ```bash
    sudo docker-compose up
    ```

## - Using npm
- **Step 4**
    to install all the packages
     ```bash
    npm install
    ```
    to run the application
     ```bash
    node server.js
    ```



## Flow of Code:
<p align="center">
  <img src="images/flow.png" width="" title="hover text">
</p>
    


