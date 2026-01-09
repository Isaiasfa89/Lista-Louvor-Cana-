
import React from 'react';
import { Song } from './types';

// Helper function to generate Harpa list from the provided titles
const generateHarpaList = (): Song[] => {
  const titles = [
    "Chuvas de Graça", "Saudosa Lembrança", "Plena Paz", "Deus Velará Por Ti", "Ó Desce Fogo Santo", "Na Maldição Da Cruz", "Cristo Cura Sim!", "Cristo, O Fiel Amigo", "Marchai Soldados De Cristo", "Eu Creio, Sim",
    "Ó Cristão, Eis Avante", "Vem Já, Pecador", "Jesus Comprou-me", "Gozo Em Jesus", "Conversão", "Desperta Para o Trabalho", "Pensando Em Jesus", "Grata Nova", "O Convite De Cristo", "Olhai o Cordeiro De Deus",
    "Gloriosa Aurora", "Ceia Do Senhor", "Glória a Jesus", "Poder Pentecostal", "Jesus Tu És Bom", "A Formosa Jerusalém", "Amor Que Vence", "Deus Vai Te Guiar", "O Precioso Sangue", "Não Sou Meu",
    "Glória ao Meu Jesus", "Meu Cristo! Meu Cristo!", "Com Tua Mão Segura", "Milícia De Jesus", "O Grande Amor", "O Exilado", "Cristo Pra Mim", "O Senhor é Rei", "Alvo Mais Que A Neve", "A Cidade Do Bom Jesus",
    "A Cristo Coroai", "Saudai Jesus", "Jesus Me Guia", "Oh! Que Glória!", "Redentor Onipotente", "Um Pendão Real", "Rocha Eterna", "O Dia Do Triunfo", "Aleluia! Já Creio", "Sempre Fiéis",
    "Adoração Reconhecida", "Tudo Está Bem", "A Esperança da Igreja", "Louvemos ao Redentor", "Mais Perto Da Tua Cruz", "Tudo em Cristo", "Vivifica-nos Senhor", "Não Temas", "Eu creio, Sim", "Exultação do Crente",
    "Deus Tomará Conta de Ti", "Achei Jesus", "Acordai, Acordai", "De Todo o Mundo: Aleluia!", "Quem irá?", "Pronto a Salvar", "Quem Quer Ir Com Cristo?", "Gozo de Ter Salvação", "Jesus Quebrou os Meus Grilhões", "Cristo Vai Voltar",
    "Santo és Tu, Senhor", "Rasgou-se o Véu", "Vem, Vem a Mim", "Cristo Virá", "Em Jesus Tens a Palma da Vitória", "Vem, ó Pródigo", "Guarda o Contacto", "Meu Forte Redentor", "Sua Graça Me Basta", "Cristo Te Chama",
    "Pode Salvar", "Um Meigo Salvador", "Não Posso Explica", "O Grande \"Eu sou\"", "Deixai Entrar o Espírito de Deus", "Satisfeito com Cristo", "Meu Testemunho", "Revela a Nós Senhor", "Sublime e Grande Amor", "Há Paz e Alegria",
    "Alva Luz", "O Bondoso Salvador", "Há Trabalho Pronto", "Na Jerusalém de Deus", "Ouve, ó Pecador", "Vinde, Ó Povos", "Há um Caminho Santo", "Estarás Vigiando?", "Eis o Dia a Declinar", "O Bom Consolador",
    "A Unção Real", "Crê na Promessa", "Caminhemos na Luz", "Jesus Procura a Ovelha", "A Gloriosa Esperança", "Viva Cristo", "Firme nas Promessas", "Pelejar Por Jesus", "Venha a Jesus", "Clama: Jesus, Jesus!",
    "Que Mudança!", "O Nome Soberano", "O Teu Nome é Doce", "Aceita o Perdão de Jesus", "Trabalhai e Orai", "Livre Estou", "O Senhor Salva a Todo o Pecador", "Face a Face", "Inesgotável é Seu Amor", "Noite de Paz",
    "Maravilhoso é Jesus", "Fogo Divino", "Cristo Voltará", "Adoração", "Quem Dera Hoje Vir!", "Bem-Aventurança do Crente", "O Senhor da Ceia Chama", "Entrega o Teu Coração", "A Fonte Salvadora", "A Cristo Me Entrego",
    "Valor Em Valor", "Obreiros do Senhor", "No Rol do Livro", "Jesus à Porta do Coração", "O Nome Precioso", "Jesus, Nosso Socorro", "Liberto da Escravidão", "Quem Bate é Jesus Cristo", "Jesus, Meu Eterno Redentor", "A Segurança do Crente",
    "Guia-me Sempre, Meu Senhor", "A Cidade Celeste", "Verdadeiro Amigo", "Vem à Assembléia de Deus", "União do Crente Com Seu Senhor", "Caminho Brilhante", "Servir a Jesus", "Os Remidos", "Canto do Pescador", "Para Casamentos",
    "Fala Jesus Querido", "Pela Cruz ao Céu Irei", "Soldados de Cristo", "Doce Nome de Jesus", "Imploramos Teu Poder", "A Ovelha Perdida", "Cristo, em Breve, Vem!", "Que Farás de Jesus Cristo?", "Cantai, ó Peregrinos", "Deus Nos Quis Salvar",
    "Navegando Pra Terra Celeste", "O Estandarte da Verdade", "Cristo Morreu Por Mim", "Paz Luz e Amor", "A Igreja Alerta", "Deixa Entrar o Rei da Glória", "As Testemunhas de Jesus", "Meus Irmãos, Nos Jubilemos", "Oh! Jesus Me Ama", "Ao Calvário de Horror",
    "Um Pecador Remido", "Ó Vem Te Entregar", "Os Santos Louvam Ao Senhor", "Glória, Aleluia, Glória", "Irmãos Amados", "Sacerdotes do Senhor", "Salvo Estou", "Gloriosa Paz", "Redentor Formoso", "Em Cristo Fruímos a Paz",
    "Vem, Celeste Redentor", "Jesus no Getsêmane", "Dulcíssima Voz", "Meu Jesus! Meu Jesus!", "Invocação e Louvor", "De Valor em Valor", "Mais Perto Meu Deus de Ti!", "O Gozo do Céu", "Glória ao Salvador", "Cristo! Meu Cristo!",
    "O Meu Jesus", "Pelo Sangue", "A Alma Abatida", "Jesus Me Guiará", "Benigno Salvador", "Uma Flor Gloriosa", "O Lar da Glória", "Jesus o Bom Amigo", "A Ceia do Senhor", "O Bondoso Amigo",
    "A Tua Presença", "Lugar de Delícias", "Deixai as Illusões", "O Peregrino da Terra", "Graça, Graça", "O Clarim nos Alerta", "Jerusalém Divina", "Vem a Cristo", "A Voz do Bom Pastor", "Fala, fala, Senhor",
    "Vem a Deus", "Os Guerreiros Se Preparam", "Sobre a Terra Vou Andando", "Desejamos ir Lá", "Ver-nos-emos", "Louvai a Deus", "Louvor à Voz", "Dá Teu Fardo a Jesus", "O Amor do Criador", "Ide Segar",
    "Opera em Mim", "Vem a Jesus, ó Perdido", "Na Minh'Alma Reina a Paz", "É o Tempo de Segar", "Sê Valente", "Cristo, Teu Santo Amor", "Deus Amou de Tal Maneira", "Este Mundo Não Compreende", "Jesus, ó Meigo Salvador", "Nós Rogamos Nesta Nau",
    "Não Foi Com Ouro", "Os Bem Aventurados", "A Ceia Do Senhor", "Oração dos Santos", "Já Sei, Já Sei", "Já Nos Lavou", "O Gozo de Estar Preparado", "Ó Pecador Desalentado", "Imploramos o Consolador", "Oh Dia Alegre",
    "Marchemos Sem Temor", "Eu Confio Firmemente", "Ao Abrir o Culto", "Louvai a Jesus", "Paz de Deus em Jesus Encontrei", "O Descanso em Jesus", "Deus Nos Guarde No Seu Amor", "Hosana e Glória", "Ó Vem, Senhor, e Habita", "Noiva de Jesus, Apronta-te",
    "Ao Culto Não Faltar", "Santo, Santo és Tu Senhor", "A Igreja em Oração", "Mais Perto de Jesus", "Meu Redentor", "Abandona Este Mundo de Horror", "O Perdão Sem Igual", "Na Rocha Eterna Firmado", "Creio eu na Brisa", "Avante com o Nosso Capitão",
    "Alma Triste, Abatida", "Senhor, Estás Comigo", "Ao Fim do Culto", "Ó Pai Celeste", "Doce é Crer em Cristo", "Resgatados Fomos", "Jesus Minha Força", "Confiante em Deus", "É Jesus o Meu Amado", "Louvando ao Nosso Salvador",
    "Na Mansão do Salvador", "Quando Jesus Aparecer", "Só a Ti Recorrerei", "Jesus é a Luz do Mundo", "Ó Acorda, Desperta!", "Em Canaã Eu Entrarei", "Salvo Estás? Limpo Estás?", "Levar a cruz", "Ali Quero ir, e Tu?", "Ó Jesus, Te Suplico",
    "Vem Sem Tardar", "Que Sangue Precioso", "O Pastor e as Ovelhas", "Bendito Cristo, Eis-me Aqui", "Tu És o Meu Gozo", "Não Tarda Vir Jesus!", "A Belém do Judeu", "A Palavra da Cruz", "Sob o Sangue Teu", "Teu Espírito Vem Derramar",
    "A Mensagem da Cruz", "Qual o Preço do Perdão", "Jesus no Calvário", "Eu Vou Com Jesus", "Novo Canto de Louvor", "No Jardim", "Abundância de Cristo", "Avante, Servos de Jesus", "Há um Canto Novo", "Nossa Esperança",
    "Vem Cear", "Não Murmures: Canta", "Os Meus Pecados", "A Face Adorada de Jesus", "Campeões da Luz", "A Palavra de Deus é um Tesouro", "Louvor ao Deus Trino", "Só o Sangue de Jesus", "Ao Findar do Dia", "Avante Eu Vou",
    "Jesus, Meu Salvador", "A Vinda de Cristo", "Louvor a Trindade", "Ó pai bondoso", "Oh! Amor Bendito", "Em Busca de Sião", "Jesus Vem Triunfante", "Ao Lar Paternal", "Ainda Há Lugar", "Seguir a Cristo",
    "Dá o Teu Coração", "As Santas Escrituras", "Levantai Vossos Olhos", "Jesus, o Melhor Amigo", "A Luz do Céu Raiou", "Oh! Meu Jesus", "Teu Nome Precioso", "O Pão da Vida", "Jesus é Minha Paz", "A Fé dos Santos",
    "Ó Caro Salvador", "Para o Céu eu vou", "Ó Céu, Meu Lar", "O Fim Vem, Cuidado!", "Mui Perto Está o Dia", "Oração de Elias", "O Bom Jesus", "O Caminho da Tua Luz", "Jesus Ressuscitado", "Um Povo Forte",
    "A Aspiração da Alma", "As Cordas do Coração", "Abre o Coração", "Um Amigo Entre os Lírios", "Oh! Tenho Gozo", "É Meu o Céu", "Vem a Cristo", "Longe de Jesus", "Os Dons do Céu", "A História da Cruz",
    "A Felicidade da Salvação", "Jesus, Nossa Esperança", "Vem, ó Pródigo", "Cuidado da Alma", "Fala do Amor de Cristo", "A Formosa Cidade", "O Fim das Lutas", "Senhor, Manda Teu Poder", "Vem a Mim, Pecador", "A Preciosa Fonte",
    "O Peregrino da Glória", "O Espírito Diz: Vem!", "Consagração", "Oh, que Paz!", "Confiança em Jesus", "O Nascimento de Jesus", "Espírito Consolador", "Jesus, Tudo prá Mim", "Sob as Asas de Deus", "Grato a Ti",
    "Breve Vem o Dia", "Venceremos", "Um Grito de Louvor", "Jesus, o Teu Salvador", "Vida Abundante", "A Igreja Universal", "Vamos Todos Trabalhar", "As Promessas Que Não Falham", "As Pisadas do Mestre", "Salvo de Graça",
    "Abraão e seu Sacrifício", "O Cordeiro de Deus", "Olhando Para o Calvário", "O Sustento da Alma", "Sinto Vida do Senhor", "Amemos o Senhor", "Vencidos os Combates", "Derrama Teu Espírito", "Canta, ó Crente", "Lava-me ó Deus",
    "Trabalhai Por Jesus", "Jesus no Monte da Ascensão", "Peregrinos Somos", "Há um Amigo Mui Chegado", "A Mão ao Arado!", "Ide por Todo Mundo", "Além do Nosso Entendimento", "O Salvador me Achou", "Perto do Meu Redentor", "Terra de Jesus",
    "Em Jesus", "Jesus Voltará", "Ao Gólgota", "Gozo Real", "Em Glória Virá", "A Sombra do Meu Redentor", "Ó Criador Bendito", "Abre os Meus Olhos", "Trabalhadores do Evangelho", "Jesus Meu Rei Glorioso",
    "Nós Somos Teus", "Jesus Cristo, Bem Amado", "Meu Pastor", "Tem Compaixão do Pecador", "Jesus Te Quer Curar", "Quando o Povo Salvo Entrar", "Bastante Para Mim", "Sou um Soldado", "Vinde, Pecadores", "O Que Buscas Ansioso?",
    "Careço de Jesus", "No Céu não Entra Pecado", "De Ti Preciso Mais", "Seu Precioso Sangue", "Cristo me Achou", "União Dos Irmãos", "Vai Orando", "A Estrela da Alva", "Escuta o Evangelho", "Evangelho da Salvação",
    "Cristo Chama o Pecador", "Consagrado ao Senhor", "Sois Bem-vindos", "A Teus Pés", "Jesus Me Levantou", "Crentes Cantai!", "O Dom Celeste", "Voltai-vos Para Mim", "Aos Pés de Cristo Prostrados", "Faze Já o seu Querer",
    "A Chuva do Consolador", "Vem Deus, a Igreja Abençoar", "Larga o Mundo!", "Escuta, Pobre Pecador", "Resgatado Com o Sangue de Cristo", "Ó Vem Já!", "Nascer de Novo", "Crentes, Avançai", "À Beira da Estrada", "Sol da Justiça",
    "Meu Jesus Vem", "Seguirei a Cristo", "Deus é o mesmo", "Alegrai-vos, ó Remidos", "O Povo de Deus na Terra", "A Fonte Transbordante", "O Festim de Glória", "Guia Meus Passos", "As Firmes Promessas", "Vem a Cristo",
    "Jesus Chorou Sobre Jerusalém", "Glória ao Salvador", "O Povo de Abraão", "Plena Graça", "Ele Sofreu Por Mim", "Que Maravilha", "Sobre as Ondas do Mar", "Cristo Está Chamando", "Ao Estrugir a Trombeta", "Batismo",
    "Avançai Fiéis", "Em Meu Lugar", "Outro Bem Não Acharei", "Paz, Doce Paz", "Em Belém", "Os Muros de Jericó", "Sede Fortes", "Eis-me Jesus", "Ao Raiar do Novo Dia", "Fim do Ano",
    "Cristo e Sua Humilhação", "Comunhão", "Ora Vem Jesus", "Meus Pecados Levou", "Andando Para o Céu", "Vasos Transbordantes", "Doxologia", "O Áureo Dia", "Chegai Para Adorar", "Passando Está",
    "Há Poder no Sangue de Jesus", "Jesus Virá do Céu", "A Noiva do Cordeiro", "Jerusalém Celestial", "Cristo à Porta Está", "Jesus me Tirou da Lama", "Meu Bom Salvador", "Guia-me ó Salvador", "A Santa Bíblia", "Quero ver a Jesus Cristo",
    "Vencendo Vem o Bom Capitão", "Ó Pastor Bendito", "Vidas Consagradas ao Trabalho", "Momento Solene", "As Palavras de Jesus", "Bíblia Sagrada", "Salvo Salvo", "Sua Palavra Revelada", "Ao Passar o Jordão", "A Riqueza Divinal",
    "Longe do Meu Jesus", "Minha Alma Quer Ter", "Em Glória Esplendente", "Se Cristo Comigo Vai", "Cristo Meu Vero Amigo", "Cura Divina", "Salva-Vidas", "Achei Jesus, Meu Salvador", "A Doce e Preciosa Voz", "Vem o Passo Dar!",
    "Rei da Glória", "Cristo, a Fonte Escondida", "Cristo Pensa em Mim", "Vencendo Vem Jesus", "Grandioso És Tu", "Dominador É Deus", "A Cidade de Deus", "Em Sua Graça", "Vivifica a Tua Igreja", "Santo Nome",
    "Vivifica-nos Senhor", "Nome Precioso", "Honras Sejam ao Cordeiro", "Cristo É Real Pra Mim", "Tu És Fiel, Senhor", "Amigo Sem Igual", "Sempre Comigo", "Senhor, És Nosso Amigo", "Ao Pensar na Dor Crucial", "Ao Ver a Cruz",
    "Calvário, Revelation de Amor", "História de Cristo", "Cristo, meu redentor", "Creio, Senhor", "A Ressurreição", "Manhã da Ressurreição", "O Rei Está Voltando", "Breve Jesus Há de Vir", "Ora Vem, Senhor Jesus", "Breve Ele Volta",
    "O Santo Espírito", "Quando o Pai o Céu Nós Formos", "Oh! Pai, o Santo Espírito", "O Evangelho", "O Redentor", "Lê a Bíblia", "A Palavra da Vida", "Dai-me a Bíblia", "Bíblia Sagrada", "Tenho Paz em Meu Ser",
    "Que Bênção!", "Autor da Vida", "Vem a Cristo", "Conta as Bênçãos", "Tu És Meu", "Paz Perfeita, Sim, Busquei", "Sou Feliz", "Manso e Suave", "Morri na Cruz por Ti", "A Última Hora",
    "Rende o Coração", "A Porta Sou", "A Graça de Nosso Senhor", "Ó Pai Bondoso", "Espero em Ti", "Assim como estou", "Sossegai!", "Porque te Afliges?", "Fervente Oração", "Sou Feliz", "Castelo Forte", "A Barca da Vida",
    "Sê Tu Meu Guia", "O Piloto", "Gozo e Vida Tenho", "Jesus Me Satisfaz", "Neste Lenho me Glorio", "Sou Mui Feliz", "Quádruplo Amém", "Contentamento", "O Lugar de Bênção e Paz", "Pura, Sim, Mais Pura",
    "Eis me no Calvário", "Fé Persistente", "Somente a Ti!", "Gratidão", "Tesouro Infinito", "Riquezas do Céu", "Herdeiro do Reino", "Mãos ao Trabalho", "Agora se Está Madura", "Juntos Trabalhamos",
    "Quero te Servir", "O Senhor, os Mensageiros Teus", "Gozo de Deus", "Triunfo", "Luz após Trevas", "Se em teu Caminho", "Vitória Deus Dará a Mim", "Fé é a Vitória", "Cristo, Comandante", "O Pai Eterno",
    "Vitória Final", "Canaã", "Vou Rumo ao Meu Lar", "O País da Glória", "Quanto Almejo!", "Quanto Anelo", "É Nosso o Lar", "Meu Lar, Jerusalém", "No Jornada Para Jerusalém", "Juntos, no Céu",
    "Tão Grato me é Lembrar", "Oh, Sim, Bem Sei", "Anseio um Lugar de Amor", "Glória Indizível", "Tríplice Amém", "Finda-se Minha Prisão", "Além do céu azul", "Conversaremos Ali no Céu", "Não Há Separação na Glória", "Neste Lugar",
    "Mais um templo", "Nasce a Luz", "Oração pela Pátria", "Hino à Bandeira Nacional", "Com a Bandeira em Tuas Mãos", "Por nossa Pátria Oramos", "Hino Nacional Brasileiro", "Hino da Independência do Brasil", "Hino da Proclamação da República do Brasil", "Hino do Rio Grande do Sul"
  ];

  return titles.map((title, index) => ({
    id: `h${index + 1}`,
    number: index + 1,
    title: title,
    artist: "Harpa Cristã",
    keyMen: '-',
    keyWomen: '-',
    type: 'harpa'
  }));
};

export const HARPA_INITIAL: Song[] = generateHarpaList();

export const CONGREGATIONAL_INITIAL: Song[] = [
  { id: 'c1', title: 'João 20 + Pra Sempre', artist: 'Vitor Santana', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c2', title: 'Quem É Esse?', artist: 'Julliany Souza', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c3', title: 'Santo Pra Sempre', artist: 'Fernandinho', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c4', title: 'Gratidão', artist: 'Florianópolis House Of Prayer (fhop music)', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c5', title: 'Um Novo Dia', artist: 'Get Worship', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c6', title: 'Se Eu Não Te Ouvir', artist: 'Sarah Farias', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c7', title: 'Cura', artist: 'Maria Marçal', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c8', title: 'IMPERFEITO (part. Coral Canto Jovem e Rayssa Andreoli)', artist: 'Seven Plus', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c9', title: 'É Tudo Sobre Você', artist: 'MORADA', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c10', title: 'Com Muito Louvor', artist: 'Cassiane', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c11', title: 'Melhor Amigo / O Que Seria de Mim (part. Eunice Zumbuca e Dimy Francisco)', artist: 'Nair Nany', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c12', title: 'Tudo É Perda', artist: 'Felipe Rodrigues', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c13', title: 'É Ele', artist: 'Drops INA', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c14', title: 'Ovelhinha', artist: 'Isadora Pompeo', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c15', title: 'O Fogo Arderá', artist: 'Alexsander Lúcio', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c16', title: 'Bondade de Deus', artist: 'Isaías Saad', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c17', title: 'Eu Só Quero Adorar', artist: 'Gerson Rufino', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c18', title: 'Perto Ou Longe', artist: 'Klebson Kollins', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c19', title: 'Eu Vou Fazer', artist: 'Kailane Frauches', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c20', title: 'Era Deus e Eu', artist: 'Sara Evelyn', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c21', title: 'Messias', artist: 'Marcelo Markes', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c22', title: 'Foi a Tua Mão Senhor', artist: 'Eliane Fernandes', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c23', title: 'Deus de Obras Completas', artist: 'Kemilly Santos', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c24', title: 'Os Planos de Deus', artist: 'Samuel Messias', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c25', title: 'Me Ama', artist: 'Diante do Trono', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c26', title: 'Clamo Jesus (part. Marsena)', artist: 'Paulo César Baruk', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c27', title: 'Primeira Essência (Jardim Particular)', artist: 'Aline Barros', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c28', title: 'Poderoso Deus', artist: 'David Quinlan', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c29', title: 'Porque Ele Vive', artist: 'Harpa Cristã', keyMen: '-', keyWomen: '-', type: 'congregational' },
  { id: 'c30', title: 'Faz Um Milagre Em Mim', artist: 'Regis Danese', keyMen: '-', keyWomen: '-', type: 'congregational' },
];

export const Icons = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  ),
  Music: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  )
};
