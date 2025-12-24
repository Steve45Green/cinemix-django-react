# --- Estágio de Desenvolvimento ---
FROM node:20-alpine AS dev

WORKDIR /app

# CORREÇÃO: Receber a chave do Turnstile como um argumento de build no estágio de desenvolvimento
ARG VITE_TURNSTILE_SITE_KEY
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

# Copia os ficheiros de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# O comando para iniciar é definido no docker-compose.yml

# --- Estágio de Build (Produção) ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# A chave também é necessária para o build de produção
ARG VITE_TURNSTILE_SITE_KEY
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

RUN npm run build


# --- Estágio Final (Produção) ---
FROM nginx:stable-alpine AS prod

# Copia os ficheiros estáticos construídos do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
