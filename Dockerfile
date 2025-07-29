# Stage 1: Build with Node 24
FROM node:24-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Copy source files
COPY . .

# Build the Vite app
RUN npm run build


# Stage 2: Production server with nginx
FROM nginx:alpine

# Copy build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Inject runtime environment variables into env.js
RUN echo '#!/bin/sh\n\
echo "window.env = {" > /usr/share/nginx/html/env.js\n\
for var in $(env | cut -d= -f1); do\n\
  val=$(printenv $var)\n\
  echo "  \\"$var\\": \\"$val\\"," >> /usr/share/nginx/html/env.js\n\
done\n\
echo "}" >> /usr/share/nginx/html/env.js\n' > /docker-entrypoint.d/99-gen-env.sh && \
chmod +x /docker-entrypoint.d/99-gen-env.sh

# Custom nginx configuration
RUN rm /etc/nginx/conf.d/default.conf && \
echo 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
  location /env.js {\n\
    add_header Cache-Control "no-cache, no-store, must-revalidate";\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
