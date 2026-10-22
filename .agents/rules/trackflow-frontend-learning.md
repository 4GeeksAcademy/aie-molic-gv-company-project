# TrackFlow — Frontend Learning & Maintainability

## Objetivo

Facilitar el desarrollo de interfaces frontend profesionales, accesibles y mantenibles, utilizando código comprensible para una persona junior que está aprendiendo HTML5, Tailwind CSS y JavaScript.

Esta regla se aplica al código de `uis/website/` y, cuando corresponda, a futuras interfaces frontend de TrackFlow. No modifica las convenciones globales, el SDD ni los requisitos técnicos aprobados.

## Principios de desarrollo

1. Priorizar la claridad y la mantenibilidad frente a la sofisticación innecesaria.
2. Utilizar HTML5 semántico y una estructura de documento lógica.
3. Aplicar diseño mobile-first con clases utilitarias de Tailwind.
4. Utilizar JavaScript vanilla con funciones pequeñas y responsabilidades bien definidas.
5. Evitar dependencias, frameworks, abstracciones y patrones avanzados cuando exista una alternativa sencilla que cumpla los requisitos.
6. Mantener la accesibilidad y la calidad del código; simplificar no significa eliminar comportamientos necesarios.
7. Respetar las decisiones de la SPEC y del PLAN aprobados.

## Convenciones HTML

- Utilizar indentación consistente.
- Separar las secciones principales mediante comentarios breves en español.
- Emplear identificadores descriptivos y coherentes.
- Evitar anidamientos innecesarios.
- Utilizar elementos semánticos antes que contenedores genéricos cuando corresponda.
- No duplicar contenido ni lógica de navegación sin necesidad.

## Convenciones Tailwind CSS

- Definir los estilos móviles mediante clases base.
- Introducir `sm:`, `md:` y `lg:` progresivamente según las necesidades responsive.
- Organizar las clases de forma legible, agrupando conceptualmente layout, espaciado, tipografía, colores y estados.
- Preferir utilidades sencillas frente a combinaciones innecesariamente complejas.
- No introducir CSS personalizado si las utilidades aprobadas son suficientes.
- Respetar el sistema visual de `DESIGN.md` y las decisiones de diseño de la especificación correspondiente.

## Convenciones JavaScript

- Utilizar nombres descriptivos para funciones y variables.
- Preferir `const` y utilizar `let` cuando sea necesaria una reasignación.
- Dividir la lógica en funciones pequeñas con una responsabilidad clara.
- Evitar abreviaturas confusas, lógica duplicada y optimizaciones prematuras.
- Utilizar APIs nativas del navegador cuando sean suficientes.
- Mantener separadas las responsabilidades de navegación, formularios y otras funcionalidades.
- Gestionar correctamente errores, estados y accesibilidad.

## Comentarios de código

Escribir comentarios en español cuando aporten contexto útil.

Comentar:
- El propósito de los bloques principales.
- Las decisiones técnicas que no resulten evidentes.
- El motivo de comportamientos relacionados con accesibilidad.
- Las partes de JavaScript cuya lógica requiera explicación.
- Los puntos de mantenimiento que puedan generar confusión.

No comentar instrucciones evidentes ni explicar cada línea.

## Explicación educativa tras cada implementación

Al finalizar cada bloque de tareas autorizado, proporcionar un resumen breve en español que incluya:

1. Qué se ha implementado y qué archivos han cambiado.
2. Cómo funciona el código importante.
3. Qué conceptos de HTML, Tailwind o JavaScript se han utilizado.
4. Dónde modificar textos, imágenes, colores, tamaños o comportamientos.
5. Cómo comprobar que los cambios funcionan.

Cuando se introduzca un concepto no trivial, explicarlo en lenguaje sencillo mediante un ejemplo del propio proyecto.

No añadir estas explicaciones educativas dentro del código si no son necesarias para mantenerlo. Deben presentarse preferentemente en la respuesta al usuario.

## Implementación incremental

- Ejecutar únicamente las tareas SDD autorizadas.
- Respetar dependencias y criterios de aceptación.
- No adelantar bloques posteriores.
- Comprobar los resultados antes de marcar tareas completadas.
- No declarar pruebas exitosas sin ejecutarlas.
- Informar de bloqueos y decisiones pendientes.
- No realizar commits ni pushes sin autorización.

## Prioridad de instrucciones

Esta regla complementa las instrucciones existentes de TrackFlow.

Ante cualquier discrepancia, prevalecen las instrucciones de mayor prioridad, los requisitos obligatorios del ejercicio y la SPEC/PLAN aprobados.

La claridad educativa nunca justifica incumplir requisitos funcionales, de seguridad, accesibilidad o rendimiento.