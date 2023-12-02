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
            "dialog": "Hola, soy una mujer interesante. ¿Cómo estás?",
            "options": [
                {
                    "text": "Estoy bien, ¿y tú?",
                    "nextDialogIndex": 1
                },
                {
                    "text": "Podría estar mejor.",
                    "nextDialogIndex": 2
                }
            ]
        },
        {
            "dialog": "Me alegro de que estés bien. ¿Qué te trae por aquí?",
            "options": [
                {
                    "text": "Solo estoy de paso, admirando el lugar.",
                    "nextDialogIndex": 3
                },
                {
                    "text": "Estoy buscando algo de aventura. ¿Alguna sugerencia?",
                    "nextDialogIndex": 3
                }
            ]
        },
        {
            "dialog": "Vaya, espero que mejore tu día. ¿Quieres hablar de ello?",
            "options": [
                {
                    "text": "Sí, me gustaría desahogarme un poco.",
                    "nextDialogIndex": 3
                },
                {
                    "text": "No realmente, prefiero mantenerlo para mí.",
                    "nextDialogIndex": 3
                }
            ]
        },
        {
            "dialog": "Bueno, ha sido un placer hablar contigo. ¡Adiós!",
            "options": [
                {
                    "text": "Adiós",
                    "nextDialogIndex": -1 
                }
            ]
            
        },
    ]
}   

