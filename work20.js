/*Написать функцию, которая принимает на вход URL, 
например https://www.google.com/doodles/rubiks-cube, 
и возвращает объект вида:

{

 protocol: “http”, 

 hostname: “www.google.com”,

 child: {

  path: “doodles”

  child: {

   rubiks-cube

  }

 }

}

URL может быть любой длины, 
но формат всегда будет {protocol}://{hostname}/path/path/…/path
*/

const url = 'https://www.google.com/doodles/rubiks-cube'


function db_url(url_name) {
    let container = {}
    let protocol = url_name.split('://')[0]
    let string = url_name.split('://')[1]
    let [hostname, ...path] = string.split('/')

    container.protochol = protocol
    container.hostname = hostname

    for (let i = path.length -1; i > -1; i-- ) {
        let child = {
            path: path[i]
        }
        if (container.child) {
            child.child = container.child
            container.child = child
        }
        container.child = child
    }

    console.log(container)

    return container
}


db_url(url)