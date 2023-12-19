export default {
    "npcDialogs": [
        {
            "dialog": "Hola, soy Toni. ¿Cómo estás?",
            "options": [
                {
                    "text": "Estoy bien, gracias.",
                    "nextDialog": "Me alegro de oír eso."
                },
                {
                    "text": "No muy bien, ¿tienes alguna misión para mí?",
                    "nextDialog": "Claro, necesito ayuda con..."
                }
            ]
        },
    ],
    "mujerDialogs": [
        {
          /*0*/   "dialog": "¡Oh! Disculpa, sé que no debería haber aparcado aquí, pero estoy realmente apurada.",
            "options": [
                {
                    "text": "Es comprensible estar apurado, pero este espacio es vital\npara las personas con discapacidad.",
                    "nextDialogIndex": 1
                },
                {
                    "text": "La prisa no justifica ocupar un lugar reservado\npara quienes realmente lo necesitan.",
                    "nextDialogIndex": 2
                }
            ]
        },
        {
         /*1*/    "dialog": "Lo siento, no me di cuenta de la importancia de este espacio.\nMoveré mi coche de inmediato.",
            "options": [
                {
                    "text": "Gracias por entender. Cada espacio de este tipo tiene\nun propósito crucial.",
                    "nextDialogIndex": 3
                },
                {
                    "text": "Es bueno que lo veas así. Estos espacios están diseñados\npara facilitar la vida de quienes más lo necesitan.",
                    "nextDialogIndex": 3
                }
            ]
        },
        {
         /*2*/    "dialog": "¡Pero si sólo fue por un momento! ¿Es realmente para tanto?",
            "options": [
                {
                    "text": "Un 'solo momento' puede ser el tiempo que alguien necesita\npara acceder a su vehículo en un espacio adecuado.",
                    "nextDialogIndex": 4
                },
                {
                    "text": "A veces un pequeño acto puede tener un gran impacto\nen la vida de otra persona.",
                    "nextDialogIndex": 5
                }
            ]
        },
        {
         /*3*/    "dialog": "Supongo que nunca lo había visto así. A veces actuamos\nsin pensar en las consecuencias.",
            "options": [
                {
                    "text": "Todos podemos aprender y mejorar. Lo importante es\nser consciente y actuar con consideración.",
                    "nextDialogIndex": 7
                },
                {
                    "text": "Exacto, y es por eso que tomar un momento para reflexionar\npuede hacer una gran diferencia.",
                    "nextDialogIndex": 6
                }
            ]
        },
        {
         /*4*/    "dialog": "Tienes razón, debo ser más considerada. No volverá a suceder.",
            "options": [
                {
                    "text": "Me alegra oír eso. Gracias por tomar conciencia\nde tu acción.",
                    "nextDialogIndex": 7
                },
                {
                    "text": "Eso espero. Un pequeño cambio en nuestras acciones\npuede mejorar la vida de los demás.",
                    "nextDialogIndex": 7
                }
            ]
        },
        {
         /*5*/      "dialog": "Gracias por hacérmelo ver. A veces necesitamos que alguien\nnos señale estas cosas.",
            "options": [
                {
                    "text": "Con gusto. A veces todos necesitamos un recordatorio\npara ser más empáticos.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Si todos tomamos un poco de tiempo para entender a los demás,\npodemos hacer del mundo un lugar mejor.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
        /*6*/     "dialog": "Prometo ser más consciente en el futuro.\nGracias por tu paciencia y comprensión.",
            "options": [
                {
                    "text": "No hay de qué. Disfruta tu día y recuerda lo que hemos hablado.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
        /*7*/     "dialog": "¡Esto es ridículo! ¡Solo estaba por un momento!",
            "options": [
                {
                    "text": "Entiendo tu frustración, pero las reglas \nestán por una razón importante.",
                    "nextDialogIndex": 8
                },
                {
                    "text": "Un momento o una hora, las reglas son iguales para todos.",
                    "nextDialogIndex": 9
                }
            ]
        },
        {
        /*8*/     "dialog": "¡No necesito lecciones de moralidad de un extraño! ¡Déjame en paz!",
            "options": [
                {
                    "text": "Lamento que te sientas así, pero es\nimportante ser considerado con los demás.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Es una cuestión de respeto, no solo de reglas.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
        /*9*/     "dialog": "¡Eres un metiche! ¡No tienes derecho a decirme qué hacer!",
            "options": [
                {
                    "text": "Todos somos parte de esta comunidad y debemos ayudarnos a mejorar.",
                    "nextDialogIndex": 10
                },
                {
                    "text": "Entiendo que estés molesta, pero mi intención es \nsimplemente recordarte la importancia del respeto mutuo.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
        /*10*/     "dialog": "¡Basta ya! ¡Tú no eres nadie para juzgarme!",
            "options": [
                {
                    "text": "No estoy juzgando, solo intento hacer ver la importancia de pensar en los demás.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Mi intención no es juzgar, sino fomentar la conciencia sobre las necesidades de otros.",
                    "nextDialogIndex": -1
                }
            ]
        }
    ],  "entrenadorDialogs": [
        {
            "dialog": "Willy, otra vez tarde. Si sigues así, no podré incluirte en el equipo paralímpico.",
            "options": [
                {
                    "text": "Lo siento, entrenador. Me aseguraré de mejorar mi puntualidad.",
                    "nextDialogIndex": 1
                },
                {
                    "text": "Entiendo, pero he tenido algunos contratiempos. Trabajaré en esto.",
                    "nextDialogIndex": 1
                }
            ]
        },
        {
            "dialog": "Willy,  necesitas más proteínas para recuperarte después de los entrenamientos.",
            "options": [
                {
                    "text": "Entiendo, ¿alguna recomendación?",
                    "nextDialogIndex": 2
                },
                {
                    "text": "¿Debería comprar algo específico?",
                    "nextDialogIndex": 2
                }
            ]
        },
        {
            "dialog": "Te recomiendo batidos de proteínas.",
            "options": [
                {
                    "text": "¡Gracias! ¿Dónde puedo comprarlos?",
                    "nextDialogIndex": 3
                },
                {
                    "text": "¿Algún batido en particular?",
                    "nextDialogIndex": 4
                }
            ]
        },
        {
            "dialog": "Puedes encontrarlos en el supermercado local.",
            "options": [
                {
                    "text": "De acuerdo, iré al supermercado.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
            "dialog": "Los batidos de proteínas de suero son una buena opción.",
            "options": [
                {
                    "text": "Gracias por el consejo, entrenador.",
                    "nextDialogIndex": -1
                }
            ]
        },
    ], 
    "pacoDialogs": [
        {
            "dialog": "¡Willy, cuánto tiempo! ¿Cómo te ha ido con el entrenamiento?",
            "options": [
                {
                    "text": "Ha sido duro, pero estoy progresando. ¿Algún consejo?",
                    "nextDialogIndex": 1
                },
                {
                    "text": "Bien, pero a veces me siento un poco desanimado. ¿Tú cómo lo manejas?",
                    "nextDialogIndex": 2
                }
            ]
        },
        {
            "dialog": "La clave está en la consistencia, Willy. No te desanimes por los días malos.",
            "options": [
                {
                    "text": "Gracias, Paco. Intentaré recordar eso.",
                    "nextDialogIndex": 3
                },
                {
                    "text": "A veces es difícil mantener la motivación.",
                    "nextDialogIndex": 4
                }
            ]
        },
        {
            "dialog": "Todos tenemos días difíciles, Willy.",
            "options": [
                {
                    "text": "Eso tiene sentido. Mantendré mis metas en mente.",
                    "nextDialogIndex": 5
                },
                {
                    "text": "¿Y si siento que mis metas son demasiado lejanas?",
                    "nextDialogIndex": 6
                }
            ]
        },
        {
            "dialog": "Recuerda que cada pequeño paso cuenta.",
            "options": [
                {
                    "text": "Eso es cierto. Apreciaré más los pequeños logros.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Necesito aprender a ser más paciente conmigo mismo.",
                    "nextDialogIndex": 7
                }
            ]
        },
        {
            "dialog": "¿Has probado algún deporte diferente o actividad para refrescar tu rutina?",
            "options": [
                {
                    "text": "No realmente, ¿alguna sugerencia?",
                    "nextDialogIndex": 8
                },
                {
                    "text": "He estado pensando en probar algo nuevo.",
                    "nextDialogIndex": 9
                }
            ]
        },
        {
            "dialog": "Probar nuevos deportes puede ser revitalizante. ¿Qué tal el remo o el ciclismo?",
            "options": [
                {
                    "text": "El remo suena interesante, ¿cómo podría empezar?",
                    "nextDialogIndex": 10
                },
                {
                    "text": "Me inclino más por el ciclismo, parece divertido.",
                    "nextDialogIndex": 11
                }
            ]
        },
        {
            "dialog": "El remo es excelente para la fuerza y el equilibrio.",
            "options": [
                {
                    "text": "Eso sería genial, gracias Paco.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
            "dialog": "El ciclismo es una excelente manera de mejorar la resistencia.",
            "options": [
                {
                    "text": "Me encantaría unirme a un grupo. ¿Puedes darme más información?",
                    "nextDialogIndex": -1
                }
            ]
        }
    ],   
    "atletaDialogs": [
        {   
            "dialog": "¿En serio te consideras un atleta? Pareces más un lastre para el equipo.",
            "options": [
                {
                    "text": "Todos tenemos diferentes desafíos, pero mi esfuerzo vale tanto como el de cualquier otro. ",
                    "nextDialogIndex": -1 // o el índice que corresponda
                },
                {
                    "text": "No dejo que los comentarios negativos me afecten. Estoy aquí para superarme a mí mismo. ",
                    "nextDialogIndex": -1 // o el índice que corresponda
                }
            ]
        }
    ],
    "clientDialogs": [
        {
            "dialog": "Un momento, ahora lo retiro.",
        }
    ],
    "clientTouchedBefore": [
        {
            "dialog": "¡No entiendes el significado de la palabra 'espera'!",
        }
    ],
    "shopWorkerDialogs": [
        {
          /*0*/  "dialog": "¡Hola!\n¿Necesitas ayuda para encontrar algo? ",
            "options": [
                {
                    "text": "Sí, estoy buscando\n un artículo en una estantería alta\ny me resulta difícil alcanzarlo.  ",
                    "nextDialogIndex": 1,
                },
                {
                    "text": "No, gracias. Puedo hacerlo solo.  ",
                    "nextDialogIndex": 2
                }
            ]
        },
        {
           /*1*/  "dialog": "Por supuesto, déjame ayudarte a alcanzarlo.",
            "options": [
                {
                    "text": "Gracias, realmente aprecio tu ayuda.  ",
                    "nextDialogIndex": 3,
                },
                {
                    "text": "No, puedo hacerlo solo. ¿No puedes ver?  ",
                    "nextDialogIndex": 4,
                }
            ]
        },
        {
           /*2*/  "dialog": "Entendido, si cambias de opinión, aquí estaré.",
            "options": [
                {
                    "text": "Lo tendré en cuenta. Gracias.  ",
                    "nextDialogIndex": -1,
                },
                {
                    "text": "No necesito tu ayuda de todos modos.\n No soy un inútil  ",
                    "nextDialogIndex": 4,
                }
            ]
        },
        {
           /*3*/  "dialog": "Estupendo, aquí tienes. ¿Hay algo más en lo que pueda ayudarte?",
            "options": [
                {
                    "text": "No, eso es todo. Gracias por tu ayuda.  ",
                    "nextDialogIndex": -1
                },
                {
                    "text": "No volveré a pedir ayuda.\n¡Espero que entiendas!  ",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
           /*4*/  "dialog": "Bueno! Va a hablar usted así a quien yo le diga..",
            "undesirableOption": true,
            "nextDialogIndex": -1

        }
    ],
    "angryWorker":[
        {
            /*0*/  "dialog": "No tengo nada que hablar contigo, maleducado "
        }
    ],
    "angryClient":[
        {
            /*0*/  "dialog": "Si claro, ahora quieres ayuda, ¡lárgate! "
        }
    ],
    "happy":[
        {
            /*0*/  "dialog": "Si claro, yo te lo alcanzo."
        }
    ],

    "mujerCaraDialogs": [
        {
            "dialog": "Me siento tan apresurada todo el tiempo. A veces ni siquiera me doy cuenta de las personas a mi alrededor.",
            "options": [
                {
                    "text": "Tomarte un momento para observar puede marcar una gran diferencia en la vida de otros.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "La vida puede ser agitada, pero es importante estar conscientes de nuestro entorno.",
                    "nextDialogIndex": -1
                }
            ]
        }
    ],
    "atletaCaraDialogs": [
        {
            "dialog": "He estado compitiendo durante años, pero aún siento nervios antes de cada carrera.",
            "options": [
                {
                    "text": "Es normal sentir nervios. Significa que te importa y estás listo para dar lo mejor de ti.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Usa esos nervios a tu favor. Te mantienen alerta y enfocado.",
                    "nextDialogIndex": -1
                }
            ]
        }
    ],
    "viejoCaraDialogs": [
        {
            "dialog": "La vida pasa rápido, joven. Asegúrate de disfrutar cada momento.",
            "options": [
                {
                    "text": "Gracias por el consejo. Trato de apreciar cada pequeña cosa.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Tienes razón. Es importante no perder de vista lo que realmente importa.",
                    "nextDialogIndex": -1
                }
            ]
        }
    ],
    "trabajadorCaraDialogs": [
        {
            "dialog": "Trabajar aquí me ha enseñado mucho sobre las diferentes necesidades de las personas.",
            "options": [
                {
                    "text": "Es genial escuchar eso. Aprender de los demás siempre es valioso.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "Sí, todos somos diferentes y eso es lo que hace que la comunidad sea especial.",
                    "nextDialogIndex": -1
                }
            ]
        }
    ]
}

