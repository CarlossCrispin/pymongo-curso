import os
import pprint
def clear_system(function):
    
    def wrap(*args, **kwargs):

        os.system('clear')
        result= function(*args, **kwargs)
        input('')
        os.system('clear')
    wrap.__doc__ = function.__doc__
    return wrap

def show_user(user):
    pp = pprint.PrettyPrinter(ident=4)
    pp.print(user)

@clear_system
def create_user(collection):
    """ A) crar un usuario """
    print('crear usuario\n')
    username = input('Username :')
    edad = int(input('Edad :'))
    email = input('Email :')
    #Documento
    user = dict(username=username, edad=edad, email=email)
    direccion= input('¿Quiere agregar direccion?(S/N').lower()
    if direccion == 's':
        user['direccion'] = get_address()
    

    print(collection)

    collection.insert_one(user)
    show_user(user)

    return user

def get_address():
    calle = input('Calle : ')
    ciudad = input('Ciudad : ')
    estado = input('Estado : ')
    codigo_postal = input('Código Postal: ')
    direccion = dict(calle=calle, ciudad=ciudad, estado=estado, codigo_postal=codigo_postal)
    return direccion
@clear_system
def get_user(collection):
    """ B) consultar un usuario """
    username = input('Username :')
    user = collection.find_one(
        {'username':username},
        {'_id':False}
    )
    if user :
        show_user(user)
        return user
    else:
        print('No existe usuario')

@clear_system        
def delete_user(collection):
    """ C) borrar un usuario """
    username = input('Username :')
    return collection.remove(
        {'username':username}
    )

def update_user():
    """ D) actualizar un usuario """
    print('actualizar usuario\n')

def default(*args, **kwargs):
    print('\n opcion no valida\n')