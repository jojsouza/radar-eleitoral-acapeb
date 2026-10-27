# Integração oficial TSE — Bahia

Escopo: 2022, 2024 e 2026.

1. Obter os recursos de votação por município, zona e seção em https://dadosabertos.tse.jus.br/group/resultados.
2. Conferir licença, layout, encoding, campos, turnos e abrangência.
3. Registrar URL, data de coleta, hash SHA-256 e ano do arquivo.
4. Processar e validar totais contra boletins oficiais; distinguir votos nominais, legenda, brancos e nulos.
5. Disponibilizar agregados por município em JSON e consultas detalhadas por API paginada.
6. Exibir a fonte, data de atualização e eventuais lacunas no aplicativo.

**Não publicar dados simulados como oficiais.** A importação e o banco D1 ainda não estão implementados. GitHub Actions pode automatizar o processamento, mas é necessário avaliar tamanho dos arquivos, cotas e armazenamento antes da implantação.
