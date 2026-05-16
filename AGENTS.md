# AGENTS.md

Este repositorio es para investigaciones realizadas por IA sobre infraestructura, especificaciones tecnicas, propuestas, analisis, RFCs, disenos de arquitectura, planes de migracion, evaluaciones operativas y documentacion relacionada.

El trabajo producido aqui debe servir primero para revision humana. Cada investigacion debe poder ser leida por una persona responsable, entendida sin contexto implicito, aprobada, rechazada o modificada, y solo despues usada por una IA para ejecutar cambios reales.

Los documentos deben funcionar como planes puente entre investigacion y ejecucion: suficientemente claros para una decision humana, y suficientemente detallados para que una IA pueda convertirlos despues en tareas concretas o implementarlos con bajo margen de ambiguedad.

## Formato obligatorio

- Los planes, especificaciones e investigaciones deben entregarse en formato HTML.
- Evita entregar planes finales en Markdown, texto plano o notas sueltas.
- Usa HTML semantico y legible: `<!doctype html>`, `html`, `head`, `body`, `main`, `section`, `article`, `h1`-`h3`, `table`, `ul`, `ol`, `pre` y `code` cuando corresponda.
- Incluye estilos solo cuando ayuden a la lectura del documento. Mantenerlos simples, autocontenidos y sin dependencias externas salvo que el plan lo justifique.
- Los comandos, configuraciones, politicas IAM, SQL, YAML, JSON o snippets tecnicos deben ir en bloques `pre > code`.

## Nivel de detalle esperado

Cada documento debe ser profundo y operativo. Cuando aplique, incluir:

- Contexto del problema y objetivo del trabajo.
- Alcance, no alcance y supuestos.
- Estado actual y estado deseado.
- Arquitectura propuesta y decisiones tecnicas.
- Alternativas consideradas y tradeoffs.
- Plan de implementacion paso a paso.
- Dependencias, prerequisitos y responsables sugeridos.
- Riesgos, mitigaciones y plan de rollback.
- Impacto en seguridad, costos, rendimiento, observabilidad y operacion.
- Validaciones, pruebas, criterios de aceptacion y senales de exito.
- Preguntas abiertas, informacion faltante y decisiones pendientes.

## Flujo de revision y ejecucion

- La IA investiga, analiza y documenta la propuesta en este repositorio.
- Un humano revisa el documento para aprobarlo, pedir cambios, corregir supuestos o rechazarlo.
- Ningun documento debe asumir aprobacion automatica para ejecutar cambios en infraestructura.
- El documento debe separar claramente lo que se sabe, lo que se infiere y lo que se recomienda.
- Cuando el humano apruebe la investigacion, la IA debe poder usar el mismo documento como base para ejecutar el plan o generar tareas de implementacion.
- Si hay decisiones pendientes, riesgos no aceptados o informacion faltante, deben quedar visibles antes de cualquier ejecucion.

## Criterios de calidad

- No escribir resumenes superficiales: cada investigacion debe permitir revision humana y, despues de aprobacion, guiar ejecucion real.
- Declarar claramente los supuestos cuando falte informacion.
- Separar hechos verificados, inferencias y recomendaciones.
- Hacer explicitas las rutas de archivos, servicios, entornos, cuentas, permisos, comandos y parametros cuando sean relevantes.
- Preferir tablas para matrices de decision, riesgos, costos, ownership, tareas y comparativas.
- Mantener el documento autocontenido: una persona debe entender que se propone, por que se propone, que riesgos tiene y que decisiones debe aprobar; un agente debe entender como ejecutarlo, validarlo y revertirlo.
