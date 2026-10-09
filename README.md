# 🚀 BePilot Admin Panel

O **BePilot Admin Panel** é o painel de controle central da plataforma BePilot. Ele atua como o "cérebro" da operação, permitindo que a equipe interna gerencie, monitore e tome decisões estratégicas sobre os instrutores, alunos e veículos que compõem o ecossistema.

## 🔗 Relacionamento com o Ecossistema
Este repositório é uma peça fundamental da arquitetura BePilot e se relaciona diretamente com:
- **Painel do Instrutor (`instructor-panel`)**: Validação de cadastros, bloqueio/desbloqueio e análise de repasses.
- **App do Aluno**: Gestão de suporte, qualidade das aulas e resolução de conflitos.
- **Banco de Dados Central (Supabase)**: Lê e manipula dados cruciais (como a flag `is_blocked`) em tempo real.

## 🎯 Objetivo
Garantir a segurança, escalabilidade e controle financeiro da plataforma. Através deste painel, nenhuma entidade (instrutor ou veículo) entra em operação sem passar pelo crivo de segurança e qualidade da equipe BePilot.

## 🛠️ Como afeta o projeto?
O Admin Panel muda a dinâmica do sistema de "automática e vulnerável" para **controlada e segura**. Por exemplo: um instrutor que baixa o app não começa a dar aulas imediatamente. O Admin Panel trava esse fluxo no banco de dados (`is_blocked = true`) até que um ser humano analise sua CNH, RG e antecedentes criminais.

---

## 🔮 Funcionalidades Atuais
- **Fila de Validação:** Tabela em tempo real com instrutores pendentes de aprovação.
- **Análise de Documentos:** Visualização rápida dos 5 documentos essenciais.
- **Aprovação / Recusa:** Controle direto sobre o banco de dados para liberar acesso ao aplicativo do instrutor.

---

## 🚀 Ideias e Próximos Passos (Roadmap)

### 1. 👥 Gestão Completa de Instrutores Ativos
- Painel para visualizar quem já está rodando na plataforma.
- Opção de **Bloqueio Temporário** (ex: CNH venceu ou excesso de reclamações).
- Visão 360º de faturamento e avaliação (estrelas) de cada instrutor.
- Controle do sistema de indicações (Referral Program).

### 2. 🚗 Análise e Liberação de Veículos
- Fila de aprovação semelhante à do instrutor, mas focada no veículo.
- Análise de CRLV, ano de fabricação e fotos do estado do carro antes de liberá-lo no app do aluno.

### 3. 💸 Dashboard Financeiro
- Extrato de repasses: cálculo semanal de quanto deve ser pago (via Pix) para cada instrutor.
- Gráficos de faturamento global, taxas arrecadadas e número de aulas concluídas.

### 4. 📅 Central de Aulas (Monitoramento em Tempo Real)
- Monitoramento de todas as aulas agendadas ou acontecendo no dia.
- Poder administrativo para cancelar aulas e estornar alunos em caso de emergências (ex: acidente com o instrutor).

### 5. 🧑‍🎓 Gestão de Alunos e Suporte
- Visualização da base de alunos.
- Caixa de entrada para leitura de **Denúncias e Reclamações**, permitindo resolução rápida de conflitos.

### 6. 💡 Gestão de Ideias e Feedbacks da Comunidade
- Uma central para tabular e priorizar feedbacks recebidos pelo Instagram, caixinhas de perguntas nos Stories e via próprio app.
- Transformar as necessidades reais dos alunos e instrutores em novas *features* de forma organizada.

---

## 💻 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/BePilot-CFC-s-Service/admin-panel.git

# Acesse a pasta
cd admin-panel

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

*Nota: Certifique-se de preencher o arquivo `.env` com as variáveis do Supabase.*
