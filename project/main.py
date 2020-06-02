from config import URL

from pymongo import MongoClient

from funtions import create_user
from funtions import get_user
from funtions import delete_user
from funtions import update_user
from funtions import default

if __name__ =='__main__':
    print('Hola Mundo, desde el taller de MongoDB')
    client = MongoClient(URL)
    database = client['cursoMongoDB']
    collection = database['users']
    print('Conexion exitosa !!! . --->   🚀\n')

    options = {
        'a': create_user,
        'b': get_user,
        'c': delete_user,
        'd': update_user
    }

    while True:

        for key, function in options.items():
            print(function.__doc__)
        option = input('Opcion :  ').lower()

        if option == 'q' or  option == 'quit':
            break
        function_selected = options.get(option, default)
        function_selected(collection)