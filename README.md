# EquipTrace 🟣

![Status](https://img.shields.io/badge/Status-Frontend_Demo-purple)
![Tech](https://img.shields.io/badge/Stack-React_|_Tailwind_|_Vite-white)
![Version](https://img.shields.io/badge/Version-1.0.0-blueviolet)

> **Rastreamento Inteligente de Equipamentos e Gestão de Ativos IoT.**

O **EquipTrace** é uma plataforma moderna projetada para resolver o problema de perda e falta de controle de ativos em empresas de logística e serviços. O sistema permite vincular hardware de rastreamento (IoT) a ativos operacionais e atribuir responsabilidade a colaboradores específicos.

---

## 🎯 O Problema que Solucionamos

Empresas perdem milhões anualmente devido a:
1.  **Extravio de Ferramentas:** Itens pequenos de alto valor (ex: rompedores, medidores) que somem em obras.
2.  **Uso Indevido:** Veículos ou máquinas utilizados fora do horário ou perímetro permitido.
3.  **Falta de Responsabilidade:** Dificuldade em saber com *quem* estava o equipamento no momento do incidente.

O **EquipTrace** centraliza essas informações, transformando dados brutos de GPS/LoRaWAN em gestão visual.

---

## 📘 Manual de Operação Passo a Passo

Siga este guia para configurar o sistema do zero. A ordem lógica é: **Cargos > Usuários > Hardware > Ativos**.

### 1. Como Cadastrar um Novo Funcionário (Efetivo)
Antes de tudo, você precisa cadastrar quem vai usar os equipamentos.

1.  No menu lateral, vá em **Configuração > Cargos**.
    * Cadastre as funções da sua empresa (ex: "Técnico Nível 1", "Supervisor de Obra").
2.  Agora vá em **Técnico > Efetivo**.
3.  No formulário "Novo Colaborador":
    * **Nome Completo:** Digite o nome do funcionário.
    * **E-mail:** Digite o e-mail corporativo.
    * **Função:** Selecione o cargo que você criou no passo 1.
4.  Clique em **Cadastrar**.
    * *Resultado:* O funcionário aparecerá na lista ao lado e estará disponível para receber equipamentos.

### 2. Como Cadastrar um Rastreador Físico (Hardware)
Aqui você cadastra o dispositivo GPS que chegou da fábrica (Estoque).

1.  No menu lateral, vá em **Técnico > Estoque (Hardware)**.
2.  No formulário "Adicionar Hardware":
    * **Modelo:** Escolha o modelo do equipamento (ex: SenseCAP T1000).
    * **Serial Number:** Digite o S/N que está na etiqueta do aparelho (ex: `SN-12345678`).
    * **Chave API:** Digite a chave de integração (se houver).
3.  Clique em **Cadastrar**.
    * *Resultado:* O rastreador entra no sistema com status "Disponível em Estoque".

### 3. Como Criar e Vincular um Ativo (O Rastreamento Real)
Agora vamos juntar tudo: O Objeto Real + O Rastreador + O Responsável.

1.  No menu lateral, vá em **Operação > Ativos Monitorados**.
2.  No formulário "Novo Ativo":
    * **Nome do Ativo:** Como você chama esse item? (ex: "Furadeira Bosch 05" ou "Fiat Fiorino Placa ABC").
    * **Tipo:** Selecione a categoria (Veículo, Ferramenta, etc).
    * **Hardware Vinculado:** A lista mostrará apenas os rastreadores *livres* no estoque. Selecione o S/N que você cadastrou no passo 2.
    * **Responsável:** Selecione o funcionário que ficará com o item (cadastrado no passo 1).
3.  Clique em **Criar Ativo**.
4.  Vá para o **Dashboard (Visão Geral)**.
    * *Resultado:* O ativo aparecerá no painel. Clique em "Localizar no Mapa" para ver a posição em tempo real.

---

## 🚀 Funcionalidades Atuais (Frontend)

O projeto atual é um **MVP (Minimum Viable Product) Front-end** totalmente funcional em termos de interface e lógica de negócio local (simulada via Context API/LocalStorage).

* **📊 Dashboard Geral:** Visão macro da frota, status de bateria e alertas.
* **🗺️ Monitoramento em Tempo Real:** Mapa interativo (Leaflet) com simulação de telemetria (velocidade, ignição, rastro) em Volta Redonda/RJ.
* **📦 Gestão de Ativos:** Cadastro do objeto real (Ex: "Caminhão 01") e vínculo com hardware.
* **cpu Inventário de Hardware:** Controle de estoque de rastreadores (Serial Number, Chaves API, Modelos: SenseCAP, Macaron, Dragino).
* **busts_in_silhouette Gestão de Efetivo:** Cadastro de colaboradores (Técnicos, Motoristas) e Cargos.
* **📱 Responsividade:** Interface Mobile-First com menu gaveta e adaptação total a celulares e tablets.
* **🎨 UI/UX:** Design System "Dark Mode" elegante com paleta Roxo/Branco.

---

## 🛠️ Tecnologias Utilizadas

* **Core:** React.js + Vite
* **Estilização:** Tailwind CSS
* **Mapas:** React Leaflet + OpenStreetMap (CartoDB Dark Matter tiles)
* **Ícones:** Lucide React
* **Rotas:** React Router DOM
* **Estado:** Context API + LocalStorage (Persistência no navegador)

---

## 🏁 Como Executar o Projeto

### Pré-requisitos
* Node.js (v16 ou superior)
* NPM ou Yarn

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/equiptrace.git](https://github.com/SEU_USUARIO/equiptrace.git)
    cd equiptrace
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse:** Abra seu navegador em `http://localhost:5173`

5.  **Login de Acesso (Demo):**
    * **E-mail:** `admin@equiptrace.com`
    * **Senha:** `123456`

---

## ⚠️ Necessidade de Desenvolvimento Back-end (Próximos Passos)

Atualmente, este projeto é uma aplicação **Client-Side**. Para se tornar um produto comercial viável, é **obrigatório** o desenvolvimento de uma infraestrutura de Back-end.

### O que precisa ser desenvolvido:

1.  **API RESTful/GraphQL:** (Node.js/NestJS ou Python/Django) para gerenciar autenticação real (JWT), regras de negócio e CRUDs.
2.  **Banco de Dados:** (PostgreSQL ou MongoDB) para persistir dados de forma segura e histórica (hoje os dados somem se limpar o cache do navegador).
3.  **Broker MQTT / Webhooks:** Para receber os dados reais dos sensores (SenseCAP/ChirpStack/Everynet) e injetar no banco de dados.
4.  **Websockets:** Para atualizar a posição no mapa em tempo real sem precisar recarregar a página (substituindo o `setInterval` simulado atual).

---

## 💰 Estimativa de Custas Operacionais (OPEX)

Para colocar o EquipTrace em produção real, considere os seguintes custos estimados (Brasil):

### 1. Conectividade (Por Dispositivo)
* **LoRaWAN (ATC/Everynet):** ~R$ 2,50 a R$ 4,00 / mês (Baixo custo, ideal para cidades com cobertura).
* **Celular (4G/M2M Vivo/Claro):** ~R$ 15,00 a R$ 25,00 / mês (Cobertura nacional, maior consumo de bateria).

### 2. Infraestrutura de Servidor (Nuvem)
Para suportar até 1.000 dispositivos:
* **VPS (AWS/DigitalOcean):** ~U$ 20,00 a U$ 40,00 / mês (R$ 100 - R$ 200).
* **Banco de Dados Gerenciado:** ~U$ 15,00 / mês (opcional, mas recomendado).

### 3. Hardware (CAPEX - Custo Único)
* **Rastreador LoRaWAN (ex: Dragino/SenseCAP):** R$ 350,00 a R$ 600,00 por unidade.
* **Rastreador 4G:** R$ 500,00 a R$ 900,00 por unidade.

---

## 📄 Licença

Este projeto é proprietário e desenvolvido para fins de demonstração da plataforma EquipTrace.

---
Desenvolvido com 💜 por [Seu Nome/Empresa]
