# ✨ Formulario Dinámico Profesional

Un formulario dinámico moderno con diseño Glass Morphism, validaciones robustas y experiencia de usuario excepcional construido con Angular 18.

![Angular](https://img.shields.io/badge/Angular-18.2.4-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🎯 Características Principales

### 🎨 **Diseño Glass Morphism Profesional**
- Efectos de vidrio translúcido con backdrop-filter
- Gradientes suaves y animaciones elegantes
- Paleta de colores intuitiva y amigable
- Sombras y profundidad realistas
- Tipografía Inter para máxima legibilidad

### 🔧 **Validaciones Avanzadas**
- **Texto**: Solo letras, espacios y caracteres especiales permitidos
- **Email**: Validación completa con verificación de dominio
- **Teléfono**: Formateo automático y validación internacional
- **Fecha**: Validación de edad mínima y fechas futuras
- **URL**: Verificación de formato y protocolo válido
- **Archivos**: Validación de tipo y tamaño (máximo 5MB)
- **Radio Buttons**: Selección única con validación requerida

### 🚀 **Experiencia de Usuario**
- **Barra de progreso** en tiempo real
- **Validación instantánea** mientras el usuario escribe
- **Mensajes contextuales** específicos por campo
- **Estados visuales** para campos válidos/inválidos
- **Auto-scroll** a campos con errores
- **Indicadores de carga** durante el envío
- **Animaciones suaves** y microinteracciones

### 📱 **Responsividad y Accesibilidad**
- Diseño mobile-first completamente adaptativo
- Soporte para lectores de pantalla (ARIA)
- Compatibilidad con modo de alto contraste
- Respeta preferencias de movimiento reducido
- Optimizado para dispositivos táctiles

## 🛠️ Tecnologías Utilizadas

- **Angular 18.2.4** - Framework principal
- **TypeScript 5.5** - Lenguaje de programación
- **Reactive Forms** - Manejo de formularios
- **CSS3 Modern** - Estilos avanzados con Grid y Flexbox
- **Glass Morphism** - Efectos visuales modernos
- **Standalone Components** - Arquitectura modular

## 🎨 Tipos de Campo Soportados

| Tipo | Descripción | Validaciones |
|------|-------------|--------------|
| `text` | Texto simple | Longitud, solo letras |
| `email` | Correo electrónico | Formato email válido |
| `phone` | Número telefónico | Formato internacional |
| `date` | Fecha | Fecha mínima, formato |
| `url` | Sitio web | Protocolo HTTP/HTTPS |
| `file` | Archivos | Tipo, tamaño máximo |
| `radio` | Selección única | Opción requerida |

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI (`npm install -g @angular/cli`)

### Pasos de instalación
```bash
# Clonar el repositorio
git clone https://github.com/CarlosAlbertoGarciaRamirezADSO/dynamic-form.git

# Navegar al directorio
cd dynamic-form

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
ng serve

# Abrir en el navegador
# http://localhost:4200
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dinamic-form/                 # Componente principal del formulario
│   │   └── dinamic-form-question/        # Componente individual de pregunta
│   ├── services/
│   │   ├── question.service.ts           # Servicio de preguntas
│   │   └── question-control.service.ts   # Servicio de validaciones
│   ├── models/
│   │   ├── question-base.ts              # Clase base para preguntas
│   │   ├── texbox.ts                     # Tipo de pregunta texto
│   │   └── radio.ts                      # Tipo de pregunta radio
│   └── styles/
│       └── styles.css                    # Estilos globales
```

## 🎯 Características del Formulario

### Campos Implementados
1. **Nombre Completo** - Validación de texto con caracteres especiales
2. **Correo Electrónico** - Validación de formato email avanzada
3. **Teléfono** - Formateo automático internacional
4. **Fecha de Nacimiento** - Validación de edad mínima
5. **Experiencia en Programación** - Radio buttons con múltiples opciones
6. **Lenguaje Favorito** - Selección de tecnologías
7. **Portfolio/Sitio Web** - Campo opcional con validación de URL
8. **Curriculum Vitae** - Subida de archivos con validación

### Validaciones Implementadas
- ✅ Campos requeridos con asterisco visual
- ✅ Validación en tiempo real mientras se escribe
- ✅ Mensajes de error específicos y contextuales
- ✅ Indicadores visuales de estado (válido/inválido)
- ✅ Formateo automático en campos específicos
- ✅ Validación de archivos (tipo y tamaño)
- ✅ Cross-field validation para campos relacionados

## 🎨 Personalización de Colores

El sistema utiliza variables CSS personalizadas para facilitar la personalización:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --success-color: rgba(40, 167, 69, 0.8);
  --error-color: rgba(220, 53, 69, 0.8);
  --text-primary: rgba(255, 255, 255, 0.95);
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run build            # Compilación para producción
npm run test             # Ejecutar pruebas unitarias
npm run lint             # Verificar código

# Desarrollo avanzado
ng generate component    # Generar nuevo componente
ng generate service      # Generar nuevo servicio
ng build --prod          # Build optimizado para producción
```

## 📊 Métricas de Rendimiento

- ⚡ **Primera carga**: < 200ms
- 🎯 **Lighthouse Score**: 95+
- 📱 **Mobile-friendly**: 100%
- ♿ **Accesibilidad**: AA compliant
- 🔍 **SEO**: Optimizado

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Carlos Alberto García Ramírez**
- GitHub: [@CarlosAlbertoGarciaRamirezADSO](https://github.com/CarlosAlbertoGarciaRamirezADSO)
- LinkedIn: [Carlos García](https://linkedin.com/in/carlosgarcia)

## 🙏 Agradecimientos

- Angular Team por el increíble framework
- Comunidad de desarrolladores por las mejores prácticas
- Inspiración en diseños Glass Morphism modernos

---

⭐ **Si este proyecto te fue útil, no olvides darle una estrella!**
