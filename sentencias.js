// insertOne
// insetMany
var user2 = {
    name: 'Montse',
    last_name: 'Mendoza',
    age: 28,
    email: 'nombre@gmail.com'
}
var user3 = {
    name: 'Magos',
    last_name: 'Ruiz',
    age: 28,
    email: 'nombre@gmail.com'
}
var user4 = {
    name: 'Omar',
    last_name: 'crispin',
    age: 28,
    email: 'nombre@gmail.com'
}

db.users.insertOne(user2)
db.users.insertMany([user3, user4])


/* CONSULTAS */

db.users.find(
    { age: 25 }//criterios ->where
)


db.users.find(
    { age: 32 },//criterios ->where
    { name: true, email: true }//select
).pretty()

// $ne -> diferente a 
// $eq -> igual a 
db.users.find(
    {
        age: {
            $ne: 32
        }
    }
).pretty()

db.users.find(
    {
        age: {
            $eq: 32
        }
    }
).pretty()

db.users.findOne(
    {
        age: {
            $eq: 28
        }
    }//criterios ->where
)


/* operadores relacionales */

// mayor a 
db.users.find(
    {
        age: {
            $gt: 29
        }
    }
).pretty()
// mayor igual
db.users.find(
    {
        age: {
            $gte: 28
        }
    }
).pretty()
// menor a 
db.users.find(
    {
        age: {
            $lt: 28
        }
    }
).pretty()
// menor igual 
db.users.find(
    {
        age: {
            $lte: 28
        }
    }
).pretty()
/* $and  */
db.users.find(
    {
        $and: [
            { age: { $gt: 25 } },
            { age: { $lt: 30 } }
        ]
    }
)
/* $or */
db.users.find(
    {
        $or: [
            { name: 'carlos' },
            { name: 'montse' }
        ]
    }
)





db.books.insertMany(
    [

        { title: 'Don quijote de la mancha', sales: 500 },

        { title: 'Historia de dos ciudades', sales: 200 },
        { title: 'El señor de los anillos', sales: 150 },
        { title: 'El principito', sales: 140 },

        { title: 'El hobbit', sales: 100 },

        { title: 'Alicia en el país de las maravillas', sales: 100 },

        { title: 'El código davincci', sales: 80 },

        { title: 'El alquimista', sales: 65 }
    ]
)


// Expresiones regulares
db.books.insertMany(
    [
        { title: "Don Quijote de la Mancha", sales: 500 },
        { title: "Historia de dos ciudades", sales: 200 },
        { title: "El señor de los anillo", sales: 150 },
        { title: "El principito", sales: 140 },
        { title: "El hobbit", sales: 100 },
        { title: "Alicia en el país de las maravillas", sales: 100 },
        { title: "El codigo Da Vinci", sales: 80 },
        { title: "El alquimista", sales: 65 }
    ]
)

// like -> exprecion regular 
// obtener los libros que comiencen con "EL"
db.books.find(
    {
        title: /^El/
    }
)

// obtener los libros que terminen con "s"
db.books.find(
    {
        title: /s$/
    }
)

// obtener los libros que posean la palabra "la"
db.books.find(
    {
        title: /la/
    }
)

// $in
db.users.find({
    name: {
        $in: ['Carlos', 'Montse']
    }
})

// $nin
db.users.find({
    name: {
        $nin: ['Carlos', 'Montse']
    }
})


var user5 = {
    name: 'Julian',
    email: 'julian@gmail.com',
    suport: true,
    createdAt: new Date()
}

db.users.find(
    {
        last_name: {
            $exists: true
        }
    }
)

db.users.find(
    {
        createdAt: {
            $type: 'date'
        }
    }
).pretty()

db.users.find(
    {
        createdAt: {
            $type: 'date'
        }
    }
).pretty()


var julian = db.users.findOne(
    {
        name: 'julian'
    }
)

julian.suport = false

// si un doc posee el attrid ->update  si no -> crea
db.users.save(julian)

/* ACTUALIZAR */
// updateOne updateMany

db.users.updateMany(
    {
        support: {
            $exists: false
        }
    },
    {
        $set: {
            support: false
        }
    }
)



db.users.updateOne(
    {
        name: 'Carlos'
    },
    {
        $set: {
            support: true
        }
    }
)


/* UNSET */

db.users.updateOne(
    {
        suport: { $exists: true }
    },
    {
        $unset: {
            suport: true
        }
    }
)

/* INCREMENTAR VALORES */

// $inc -> incrementar entero y restar 

db.users.updateOne(
    {
        name: 'Magos'
    },
    {
        $inc: {
            age: 20
        }
    }
)

/* UPSERT  ->update*/


db.users.updateOne(
    {
        name: 'Jose'
    },
    {
        $set: {
            edad: 33
        }
    },
    {
        upsert: true
    }
)

/* ELIMINAR */

db.users.remove(
    {
        name: 'Jose'
    }
)

db.books.remove({})


//dropDatabase()-->base de datos
//drop()  -> coleccion

/* CURSOR */
// find retorna un cursor de 20
for (let index = 0; index < 100; index++) {
    db.demo.insert(
        { name: 'User' + index }
    )
}

// it
//count()
db.users.find(
    {
        email: /gmail.com$/
    }
).count()

// limit() 

db.users.find().limit(2)


// skip
db.users.find().skip(4).limit(1)

//sort
//1 asc
//-1 desc
db.users.find(
    {

    },
    {
        _id: false, name: true
    }
).sort(
    {
        name: 1
    }
)

/* ENCONTRAR Y MODIFICAR */

// findAndModify

db.users.findAndModify(
    {
        query: {
            name: 'Carlos'
        },
        update: {
            $inc: {
                age: 5
            }
        }
    }
)

db.users.findAndModify(
    {
        query: {
            name: 'Carlos'
        },
        update: {
            $inc: {
                age: 5
            }
        },
        new: true
    }
)


/* RENOMBRAR ATRR */

db.users.updateMany(
    {},
    {
        $rename: {
            last_name: 'lastName'
        }
    }
)


/* LISTAS */


db.users.updateOne(
    {
        name: 'Montse'
    },
    {
        $set: {
            courses: ['Python', 'MongoDB', 'SQL', 'JAVA']
        }
    }
)


db.users.updateOne(
    {
        name: 'Omar'
    },
    {
        $set: {
            courses: ['Git', 'JavaScript', 'Redit', 'React', 'MongoDB']
        }
    }
)

db.users.findOne(
    {
        courses: ['Python', 'MongoDB', 'SQL', 'JAVA']
    }
)

/* por elemento all */

//all -> and
db.users.find(
    {
        courses: {
            $all: ['MongoDBs']
        }
    }
).pretty()


/*Múltiples condiciones */


db.users.find(
    {
        courses: 'SQL'
    }
)
db.users.find(
    {
        courses: {
            $all: ['SQL', 'MongoDB']
        }
    }
)

db.users.find(
    {
        $and: [
            { courses: 'SQL' },
            { courses: 'MongoDB' }
        ]
    }
)

db.users.find(
    {
        $or: [
            { courses: 'SQL' },
            { courses: 'MongoDB' }
        ]
    }
).pretty()

/* Operadores relacionales */



db.users.updateOne(
    {
        name: 'Carlos'
    },
    {
        $set: {
            scores: [9, 6, 7, 10]
        }
    }
)
db.users.updateOne(
    {
        name: 'Julian'
    },
    {
        $set: {
            scores: [9, 8, 8, 10]
        }
    }
)

db.users.find(
    {
        scores: 10
    },
    {
        _id: false, name: true
    }
).pretty()

db.users.find(
    {
        scores: {
            $lt: 8
        }
    },
    {
        _id: false, name: true
    }
).pretty()


/* AGREGR A LISTA
$pull $push $pull */


db.users.updateOne(
    {
        name: 'Montse'
    },
    {
        $push: {
            courses: 'Go'
        }
    }
)

//each push
db.users.updateOne(
    {
        name: 'Montse'
    },
    {
        $push: {
            courses: {
                $each: ['Django', 'Rails', 'Ionic']
            }
        }
    }
)

/* Insertar por posición */
db.users.updateOne(
    {
        name: 'Omar'
    },
    {
        $push: {
            courses: {
                $each: ['Postgres'],
                $position: 0
            }
        }
    }
)

/* Orderar elementos */
//$sort

db.users.updateOne(
    {
        name: 'Carlos'
    },
    {
        $push: {
            scores: {
                $each: [3, 5],
                $sort: -1
            }
        }
    }
)

/* ELIMINAR */


db.users.updateMany(
    {
        courses:{$exists:true}
    },
    {
        $pull:{
            courses:'Python'
        }
    }
)

db.users.updateMany(
    {
        courses:{$exists:true}
    },
    {
        $pull:{
            courses:{
                $in:['MongoDB','Rails']
            }
        }
    }
)

/* Actualizar por indice */

db.users.updateMany(
    {
        scores:{$exists:true}
    },
    {
        $set:{
            'scores.0': 2
        }
    }
)
db.users.updateMany(
    {
        scores:{$exists:true},
        scores:9
    },
    {
        $set:{
            'scores.$': 1
        }
    }
)

/* Obtener por indice */

//$slice -> posicion o index


db.users.findOne(
    {
        name:'Montse'
    },
    {
        _id:false,
        name:true,
        courses:{
            $slice:[0,3] //int posicion 1,2,-1 , porcion []
        }
    }
)


/* Búsqueda por tamaño */
//$size no con relacionales
db.users.find(
    {
        courses:{
            $size:3
        }
    }
)

//$where

db.users.find(
    {
        $and:[
            {
                courses:{
                    $exists:true
                }
            },
            {

                $where:'this.courses.length > 3'
            }
        ]
    }
).pretty()



/* DOC ANIDADOS */


db.users.updateOne(
    {
        name:'Magos'
    },
    {
        $set:{
            address:{
                state: 'CDMX',
                city:'CDMX',
                postalCode:1,
                number:7910,
                street:'norte 72',
                references:['calle iglesia','papeleria a lado']
            }
        }
    }
)

/* dot notattion */

db.users.find(
    {
        address:{$exists:true}
    }
).pretty()

db.users.find(
    {
        $and:[
            { 'address.postalCode': 1},
            {'address.number':7910}
           
        ]
    
    }
).pretty()

/* Listado de doc */

db.users.updateMany(
    {
        courses:{ $exists: true}
    },
    {
        $unset:{
            courses: true
        }
    }
)

db.users.updateMany(
    {
        name: 'Carlos'
    },
    {
        $set:{
            courses: [
                {
                    title:'Vue',
                    progress:50,
                    completed:false
                },
                {
                    title:'Docker',
                    progress:100,
                    completed:true
                }
            ]
        }
    }
)


/* $elemMatch */

db.users.find(
    {
        courses:{
            $elemMatch:{
                completed: true
            }
        }
    }
).pretty()

db.users.find(
    {
        courses:{
            $elemMatch:{
                progress:{$gte:80}
            }
        }
    }
).pretty()

/* Proyecciones */
db.users.find(
    {
        courses:{$exists:true}
    },
    {
        _id:false,
        name:true,
        'courses.title':true
    }

).pretty()


/* Actualizar */



db.users.updateOne(
    {
        name :'Montse',
        'courses.title':'MongoDB'
    },
    {
        $set:{
            'courses.$.progress': 100,
            'courses.$.completed': true,
            'courses.$.tutor': {
                'name':'codi'
            }
        }
    }
)

db.users.updateOne(
    {
        name :'Carlos'
    },
    {
        $set:{
            'courses.$.progress': 100,
            'courses.0.completed': true
        }
    }
)

/* AGEGACION */
//aggregate([tareas])


db.users.find(
    {
        age:{
            $gt:25
        }
    }
)

//cursor
db.users.aggregate(
    [
        {
            $match:{
                age:{
                    $gt:25
                }
            }
        },
     /*    {
            $match:{
                courses:{
                    $exists:true
                }
            }
        }, */
        {
            $project:{
                _id:false,
                name:true,
                courses:true
            }
        }
    ]
).pretty()

//$ se encuentra en el output de la anterio tarea
//$arrayElemAt
db.users.aggregate(
    [
        {
            $match:{
                courses:{
                    $exists:true
                }
            }
        },
        {
            $project:{
                _id:false,
                name:true,
                courses:true
            }
        },
        {
            $project:{
               
                name:true,
                firstCourses:{
                    $slice:['$courses',2]
                }
            }
        },
        {
            $project:{
               
                name:true,
                course:{
                    $arrayElemAt:['$firstCourses',0]
                }
            }
        },

    ]
).pretty()


/* AGREGAR */

db.users.aggregate(
    [
        {
            $match:{
                courses:{
                    $exists:true
                }
            }
        },
        {
            $project:{
                _id:false,
                name:true,
                courses:true
            }
        },
        {
            $project:{
               
                name:true,
                firstCourses:{
                    $slice:['$courses',2]
                }
            }
        },
        {
            $project:{
               
                name:true,
                course:{
                    $arrayElemAt:['$firstCourses',0]
                }
            }
        },
        {
            $addFields:{
                currentate: new Date()
            }
        }

    ]
).pretty()


/* set */

db.users.aggregate(
    {
        $match:{
            scores:{$exists:true}
        }
    },
    {
        $project:{
            _id:false,
            name:true,
            scores:true
        } 
    },
    {
        $set:{
            sum:{$sum:'$scores'}
        }
    },
    {
        $set:{
            avg:{$avg:'$scores'}
        }
    }
).pretty()

/* concatenar */

db.users.aggregate(
    [

        {
            $match:{
                $and:[
                    {
                        name:{$exists:true}
                    },
                    {
                        lastName:{$exists:true}
                    }
                ]
            }
        },
        {
            $project:{
                _id:false,
                name:true,
                lastName:true
            }
        },
        {
            $project:{
                fullName:{
                    $concat:['$name',' ','$lastName']
                }
            }
        }
    ]
)



/* GroupBy */

db.items.insertMany([
    {type: 'Camera', color: 'Red', price: 120},
    {type: 'Laptop', color: 'White', price: 400},
    {type:'Laptop', color: 'Black', price: 600},
    {type:'Camera', color: 'Silver', price: 200},
    {type:'Microphone', color: 'Black', price: 200},
    {type:'Mouse', color: 'White', price: 50},
    {type:'Monitor', color: 'White', price: 50},
  ])

db.items.find().pretty()

db.items.aggregate(
    [
        {
            $group:{
                _id:'$type',
                total:{$sum:1}
            }
        },
        
    ]
)



db.items.aggregate(
    [
        {
            $group:{
                _id:'$type',
                total:{$sum:1}
            }
        },
        {
            $match:{
                total:{$gt:1}
            }
        }
    ]
)

//limit sort

db.users.aggregate(
    [
        {
            $sort:{
                age:1
            }
        },
        {
            $limit:1
        },
        {
            $project:{
                _id:false,
                name:true,
                age:true
            }
        }
    ]
).pretty()



//map
db.users.aggregate(
    [
        {
            $match:{
                scores:{$exists:true}
            }
        },
        {
            $project:{
                _id:false,
                name:true,
                scores:true
            }
        },
        {
            $project:{
                NewListScores:{
                    $map:{
                        input:'$scores',
                        as:'calificacion',
                        in:{
                            $multiply:['$$calificacion',10]
                        }
                    }
                }
            }
        }

    ]
).pretty()



var usuarios = {
    nombre: 'Raquel',
    apellido: 'Dominguez',
    dad:27,
    correo:'raquel@example.com',
    direccionPostal:{
        calle:'calle',
        ciudad:'ciudad',
        estado:'estado',
        cp:1
    }
}

//lista
var autor = {
    nombre: 'Charles Bukowsky',
    nacionalidad: 'Estadounidense',
    libros: [
        {
            title:'la senda del perdedor',
            fecha:1989
        },
        {
            title:'El resplandor',
            fecha:1977
        },
        {
            title:'Misery',
            fecha:1987
        },
    ]
}

//llaves foraneas
db.autores.insertOne(autor)
//ObjectId("5ed56d9f1dafd25217d592c2")

var libro1 = {
    title:'la senda del perdedor',
    fecha:1989,
    autor_id:ObjectId("5ed56d9f1dafd25217d592c2")
}
var libro2 = {
    title:'El resplandor',
    fecha:1977,
    autor_id:ObjectId("5ed56d9f1dafd25217d592c2")
}
var libro3 = {
    title:'Misery',
    fecha:1987,
    autor_id:ObjectId("5ed56d9f1dafd25217d592c2")
}
db.libros.insertMany([libro1,libro2,libro2])




/* indices */

db.users.createIndex(
    {
        autor_id:1
    }
)

/* unir */

db.autores.aggregate(
    [
        {
            $lookup:{
                from:'libros',
                localField:'_id',
                foreignField:'autor_id',
                as:'listadoLibros'
            }
        }
    ]
)
db.autores.aggregate(
    [
        {
            $lookup:{
                from:'libros',
                localField:'_id',
                foreignField:'autor_id',
                as:'listadoLibros'
            }
        },
        {
            $match:{
                listadoLibros:{
                    $ne:[]
                }
            }
        }
    ]
)

/* Unwind */

db.autores.aggregate(
    [
        {
            $lookup:{
                from:'libros',
                localField:'_id',
                foreignField:'autor_id',
                as:'listadoLibros'
            }
        },
        {
            $unwind:'$listadoLibros'
        },
        {
            $project:{
                _id:false,
                nombre:true,
                libro:'$listadoLibros'
            }
        }
    ]
).pretty()

/* ejecucion */

db.autores.find().explain()
db.autores.find().explain('executionStats')

/* mongodump
mongorestore  */