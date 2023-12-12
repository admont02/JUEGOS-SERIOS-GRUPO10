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
                    "text": "Entiendo tu frustración, pero las reglas están por una razón importante.",
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
                    "text": "Lamento que te sientas así, pero es importante ser considerado con los demás.",
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
                    "text": "Entiendo que estés molesta, pero mi intención es simplemente recordarte la importancia del respeto mutuo.",
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
    ],"entrenadorDialogs": [
        {
            "dialog": "Willy, otra vez tarde. Si sigues así, no podré incluirte en la selección para el equipo paralímpico. Necesitamos compromiso.",
            "options": [
                {
                    "text": "Lo siento, entrenador. Me aseguraré de mejorar mi puntualidad.",
                    "nextDialogIndex": -1 // o el índice que corresponda
                },
                {
                    "text": "Entiendo, pero he tenido algunos contratiempos. Trabajaré en esto.",
                    "nextDialogIndex": -1 // o el índice que corresponda
                }
            ]
        }
    ],
    "pacoDialogs": [
        {
            "dialog": "¡Willy, cuánto tiempo! ¿Cómo te ha ido con el entrenamiento?",
            "options": [
                {
                    "text": "Ha sido duro, pero estoy progresando. ¿Algún consejo?",
                    "nextDialogIndex": -1 // o el índice que corresponda
                },
                {
                    "text": "Bien, pero a veces me siento un poco desanimado. ¿Tú cómo lo manejas?",
                    "nextDialogIndex": -1 // o el índice que corresponda
                }
            ]
        }
    ],
    "atletaDialogs": [
        {
            "dialog": "¿En serio te consideras un atleta? Pareces más un lastre para el equipo.",
            "options": [
                {
                    "text": "Todos tenemos diferentes desafíos, pero mi esfuerzo vale tanto como el de cualquier otro.",
                    "nextDialogIndex": -1 // o el índice que corresponda
                },
                {
                    "text": "No dejo que los comentarios negativos me afecten. Estoy aquí para superarme a mí mismo.",
                    "nextDialogIndex": -1 // o el índice que corresponda
                }
            ]
        }
    ],
    "shopWorkerDialogs": [
        {
            "dialog": "¡Hola! ¿Necesitas ayuda para encontrar algo?",
            "options": [
                {
                    "text": "Sí, estoy buscando un artículo en una estantería alta\ny me resulta difícil alcanzarlo.",
                    "nextDialogIndex": 1
                },
                {
                    "text": "No, gracias. Puedo hacerlo solo.",
                    "nextDialogIndex": 2
                }
            ]
        },
        {
            "dialog": "Por supuesto, déjame ayudarte a alcanzarlo.",
            "options": [
                {
                    "text": "Gracias, realmente aprecio tu ayuda.",
                    "nextDialogIndex": 3
                },
                {
                    "text": "No, puedo hacerlo solo. ¿No puedes ver?",
                    "nextDialogIndex": 4
                }
            ]
        },
        {
            "dialog": "Entendido, si cambias de opinión, aquí estaré.",
            "options": [
                {
                    "text": "Lo tendré en cuenta. Gracias.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "No necesito tu ayuda de todos modos.",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
            "dialog": "Estupendo, aquí tienes. ¿Hay algo más en lo que pueda ayudarte?",
            "options": [
                {
                    "text": "No, eso es todo. Gracias por tu ayuda.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "No volveré a pedir ayuda. ¡Espero que entiendas!",
                    "nextDialogIndex": -1
                }
            ]
        },
        {
            "dialog": "Está bien, si cambias de opinión, estaré aquí.",
            "options": [
                {
                    "text": "Lo tendré en cuenta. Gracias.",
                    "nextDialogIndex": -1
                },
                {
                    "text": "No volveré a pedir ayuda. ¡Espero que entiendas!",
                    "nextDialogIndex": -1
                }
            ]
        }
    ]
}
    
      

