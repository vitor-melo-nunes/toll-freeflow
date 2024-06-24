# Use a imagem base do Node.js
FROM node:14

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json
COPY package.json ./

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
