# Etapa de construcción
FROM node:22.13.1 AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular
RUN ng build --configuration development

# Etapa de producción
FROM nginx:alpine

# Copiar archivos construidos desde el builder
COPY --from=builder /app/dist/sintad-blog-frontend /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]