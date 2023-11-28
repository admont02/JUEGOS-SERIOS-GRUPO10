export default { 
    "npcDialogs": [
        {
            "dialog": "Hola, soy Toni. ¿Cómo estás?",
            "dialogMujer": "Soy mujer",
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
        {
            "dialog": "Otro diálogo de otro NPC.",
            "options": [
                {
                    "text": "Opción 1",
                    "nextDialog": "Respuesta a la opción 1."
                },
                {
                    "text": "Opción 2",
                    "nextDialog": "Respuesta a la opción 2."
                }
            ]
        },
    ],
    "mujerDialogs": [
        {
            "dialog": "Hola, soy una mujer interesante. ¿Cómo estás?",
            // Continue with other properties if needed
        },
        {
            "dialog": "Aquí va la segunda línea del diálogo.",
        },
        {
            "dialog": "Esta es la tercera línea de nuestra conversación.",
        },
        {
            "dialog": "Y finalmente, esta es la cuarta línea de diálogo.",
        }
    ]
}

