""" 

URL= 'mongodb+srv://leviatan:vaporty@cluster0-76lwk.mongodb.net/test?retryWrites=true&w=majority'
 """


from decouple import config

URL= 'mongodb+srv://leviatan:{}@cluster0-76lwk.mongodb.net/test?retryWrites=true&w=majority'.format(
    config('MONGODB_PASSWORD', default='password')
) 


