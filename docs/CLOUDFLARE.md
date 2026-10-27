# Publicação segura no Cloudflare

1. No painel Cloudflare, crie um **novo projeto Pages de teste** conectado a `jojsouza/radar-eleitoral-acapeb`.
2. Selecione a branch `main` e defina o diretório de saída como `public` (sem comando de build).
3. Publique e valide a página de teste.
4. Não altere o Worker existente `fragrant-queen-0b52` até que o aplicativo completo e os dados estejam prontos.
5. Depois, configure domínio/roteamento e, se necessário, Worker com D1.

A publicação do código no GitHub não atualiza automaticamente o Worker já existente.
