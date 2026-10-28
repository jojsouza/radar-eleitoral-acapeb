/* Base extraída do ZIP enviado pelo usuário. Nenhuma atualização automática. */
(()=>{
const $=id=>document.getElementById(id),esc=s=>escapeHTML(String(s));let indice,cache=new Map(),seq=0;
const panel=document.createElement('div');panel.className='notice';panel.innerHTML='<strong>Bahia 2024 — base incorporada</strong><p>Escolha um município para consultar os dados sem importar CSV. Arquivo do TSE gerado em 28/10/2024; esta é uma fotografia da base, sem atualização automática.</p><label>Município <select id="cidadeBase" style="max-width:100%;padding:10px"><option>Carregando municípios…</option></select></label><p id="baseStatus" role="status"></p>';
$('resultados').querySelector('.card').insertBefore(panel,$('resultados').querySelector('.filters'));
$('ano').value='2024';$('cargo').value='Prefeito';$('uf').value='BA';
$('resultados').querySelector('.muted').textContent='Base incorporada: Bahia 2024. Outros anos e UFs ainda dependem de importação.';
const antigo=consultar;
window.consultar=async function(){
 if(importedRows.length){antigo();return}
 const ticket=++seq,out=$('resultMessage');
 if($('ano').value!=='2024'||$('uf').value!=='BA'){out.textContent='A base incorporada contém somente Bahia 2024. Selecione esse ano e UF ou importe outro CSV.';return}
 if(!indice){out.textContent='Aguarde o carregamento do índice de municípios.';return}
 const codigo=$('cidadeBase').value;out.textContent='Carregando os dados do município…';
 try{
  if(!cache.has(codigo)){const r=await fetch('dados/2024/BA/'+codigo+'.json');if(!r.ok)throw Error('Não foi possível carregar o município (HTTP '+r.status+').');const payload=await r.json();if(payload.partes){payload.linhas=[];for(const parte of payload.partes){const pr=await fetch("dados/2024/BA/"+parte);if(!pr.ok)throw Error("Parte indisponível: "+parte);payload.linhas.push(...await pr.json())}}cache.set(codigo,payload);if(cache.size>3){const k=cache.keys().next().value;if(k!==codigo)cache.delete(k)}}
  if(ticket!==seq)return;
  const data=cache.get(codigo),turno=$('turno').value.startsWith('2')?'2':'1',cargo=$('cargo').value,zona=$('filterZona').value.trim(),secao=$('filterSecao').value.trim(),mun=$('filterMunicipio').value.trim().toLocaleUpperCase('pt-BR');
  if(mun&&!data.municipio.includes(mun)){out.textContent='O município digitado não corresponde à cidade selecionada. Limpe o campo Município (opcional) ou selecione a cidade desejada.';return}
  const agg=new Map();let total=0,linhas=0;
  for(const row of data.linhas){const [t,c,z,s,num,nome,v]=row;if(t!==turno||c.toUpperCase()!==cargo.toUpperCase()||(zona&&Number(z)!==Number(zona))||(secao&&Number(s)!==Number(secao)))continue;const key=num+'|'+nome;if(!agg.has(key))agg.set(key,{num,nome,v:0});agg.get(key).v+=v;total+=v;linhas++}
  if(!linhas){out.textContent='Nenhum registro para esses filtros. Em 2024, os cargos disponíveis são Prefeito e Vereador; o segundo turno só existe nos municípios e cargos correspondentes.';return}
  const dados=[...agg.values()].sort((a,b)=>b.v-a.v);
  out.innerHTML='<strong>'+esc(data.municipio)+' — '+esc(cargo)+' — '+esc(turno)+'º turno</strong><p>'+linhas.toLocaleString('pt-BR')+' registros · '+total.toLocaleString('pt-BR')+' votos somados</p><div class="tablewrap"><table><thead><tr><th>Número</th><th>Candidato / tipo de voto</th><th>Votos</th><th>% do total filtrado</th></tr></thead><tbody>'+dados.map(a=>'<tr><td>'+esc(a.num)+'</td><td>'+esc(a.nome)+'</td><td>'+a.v.toLocaleString('pt-BR')+'</td><td>'+(total?100*a.v/total:0).toFixed(2).replace('.',',')+'%</td></tr>').join('')+'</tbody></table></div><p>Percentuais sobre todos os votos filtrados, incluindo brancos, nulos e legenda quando presentes. Não representam o percentual de votos válidos nem indicam eleitos.</p><p>Fonte: <a href="https://dadosabertos.tse.jus.br/dataset/resultados-2024" target="_blank" rel="noopener">Dados Abertos do TSE</a> · votacao_secao_2024_BA.csv · geração: 28/10/2024 11:46:22.</p>';
 }catch(e){if(ticket===seq)out.textContent='Falha: '+e.message}
};
fetch('dados/2024/BA/indice.json').then(r=>{if(!r.ok)throw Error('Índice indisponível');return r.json()}).then(meta=>{indice=meta;$('cidadeBase').innerHTML=meta.municipios.map(m=>'<option value="'+esc(m.codigo)+'">'+esc(m.nome)+'</option>').join('');const gongogi=meta.municipios.find(m=>m.nome==='GONGOGI');if(gongogi)$('cidadeBase').value=gongogi.codigo;$('baseStatus').textContent=meta.municipios.length+' municípios · '+meta.linhas.toLocaleString('pt-BR')+' registros disponíveis. Selecione os filtros e clique em Consultar.'}).catch(e=>{$('baseStatus').textContent=e.message+' — confira o envio da pasta dados/2024/BA.'});
})();
