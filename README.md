# Projeto IgNews


# 🔥 ig.news - Plataforma de Notícias com Assinaturas

ig.news é uma aplicação full-stack de uma plataforma de notícias por assinatura, construída com **Next.js**. O projeto explora conceitos avançados do ecossistema React, incluindo autenticação, integração com serviços de pagamento e estratégias de geração de páginas estáticas para máxima performance.

---

### **🎬 Demonstração**

![redesocial](https://github.com/YanzinhoCaue/PROJETO-IGNEWS/assets/127339610/c55b41c7-f890-4b43-a32f-19d5056b43de)

---

### **🏛️ Arquitetura e Features em Destaque**

A aplicação foi desenvolvida utilizando uma arquitetura Jamstack moderna e escalável:

**🚀 Performance com Geração Estática (SSG & ISR)**
* A página inicial é gerada estaticamente (`getStaticProps`) no momento do build, garantindo que seja servida de forma extremamente rápida e otimizada para SEO.
* A estratégia de **Regeneração Estática Incremental (ISR)** é utilizada para atualizar os dados da página (como o preço da assinatura) a cada 24 horas, sem a necessidade de um novo build completo da aplicação.

**🔐 Autenticação com NextAuth.js**
* A autenticação de usuários é feita de forma segura via **OAuth com o GitHub**, utilizando a biblioteca `NextAuth.js`.
* As sessões dos usuários são gerenciadas tanto no front-end (com o hook `useSession`) quanto no back-end (nas API Routes e `getServerSideProps`).

**💳 Integração de Pagamentos com Stripe**
* O sistema de assinaturas é totalmente integrado com a API da **Stripe**.
* Uma API Route no Next.js gerencia a criação de *customers* e *checkout sessions* na Stripe, redirecionando o usuário para uma página de pagamento segura.

**💾 Banco de Dados Serverless com FaunaDB**
* O **FaunaDB** foi utilizado como banco de dados para persistir informações dos usuários (email, id da inscrição na Stripe, etc.).
* A integração entre NextAuth e FaunaDB garante que os dados do usuário sejam salvos no banco no momento do primeiro login.

**🎨 Estilização com SASS e CSS Modules**
* A estilização é feita com **SASS (SCSS)** e **CSS Modules**, garantindo estilos escopados por componente, evitando conflitos de classes e facilitando a manutenção.

---

### **🛠️ Tecnologias Utilizadas**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=next-auth&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![FaunaDB](https://img.shields.io/badge/FaunaDB-3C1A99?style=for-the-badge&logo=fauna&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

---

### **▶️ Como Executar o Projeto**

**Pré-requisitos:** Node.js, Yarn (ou NPM) e contas nos serviços Stripe, FaunaDB e GitHub (para as chaves de API).

**1️⃣ Clone o repositório**
```bash
git clone [https://github.com/YanzinhoCaue/ignews.git](https://github.com/YanzinhoCaue/ignews.git)
````

**2️⃣ Instale as dependências**

```bash
cd ignews
yarn install
```

**3️⃣ Configure as Variáveis de Ambiente**
Renomeie o arquivo `.env.local.example` para `.env.local` e preencha com suas chaves de API:

```env
# Stripe
STRIPE_API_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_SUCCESS_URL=
STRIPE_CANCEL_URL=
STRIPE_WEBHOOK_SECRET=

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# FaunaDB
FAUNADB_KEY=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

**4️⃣ Execute a aplicação**

```bash
yarn dev
```

A aplicação será iniciada em `http://localhost:3000`.

-----

### **💬 Contato**

**Yan Cauê**

**LinkedIn:** [linkedin.com/in/yancue](https://linkedin.com/in/yancaue)

**GitHub:** [github.com/YanzinhoCaue](https://github.com/YanzinhoCaue)
