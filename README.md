# financx-frontend
FrontEnd do Projeto Finacx 

Frontend do projeto finacx, desenvolvido em reactjs para ser a interface entre usuario e sistema, esse programa foi feito para estudo não sendo aconselhado a sua utilização em ambiente final. 


Para utilização

Usando NPM, para instalar as dependencias

**npm install**

Usando YARN, para instalar as dependencias

**yarn**

Iniciar aplicação
Usando NPM, para iniciar
**npm start**

Usando YARN, para iniciar
**yarn start**


O Endereço que irar iniciar é  http://localhost:3000




### Docker ### 

Caso queira gerar uma docker desse frontend execute o comandos:

**Gerar build da imagem**
sudo docker image build -t finacx .

**Iniciar o docker**
sudo docker run -p 3000:3000 finacx


Para uma experiencia mais completa, aconselho acessar [Finacx-Docker](https://github.com/geekwx/finacx-docker.git), nele ja possui um docker que irar iniciar o backend, frontend e o banco da aplicação. 
