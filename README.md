This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sobre o Projeto

O projeto consiste em um sistema simples para ver informações do clima de uma cidade. Esta aplicação utiliza a API gratuita da [Open Weather Map](https://openweathermap.org/) e utiliza a geolocalização do usuário ou o nome da cidade enviado na barra de pesquisa para procurar os dados sobre o clima. O projeto utiliza [Tailwind CSS](https://tailwindcss.com/) para a estilização, além disso também é utilizada a API gratuita da [Country Flags API](https://flagsapi.com/) para pegar a bandeira do país no qual a cidade pesquisada está localizada.

Dentre outros elementos visuais podemos destacar os icones de umidade e vento que são arquivos SVG diretamente inseridos no código da plataforma [Lucide](https://lucide.dev/) que possui um pacote de diversos ícones que podem ser utilizados em diversos projetos, além disso no fundo do sistema são exibidos vídeos que indicam como o clima está, (Chuva, Nublado, Limpo, Tempestade e Neve) que foram retirados da plataforma [Pexels](https://www.pexels.com/pt-br/) que fornece vídeos e imagens para uso gratuito. 

O sistema consiste em somente uma página que mostra as informções do clima na cidade do usuário (ou na cidade pesquisada), que no caso são, temperatura, umidade e velocidade do vento, além de mostrar a previsão do clima nas próximas 30 horas.

![Imagem do sistema](https://i.imgur.com/OLuQUPM.png)


## Como Rodar

Primeiro, instale os pacotes necessários para o funcionamento do sistema:

```bash
npm install
```

Depois mude o nome do arquivo .env.local.example para .env.local

Por último inicie o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu browser para ver o resultado.



This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

